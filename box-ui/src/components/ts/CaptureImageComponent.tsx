import React, { useState, useEffect, useRef } from 'react';
import { ImageCapture } from 'image-capture';
import axios from 'axios';
import { url } from 'inspector';

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
        imageCapturer = new ImageCapture(videoTrack);
        imageCapturer
            .takePhoto()
            .then((blob: Blob) => {
                const blobURL = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobURL;
                link.download = 'Photo.png';
                link.innerHTML = 'Click here to download the file';
                document.body.appendChild(link);
                const address = `http://localhost:8070/getPolicy?customAddress=${roomName}`;
                console.log(address);
                axios.get(address).then((response: any) =>
                    axios
                        .post(response.data['url'], link)
                        .then((response) => console.log('photo posted to: ', response.data['url']))
                        .catch((error) => {
                            console.log(response);
                            console.error(error);
                        }),
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
