import React, { useState, useEffect, useRef } from 'react';
import { ImageCapture } from 'image-capture';
import axios from 'axios';
import FormData from 'form-data';

const CaptureImage = (props: any) => {
    let imageCapturer = null;

    const intervalPhoto = () => {
        setInterval(start, 10 * 1000);
    };
    const start = (props: any) => {
        console.log(props.camera['deviceId']);
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    deviceId: { exact: props.camera['deviceId'] },
                },
            })
            .then((mediastream: MediaStream) => takePhoto(mediastream, props.roomName))
            .catch((error: any) => console.log(error));
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
                // const address = `http://localhost:8070/policy?custom_address=${roomName}`; use this if you need to upload pictures on different servers (depending on the meeting for instance)
                const address = 'http://localhost:8070/policy';
                axios.get(address).then((response: any) =>
                    axios
                        .post(response.data['url'], data, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        .then((response) => console.log(response))
                        .catch((error) => console.log(error)),
                );
            })
            .catch((err: any) => {
                console.error('takePhoto() failed: ', err);
            });
    };
    return (
        <div className={props.camera['label']}>
            <button onClick={() => start(props)}>Take a photo with {props.camera['label']} </button>
        </div>
    );
};

export default CaptureImage;
