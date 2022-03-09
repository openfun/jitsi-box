import React, { useState, FunctionComponent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/CreateMeetingComponent.css';
import JitsiComponent from './JitsiComponent';
import PopupComponent from './PopupComponent';
import { LocationState } from '../../utils/State';
import styled from '@emotion/styled';
import axios from 'axios';

import image from './15.png';
import { url } from 'inspector';
import { height, width } from '@mui/system';

const CreateMeetingComponent: FunctionComponent = () => {
    const state = useLocation().state as LocationState;
    const [information, setInformation] = useState({
        roomName: state && state.roomName ? state.roomName : 'dty',
        domain: state && state.domain ? state.domain : 'meeting.education',
    });

    const [coord, setCoord] = useState<any>([]);
    const [carre, setCarre] = useState<boolean>(false);
    const [circles, setCircles] = useState<any>([]);
    const [endCarre, setEndCarre] = useState<boolean>(false);
    const [textBtn, setTextBtn] = useState('Ameliorer Vue');
    const [width_img, setWidth] = useState(0);
    const [height_img, setHeight] = useState(0);
    const [ratio_img, setRatio] = useState('');
    const [img_ws, setImg_ws] = useState<string>('./15.png');
    const [img_click, setImg_click] = useState<string>('./15.png');
    const [show, setshow] = useState(false);
    const [widthAff, setWidthAff] = useState(0);
    const [heightAff, setHeightAff] = useState(0);

    useEffect(() => {
        if (carre) {
            if (endCarre) {
            } else {
                setTextBtn('Annuler');
            }
        } else {
            setTextBtn('Améliorer vue');
            setCoord([]);
            setEndCarre(false);
            setCircles([]);
        }
    }, [carre]);

    useEffect(() => {
        getImgSize(img_ws, bbb);
    }, [img_ws]);

    function bbb(x: any, y: any) {
        return [x, y];
    }

    function validerSaisie() {
        setTextBtn('Améliorer vue');
        setshow(false);
        setEndCarre(false);
        setCarre((old_carre) => !old_carre);
        let c: any[] = [];
        const rapportx = width_img / widthAff;
        const rapporty = height_img / heightAff;
        for (let i = 0; i < 4; i++) {
            const x = coord[i][0] * rapportx;
            const y = coord[i][1] * rapporty;
            c = [...c, [x, y]];
        }

        const bodyFormData = new FormData();

        c.forEach((item) => {
            bodyFormData.append('coord', item);
        });
        const article = { name: 'TTTTTTEST' };
        alert(bodyFormData.getAll('coord'));
        axios.post('http://localhost:8070/coord', { coord: c }).then(function (response) {
            alert(response);
            setCoord([]);
        });
    }

    const getClickCoords = (event: { target: any; clientX: any; clientY: any }) => {
        // from: https://stackoverflow.com/a/29296049/14198287
        const e = event.target;
        const dim = e.getBoundingClientRect();
        const x = event.clientX - dim.left;
        const y = event.clientY - dim.top;
        return [x, y];
    };

    const addCircle = (event: { target: any; clientX: any; clientY: any }) => {
        if (carre && !endCarre) {
            // get click coordinates
            const [x, y] = getClickCoords(event);
            setCoord([...coord, [x, y]]);
            // make new svg circle element
            // more info here: https://www.w3schools.com/graphics/svg_circle.asp
            const newCircle = (
                <circle key={circles.length + 1} cx={x} cy={y} r='5' stroke='black' strokeWidth='1' fill='blue' />
            );

            // update the array of circles; you HAVE to spread the current array
            // as 'circles' is immutible and will not accept new info
            const allCircles: any[] = [...circles, newCircle];

            const cnt = allCircles.length;
            if (cnt == 4) {
                setEndCarre(true);
                const e = event.target;
                const dim = e.getBoundingClientRect();
                setHeightAff(dim.bottom - dim.top);
                setWidthAff(dim.right - dim.left);
            }
            // update 'circles'
            setCircles(allCircles);
        }
    };

    function cliqueMoi() {
        if (show) {
            setshow(false);
        } else {
            setshow(true);
            setImg_click(img_ws);
        }
        setCarre((old_carre) => !old_carre);
    }

    function getImgSize(imgSrc: string, callback: (arg0: number, arg1: number) => any) {
        const newImg = new Image();

        newImg.onload = function () {
            const height = newImg.height;
            const width = newImg.width;
            const ratio_img = ((width * 50) / height).toString() + 'vh';
            setRatio(ratio_img);
            setWidth(width);
            setHeight(height);
        };

        newImg.src = imgSrc; // this must be done AFTER setting onload
    }

    // definition of the web socket
    useEffect(() => {
        const ws1 = new WebSocket('ws://localhost:8070/ws1');
        //ws1.binaryType = 'arraybuffer';

        ws1.onmessage = function (event) {
            if (event.data == 'true') {
                requestImage();
            }
            //const arrayBuffer = event.data;
            //const image_Slice = new Image();
            //image_Slice.src = 'data:image/jpg;base64,' + arrayBuffer;
            //setImg_ws(image_Slice.src);
        };

        const interval = setInterval(() => {
            ws1.send('photo?');
        }, 1000);

        return () => {
            ws1.close;
            clearInterval(interval);
        };
    }, []);
    const mystyle = {
        backgroundImage: "url('" + img_ws + "')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    };

    function requestImage() {
        axios.get('http://localhost:8070/photo').then((resp) => {
            const arrayBuffer = resp.data;
            const image_Slice = new Image();
            image_Slice.src = 'data:image/jpg;base64,' + arrayBuffer;
            setImg_ws(image_Slice.src);
        });
    }

    return (
        <div className='CreateMeetingComponent'>
            <PopupComponent information={information} setInformation={setInformation} />
            <div className='CreateMeetingContainer'>
                <div className='JitsiComponent'>
                    <JitsiComponent information={information} />
                </div>
            </div>

            <div className='container'>
                <Container>
                    <div className='sectionClick'>
                        <ClickableSVG
                            height='50vh'
                            width={ratio_img}
                            style={{
                                backgroundImage: "url('" + img_ws + "')",
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                            }}
                        ></ClickableSVG>
                    </div>

                    {show && (
                        <div className='flux'>
                            <ClickableSVG
                                height='50vh'
                                width={ratio_img}
                                onClick={addCircle}
                                style={{
                                    backgroundImage: "url('" + img_click + "')",
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                }}
                            >
                                {circles}
                            </ClickableSVG>
                        </div>
                    )}
                </Container>
                <div className='sectionButtons'>
                    <div className='clickButton'>
                        <button onClick={() => cliqueMoi()}> {textBtn} </button>
                    </div>
                    {carre && <div></div>}
                    {endCarre && (
                        <div>
                            <button onClick={() => validerSaisie()}> Valider </button>
                        </div>
                    )}
                    <div>
                        <button onClick={() => requestImage()}> Image </button>
                    </div>
                </div>
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

const Container = styled.div`
    width: 100%;
    hieght: 100%;
    background-color: black;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: nowrap;
    flex-grow: 8;
`;

export default CreateMeetingComponent;
