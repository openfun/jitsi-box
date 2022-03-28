import React, { FunctionComponent } from 'react';
import { ViewerProps } from '../../utils/Props';
import styled from '@emotion/styled';

const ImageViewer: FunctionComponent<ViewerProps> = (props: ViewerProps) => {
    return (
        <div className='containerImgStudent'>
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
            <div>
                <ClickableSVG
                    height={props.img1[1]}
                    width={props.img1[2]}
                    style={{
                        backgroundImage: "url('" + props.img1[0] + "')",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                    }}
                ></ClickableSVG>
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
