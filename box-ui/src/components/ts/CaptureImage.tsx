import React, { useState, useEffect, FunctionComponent } from 'react';
import { ImageCapture } from 'image-capture';
import { CaptureImageProps } from '../../utils/Props';
import axios from 'axios';
import '../css/CaptureImage.css';
import { useTranslation } from 'react-i18next';
import SelectButton from './SelectButton';

const CaptureImage: FunctionComponent<CaptureImageProps> = (props: CaptureImageProps) => {
    const [photoInterval, setPhotoInterval] = useState<ReturnType<typeof setTimeout>>();
    const [cameraList, setCameraList] = useState<MediaDeviceInfo[]>([]);
    const { t } = useTranslation();
    const detectCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(() => {
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                const cameras = devices.filter((value) => value['kind'] === 'videoinput');
                setCameraList(cameras);
            });
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
            <SelectButton
                menuItemsStyle={{ color: 'white', backgroundColor: '#1976D2' }}
                selectItems={{
                    inputLabel: { text: t('selectCamera'), style: { color: 'white' } },
                    menuItems: cameraList.map((camera) => camera.label),
                }}
                value={'camera'}
                onChange={(e) => {
                    const camera = cameraList.find((camera) => camera.label === e.target.value);
                    if (camera !== undefined) setCamera(camera);
                }}
                onClick={() => {
                    detectCamera();
                    if (cameraList.length === 0)
                        alert('aucune caméra trouvé, avez vous autorisé votre navigateur à accéder à la caméra ?');
                }}
            />
        </div>
    );
};
export default CaptureImage;
