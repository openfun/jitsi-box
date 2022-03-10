import React, { useEffect, useRef } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
//import { copyStyles } from './copy-styles';

const DepWindow = ({ children, closeWindowPortal }: any) => {
    const externalWindow = useRef(window.open('', '', 'width=600,height=400,left=200,top=200'));

    const containerEl = document.createElement('div');

    useEffect(() => {
        const currentWindow = externalWindow.current;
        if (currentWindow) {
            return () => currentWindow.close();
        }
    }, []);

    if (externalWindow && externalWindow.current && containerEl) {
        externalWindow.current.document.title = 'A React portal window';
        externalWindow.current.document.body.appendChild(containerEl);
        //copyStyles(document, externalWindow.current.document);

        externalWindow.current.addEventListener('beforeunload', () => {
            closeWindowPortal();
        });

        //return createPortal(children, containerEl) as JSX.Element;
        return createPortal(children, containerEl);
    }
};

export default DepWindow as React.ElementType;
