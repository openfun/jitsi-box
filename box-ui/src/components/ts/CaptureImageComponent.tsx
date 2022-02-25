import React, { useState, useEffect, useRef } from 'react';
import { ImageCapture } from 'image-capture';

const CaptureImage = (props: any) => {
    let imageCapturer = null;

    const intervalPhoto = () => {
        setInterval(start, 10 * 1000);
    };
    const start = (camera: string) => {
        console.log(camera);
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    deviceId: { exact: camera },
                },
            })
            .then(takePhoto)
            .catch((error: any) => console.log(error));
    };
    const takePhoto = (mediastream: MediaStream) => {
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
                console.log('Photo sent');
            })
            .catch((err: any) => {
                console.error('takePhoto() failed: ', err);
            });
    };
    return (
        <div className={props.camera['label']}>
            <button onClick={() => start(props.camera['deviceId'])}>Take a photo with {props.camera['label']} </button>
        </div>
    );
};

export default CaptureImage;
