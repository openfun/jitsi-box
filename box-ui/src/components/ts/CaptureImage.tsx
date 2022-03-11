import React, { useState, useEffect, FunctionComponent, useRef } from 'react';
import { ImageCapture } from 'image-capture';
import { CaptureImageProps } from '../../utils/Props';
import axios, { AxiosResponse } from 'axios';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../css/CaptureImage.css';

const CaptureImage: FunctionComponent<CaptureImageProps> = (props: CaptureImageProps) => {
    const photoInterval = useRef<NodeJS.Timeout>();
    const [cameraList, setCameraList] = useState<MediaDeviceInfo[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const detectCamera = () => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            const cameras = devices.filter((value) => value['kind'] === 'videoinput');
            setCameraList(cameras);
        });
    };

    const setCamera = (camera: MediaDeviceInfo) => {
        const mediaStreamPromise = navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: {
                    exact: camera['deviceId'],
                },
            },
        });
        mediaStreamPromise
            .then((mediastream: MediaStream) => {
                const videoTrack = mediastream.getVideoTracks()[0];
                videoTrack.applyConstraints({
                    whiteBalanceMode: 'single-shot',
                    exposureMode: 'single-shot',
                    focusMode: 'single-shot',
                });
                const imageCapturer = new ImageCapture(videoTrack);
                const timeBetweenPictures = parseInt(
                    process.env.REACT_APP_TIME_BETWEEN_PICTURES !== undefined
                        ? process.env.REACT_APP_TIME_BETWEEN_PICTURES
                        : '5',
                );

                photoInterval.current = setInterval(
                    () => takePhoto(imageCapturer, props.roomName),
                    timeBetweenPictures * 1000,
                );
            })
            .catch((error: any) => {
                if (error?.name === 'OverconstrainedError') {
                    detectCamera();
                } else {
                    console.log(error);
                }
            });
    };

    const takePhoto = (imageCapturer: ImageCapture, roomName: string) => {
        imageCapturer
            .takePhoto()
            .then((blob: Blob) => {
                const data = new FormData();
                data.append('name', 'image');
                data.append('file', blob, `${roomName}.png`);
                const address = process.env.REACT_APP_POLICY_ADDRESS;
                if (address == undefined) {
                    alert('No policy server defined');
                } else {
                    axios.get(address).then((response: AxiosResponse) =>
                        axios
                            .post(response.data['url'], data, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            })
                            .catch((error) => console.log(error)),
                    );
                }
            })
            .catch((err: DOMException) => {
                console.error('takePhoto() failed: ', err);
            });
    };

    useEffect(() => {
        return () => {
            if (photoInterval.current !== undefined) {
                clearInterval(photoInterval.current);
            }
        };
    }, [photoInterval]);

    useEffect(() => {
        navigator.mediaDevices.addEventListener('devicechange', detectCamera);
        return () => navigator.mediaDevices.removeEventListener('devicechange', detectCamera);
    }, []);

    return (
        <div className='popupCamera'>
            <Button
                id='button'
                aria-controls={open ? 'menu' : undefined}
                aria-haspopup='menu'
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => {
                    detectCamera(), handleClick(event);
                }}
            >
                Select camera
            </Button>
            <Menu
                id='menu'
                aria-labelledby='button'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {cameraList.map((camera, index) => {
                    return (
                        <div key={index}>
                            <MenuItem
                                onClick={() => {
                                    handleClose(), setCamera(camera), alert(`New camera selected ${camera['label']}`);
                                }}
                                key={index}
                            >
                                select camera {camera['label']}
                            </MenuItem>
                        </div>
                    );
                })}
            </Menu>
        </div>
    );
};
export default CaptureImage;
