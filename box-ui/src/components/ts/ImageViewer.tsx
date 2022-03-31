import React, { FunctionComponent } from 'react';
import { ViewerProps } from '../../utils/Props';
import styled from '@emotion/styled';
import '../css/StudentMeeting.css';
import CircularProgress from '@mui/material/CircularProgress';

const ImageViewer: FunctionComponent<ViewerProps> = (props: ViewerProps) => {
    return (
        <div className='ImageViewer'>
            {props.img2 && props.selectWindow && (
                <div className='sectionClick' onClick={props.onclick}>
                    <img draggable='false' id='originalImage' src={props.img2} />
                    <ClickableSVG>
                        {props.coords?.map((coord) => {
                            return (
                                <circle
                                    key={Math.round(coord[0] + coord[1] * 100)}
                                    cx={Math.round(
                                        coord[0] *
                                            (document.getElementById('originalImage')?.getBoundingClientRect().width ??
                                                0),
                                    )}
                                    cy={Math.round(
                                        coord[1] *
                                            (document.getElementById('originalImage')?.getBoundingClientRect().height ??
                                                0),
                                    )}
                                    r='6'
                                    stroke='white'
                                    strokeWidth='2'
                                    fill='blue'
                                />
                            );
                        })}
                    </ClickableSVG>
                </div>
            )}
            <div className='containerLoading'>
                <img draggable='false' id='croppedImage' src={props.img1} />
                {props.loading && (
                    <div className='circularProgress'>
                        <CircularProgress />
                    </div>
                )}
            </div>
        </div>
    );
};
const ClickableSVG = styled.svg`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2;
    & * {
        /* Block your circles from triggering 'add circle' */
        pointer-events: none;
    }
`;
export default ImageViewer;
