import React, { FunctionComponent } from 'react';
import { ViewerProps } from '../../utils/Props';
import styled from '@emotion/styled';
import '../css/StudentMeeting.css';
import CircularProgress from '@mui/material/CircularProgress';

const ImageViewer: FunctionComponent<ViewerProps> = (props: ViewerProps) => {
    return (
        <div className='ImageViewer'>
            {props.img2 && props.selectWindow && (
                <div className='sectionClick'>
                    <ClickableSVG
                        height={props.img2[1]}
                        width={props.img2[2]}
                        onClick={props.onclick}
                        style={{
                            backgroundImage: "url('" + props.img2[0] + "')",
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            border: '1px solid blue',
                        }}
                    >
                        {props.addOn}
                    </ClickableSVG>
                </div>
            )}
            <div className='container_loading'>
                <ClickableSVG
                    height={props.img1[1]}
                    width={props.img1[2]}
                    style={{
                        backgroundImage: "url('" + props.img1[0] + "')",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                    }}
                ></ClickableSVG>
                {props.loading && <CircularProgress className='circularProgress' />}
            </div>
        </div>
    );
};
const ClickableSVG = styled.svg`
    background-repeat: no-repeat;
    background-size: contain;
    background-color: black;
    & * {
        /* Block your circles from triggering 'add circle' */
        pointer-events: none;
    }
`;
export default ImageViewer;
