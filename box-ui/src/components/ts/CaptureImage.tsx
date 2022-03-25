import React, { useState, useEffect, FunctionComponent } from 'react';
import { ImageCapture } from 'image-capture';
import { CaptureImageProps } from '../../utils/Props';
import axios from 'axios';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../css/CaptureImage.css';
import { useTranslation } from 'react-i18next';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import FocusMode from './FocusMode';

const CaptureImage: FunctionComponent<CaptureImageProps> = (props: CaptureImageProps) => {
    const [photoInterval, setPhotoInterval] = useState<ReturnType<typeof setTimeout>>();
    const [cameraList, setCameraList] = useState<MediaDeviceInfo[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [displayFocus, setDisplayFocus] = useState(false);
    const [videoLoopback, setVideoLoopback] = useState<MediaStream>();
    const [showLoopback, setShowLoopback] = useState<boolean>(false);
    const [showArrow, setShowArrow] = useState<boolean>(false);
    const [cameraLoopback, setCameraLoopback] = useState<MediaDeviceInfo>();
    const open = Boolean(anchorEl);
    const { t } = useTranslation();

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
        setCameraLoopback(camera);
        setShowArrow(true);
        setShowLoopback(true);
        const mediaStreamPromise = navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: {
                    exact: camera['deviceId'],
                },
            },
        });

        mediaStreamPromise
            .then((mediastream: MediaStream) => {
                setVideoLoopback(mediastream);
                const videoTrack = mediastream.getVideoTracks()[0];
                videoTrack.applyConstraints({
                    //whiteBalanceMode: 'single-shot',
                    exposureMode: 'single-shot',
                    focusMode: 'single-shot',
                });
                const imageCapturer = new ImageCapture(videoTrack);
                let timeBetweenPictures = parseInt(
                    process.env.REACT_APP_TIME_BETWEEN_PICTURES !== undefined
                        ? process.env.REACT_APP_TIME_BETWEEN_PICTURES
                        : '5',
                );

                timeBetweenPictures = Number.isNaN(timeBetweenPictures) ? 5 : timeBetweenPictures;
                setPhotoInterval(
                    setInterval(() => takePhoto(imageCapturer, props.roomName), timeBetweenPictures * 1000),
                );
            })
            .catch((error) => {
                if (error?.name === 'OverconstrainedError') {
                    detectCamera();
                } else {
                    console.log(error);
                }
            });
    };

    const getLoopbackVideo = (camera: MediaDeviceInfo) => {
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    deviceId: {
                        exact: camera['deviceId'],
                    },
                },
            })
            .then((mediaStream) => {
                const el = document.getElementById('videoContainer');
                let vid = document.querySelector('video');
                if (el) {
                    if (!(vid == undefined)) {
                        vid.remove();
                    }
                    vid = document.createElement('video');
                    vid.setAttribute('autoplay', '');
                    vid.setAttribute('className', 'videoLoopback');
                    vid.srcObject = mediaStream;
                    el.appendChild(vid);
                }
            })
            .catch((error) => console.log(error));
    };

    const takePhoto = (imageCapturer: ImageCapture, roomName: string) => {
        imageCapturer.takePhoto().then((blob: Blob) => {
            const data = new FormData();
            data.append('name', 'image');
            data.append('file', blob, `${roomName}.jpg`);
            const pictureAddress = process.env.REACT_APP_BACK_WEBROOT + '/picture';
            if (pictureAddress == undefined) {
                console.log('No picture address defined, contact your maintainer');
            } else {
                axios
                    .post(pictureAddress, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .catch((error) => console.log(error));
            }
        });
    };

    const changeViewLoopback = () => {
        if (cameraLoopback) {
            getLoopbackVideo(cameraLoopback);
        }
        setShowLoopback(!showLoopback);
    };

    useEffect(() => {
        return () => {
            if (photoInterval !== undefined) {
                clearInterval(photoInterval);
            }
        };
    }, [photoInterval]);

    useEffect(() => {
        navigator.mediaDevices.addEventListener('devicechange', detectCamera);
        return () => navigator.mediaDevices.removeEventListener('devicechange', detectCamera);
    }, []);

    return (
        <div className='popupCamera'>
            {false && (
                <div className='arrowContainer' onClick={changeViewLoopback}>
                    <DoubleArrowIcon className={showLoopback ? 'arrowDown' : 'arrowUp'} />
                </div>
            )}
            <div className='sectionSelectCam'>
                {showLoopback && (
                    <div id='videoContainer'>
                        <div className='recordingIcon'></div>
                    </div>
                )}
                {showArrow && (
                    <div className='arrowContainer' onClick={changeViewLoopback}>
                        <DoubleArrowIcon className={showLoopback ? 'arrowDown' : 'arrowUp'} />
                    </div>
                )}
                <Button
                    id='buttonToSelectCamera'
                    aria-controls={open ? 'menu' : undefined}
                    aria-haspopup='menu'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event) => {
                        detectCamera(), handleClick(event);
                    }}
                >
                    {t('selectCamera')}
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
                                        handleClose(),
                                            setCamera(camera),
                                            getLoopbackVideo(camera),
                                            alert(`New camera selected ${camera['label']}`);
                                    }}
                                    key={index}
                                >
                                    {camera['label'] !== '' ? camera['label'] : `${t('camera')} ${index + 1}`}
                                </MenuItem>
                            </div>
                        );
                    })}
                </Menu>
                <IconButton id='TutoButton' aria-label='help' onClick={() => setDisplayFocus(!displayFocus)}>
                    <HelpIcon />
                </IconButton>
                {displayFocus && (
                    <FocusMode
                        focusItems={[
                            {
                                element: '#buttonToSelectCamera',
                                textElement: t('tutoSelectCamera'),
                            },
                            { element: '.meetingUrl', textElement: t('tutoMeetingUrl') },
                            { element: '.QrcodeScannerButton', textElement: t('tutoQRCode') },
                            { element: '.QrcodeButton', textElement: t('tutoShareQRCode') },
                            { element: '.OpenTopBarButton', textElement: t('tutoBroadcast') },
                        ]}
                        setDisplayFocus={setDisplayFocus}
                    />
                )}
            </div>
        </div>
    );
};
export default CaptureImage;
