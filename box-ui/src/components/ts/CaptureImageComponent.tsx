import React, { useState, useEffect, useRef } from 'react';
import { ImageCapture } from 'image-capture';
import { CaptureImageProps } from '../../utils/Props';
import axios, { Axios, AxiosResponse } from 'axios';

const CaptureImage = (props: CaptureImageProps) => {
    let imageCapturer = null;

    const intervalPhoto = () => {
        setInterval(start, 10 * 1000);
    };
    const start = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    deviceId: { exact: props.camera['deviceId'] },
                },
            })
            .then((mediastream: MediaStream) => takePhoto(mediastream, props.roomName))
            .catch((error: MediaDeviceInfo) => console.log(error));
    };
    const takePhoto = (mediastream: MediaStream, roomName: string) => {
        const videoTrack = mediastream.getVideoTracks()[0];
        videoTrack.applyConstraints({
            whiteBalanceMode: 'single-shot',
            exposureMode: 'single-shot',
            focusMode: 'single-shot',
        });
        imageCapturer = new ImageCapture(videoTrack);
        imageCapturer
            .takePhoto()
            .then((blob: Blob) => {
                const data = new FormData();
                data.append('name', 'image');
                data.append('file', blob, `${roomName}.png`);
                const address = process.env.REACT_APP_POLICY_ADDRESS;
                if (address == undefined) {
                    console.log('No policy server defined');
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
    return (
        <div className={props.camera['label']}>
            <button onClick={() => start()}>Take a photo with {props.camera['label']} </button>
        </div>
    );
};

export default CaptureImage;
