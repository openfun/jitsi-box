import { cardMediaClasses } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import CaptureImage from './CaptureImageComponent';

const CameraDetector = () => {
    const [cameraList, setCameraList] = useState([] as MediaDeviceInfo[]);
    const selectCamera = () => {
        navigator.mediaDevices.enumerateDevices().then((devices: Array<MediaDeviceInfo>) => {
            setCameraList(devices.filter((value) => value['kind'] === 'videoinput'));
        });
    };
    useEffect(() => {
        selectCamera();
    }, []);
    useEffect(() => {
        navigator.mediaDevices.addEventListener('devicechange', selectCamera);
        return () => {
            navigator.mediaDevices.removeEventListener('devicechange', selectCamera);
        };
    }, []);
    return (
        <div>
            {cameraList.map((element) => {
                return (
                    <div className={element['label']} key={element['deviceId']}>
                        <CaptureImage camera={element} roomName={props.roomName} />
                    </div>
                );
            })}
        </div>
    );
};

export default CameraDetector;
