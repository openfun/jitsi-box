import React, { useState, useEffect, FunctionComponent } from 'react';
import { ImageCapture } from 'image-capture';
import { CaptureImageProps } from '../../utils/Props';
import axios from 'axios';
import '../css/CaptureImage.css';
import { useTranslation } from 'react-i18next';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { IconButton } from '@mui/material';
import FocusMode from './FocusMode';
import HelpIcon from '@mui/icons-material/Help';
import SelectButton from './SelectButton';

const CaptureImage: FunctionComponent<CaptureImageProps> = (props: CaptureImageProps) => {
    const [photoInterval, setPhotoInterval] = useState<ReturnType<typeof setTimeout>>();
    const [cameraList, setCameraList] = useState<MediaDeviceInfo[]>([]);
    const [displayFocus, setDisplayFocus] = useState(false);
    const [showLoopback, setShowLoopback] = useState<boolean>(false);
    const [showArrow, setShowArrow] = useState<boolean>(false);
    const [cameraLoopback, setCameraLoopback] = useState<MediaDeviceInfo>();
    const { t } = useTranslation();

    const detectCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((cameras) => {
            console.log(cameras);
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                const cameras = devices.filter((value) => value['kind'] === 'videoinput');
                setCameraList(cameras);
            });
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
                const videoTrack = mediastream.getVideoTracks()[0];
                videoTrack.applyConstraints({
                    whiteBalanceMode: 'single-shot',
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
                {showArrow && <div className='recordingIconOutside'></div>}

                <SelectButton
                    menuItemsStyle={{
                        color: 'white',
                        backgroundColor: '#1976D2',
                        borderRadius: '8px',
                        '& .MuiSelect-icon': { color: 'white' },
                        '&:hover': { background: '#1976D295' },
                    }}
                    selectItems={{
                        inputLabel: { text: t('selectCamera'), style: { color: 'white' } },
                        menuItems: cameraList.map((camera, index) => {
                            return {
                                id: camera.deviceId,
                                text: camera.label !== '' ? camera.label : `camera ${index + 1}`,
                            };
                        }),
                    }}
                    onChange={(e) => {
                        const camera = cameraList.find((camera) => camera.label === e.target.value);
                        if (camera !== undefined) {
                            setCamera(camera);
                            getLoopbackVideo(camera);
                            alert(`New camera selected ${camera.label}`);
                        }
                    }}
                    onClick={() => {
                        detectCamera();
                        if (cameraList.length === 0)
                            alert('aucune caméra trouvé, avez vous autorisé votre navigateur à accéder à la caméra ?');
                    }}
                />
                <IconButton id='TutoButton' aria-label='help' onClick={() => setDisplayFocus(!displayFocus)}>
                    <HelpIcon />
                </IconButton>
                {displayFocus && (
                    <FocusMode
                        focusItems={[
                            { element: '.meetingUrl', textElement: t('tutoMeetingUrl') },
                            { element: '.QrcodeScannerButton', textElement: t('tutoQRCode') },
                            { element: '.QrcodeButton', textElement: t('tutoShareQRCode') },
                            { element: '.OpenTopBarButton', textElement: t('tutoBroadcast') },
                            { element: '.SelectButton', textElement: t('tutoSelectCamera') },
                        ]}
                        setDisplayFocus={setDisplayFocus}
                    />
                )}
            </div>
        </div>
    );
};
export default CaptureImage;
