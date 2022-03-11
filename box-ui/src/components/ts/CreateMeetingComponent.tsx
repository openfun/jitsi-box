import React, { useState, FunctionComponent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/CreateMeetingComponent.css';
import JitsiComponent from './JitsiComponent';
import PopupComponent from './PopupComponent';
import CircularProgress from '@mui/material/CircularProgress';
import { LocationState } from '../../utils/State';
import styled from '@emotion/styled';
import axios from 'axios';
import DepWindow from './dep-window';
import NewWindow from 'react-new-window';

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
    const [textBtn, setTextBtn] = useState('Recadrer');
    const [width_img, setWidth] = useState(0);
    const [height_img, setHeight] = useState(0);
    const [ratio_img, setRatio] = useState('');
    const [width_img_click, setWidthClick] = useState(0);
    const [height_img_click, setHeightClick] = useState(0);
    const [ratio_img_click, setRatioClick] = useState('');
    const [img_ws, setImg_ws] = useState<string>('./15.png');
    const [img_click, setImg_click] = useState<string>('./15.png');
    const [show, setshow] = useState(false);
    const [widthAff, setWidthAff] = useState(0);
    const [heightAff, setHeightAff] = useState(0);
    const [loading, setLoading] = useState(false);
    const [textCircle, setTextCircle] = useState<string>('hide');
    const [showWindowPortal, setShowWindowPortal] = useState(false);

    useEffect(() => {
        if (carre) {
            if (endCarre) {
            } else {
                setTextBtn('Annuler');
            }
        } else {
            setTextBtn('Recadrer');
            setCoord([]);
            setEndCarre(false);
            setCircles([]);
        }
    }, [carre]);

    useEffect(() => {
        setTextCircle('flex');
    }, [loading]);

    useEffect(() => {
        getImgSize(img_ws, false);
    }, [img_ws]);

    window.addEventListener('beforeunload', () => {
        closeWindowPortal();
    });

    useEffect(() => {
        getImgSize(img_click, true);
    }, [img_click]);

    useEffect(() => {
        const ws1 = new WebSocket('ws://localhost:8070/ws1');
        ws1.onmessage = function (event) {
            if (event.data == 'true') {
                // if there is a new image availabe on the back
                requestImage();
            }
        };
        // ask to backend if there is a new photo to download
        const interval = setInterval(() => {
            ws1.send('photo?');
        }, 1000);

        return () => {
            ws1.close;
            clearInterval(interval);
        };
    }, []);

    const closeWindowPortal = () => {
        setShowWindowPortal(false);
    };

    // function called on click to validate the coordinates entry
    function validerSaisie() {
        setTextBtn('Chargement');
        setshow(false);
        setEndCarre(false);
        setCarre((old_carre) => !old_carre);
        let c: any[] = [];

        // operation to post the correct coordinates to the back
        const rapportx = width_img_click / widthAff;
        const rapporty = height_img_click / heightAff;
        for (let i = 0; i < 4; i++) {
            const x = coord[i][0] * rapportx;
            const y = coord[i][1] * rapporty;
            c = [...c, [x, y]];
        }

        const bodyFormData = new FormData();

        c.forEach((item) => {
            bodyFormData.append('coord', item);
        });
        //alert(bodyFormData.getAll('coord'));
        axios.post('http://localhost:8070/coord', { coord: c }).then(function () {
            setCoord([]);
            setCircles([]);
        });
    }

    // get relative coodinates of the click of the user
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
                <circle key={circles.length + 1} cx={x} cy={y} r='6' stroke='white' strokeWidth='2' fill='blue' />
            );

            // update the array of circles; you HAVE to spread the current array
            // as 'circles' is immutible and will not accept new info
            const allCircles: any[] = [...circles, newCircle];

            const cnt = allCircles.length;
            if (cnt == 4) {
                // if there are 4 coordinates, do not allow to click again
                setEndCarre(true);
                const e = event.target;
                const dim = e.getBoundingClientRect();
                // dimensions of the image displayed on screen
                setHeightAff(dim.bottom - dim.top);
                setWidthAff(dim.right - dim.left);
            }
            // update 'circles'
            setCircles(allCircles);
        }
    };

    // function called on click of the button
    function AmeliorerVue() {
        if (show) {
            setshow(false);
            setLoading(false);
        } else {
            requestOriginalImage();
            setshow(true);
        }
        setCarre((old_carre) => !old_carre);
    }

    function getImgSize(imgSrc: string, original: boolean) {
        const newImg = new Image();

        newImg.onload = function () {
            if (original) {
                const height = newImg.height;
                const width = newImg.width;
                const ratio_img = ((width * 50) / height).toString() + 'vh';
                setRatioClick(ratio_img);
                setWidthClick(width);
                setHeightClick(height);
            } else {
                // dimensions of the original image, not of the image displayed on screen
                let height = newImg.height;
                const ViewportWidth = window.innerWidth * 0.9;
                const ViewportHeight = window.innerHeight * 0.5;
                const width = newImg.width;
                const pot_height = (height / width) * ViewportWidth;
                if (pot_height < ViewportHeight) {
                    height = pot_height;
                } else {
                    height = ViewportHeight;
                }
                const ratio_img = ((width * 50) / height).toString() + 'vh';
                setRatio(ratio_img);
                setWidth(width);
                setHeight(height);
            }
        };

        newImg.src = imgSrc; // this must be done AFTER setting onload
    }

    // download the image (with the coordinates) from the back
    function requestImage() {
        axios.get('http://localhost:8070/photo').then((resp) => {
            const arrayBuffer = resp.data;
            const image_Slice = new Image();
            image_Slice.src = 'data:image/jpg;base64,' + arrayBuffer;
            setImg_ws(image_Slice.src);
            setLoading(false);
            setTextBtn('Recadrer');
        });
    }

    //download the original image from the back
    function requestOriginalImage() {
        setLoading(true);
        axios.get('http://localhost:8070/original_photo').then((resp) => {
            const arrayBuffer = resp.data;
            const image_Slice = new Image();
            image_Slice.src = 'data:image/jpg;base64,' + arrayBuffer;
            setImg_click(image_Slice.src);
        });
    }

    function toggleWindowPortal() {
        const newW = window.open('', '', 'width=600,height=400,left=200,top=200');
        if (newW) {
            newW.document.title = 'A React portal window';
            const containerEl = document.createElement('div');
            newW.document.body.appendChild(containerEl);
            setShowWindowPortal(!showWindowPortal);
        }
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
                {!show && (
                    <Container>
                        <div className='sectionClickSolo'>
                            <ClickableSVG
                                height={height_img.toString() + 'px'}
                                //width={ratio_img}
                                style={{
                                    backgroundImage: "url('" + img_ws + "')",
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    maxWidth: '95vw',
                                }}
                            ></ClickableSVG>
                            {loading && (
                                <CircularProgress style={{ display: textCircle }} className='circularProgress' />
                            )}
                        </div>
                    </Container>
                )}

                {show && (
                    <Container>
                        <div className='flux'>
                            <ClickableSVG
                                height='50vh'
                                width={ratio_img_click}
                                onClick={addCircle}
                                style={{
                                    backgroundImage: "url('" + img_click + "')",
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    maxWidth: '45vw',
                                }}
                            >
                                {circles}
                            </ClickableSVG>
                        </div>
                        <div className='sectionClick'>
                            <ClickableSVG
                                height='50vh'
                                style={{
                                    backgroundImage: "url('" + img_ws + "')",
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    maxWidth: '40vw',
                                }}
                            ></ClickableSVG>
                        </div>
                    </Container>
                )}
            </div>

            <div className='sectionButtons'>
                <div className='clickButton'>
                    <button className='button' onClick={() => AmeliorerVue()}>
                        {textBtn}
                    </button>
                    <button className='button' onClick={() => toggleWindowPortal()}>
                        Nouvelle fenêtre
                    </button>
                </div>
                {endCarre && (
                    <div>
                        <button className='button' onClick={() => validerSaisie()}>
                            Valider
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// style of the component image to click on
const ClickableSVG = styled.svg`
    background-repeat: no-repeat;
    background-size: contain;
    background-color: black;
    & * {
        /* Block your circles from triggering 'add circle' */
        pointer-events: none;
    }
`;

// style of the container of the two images
const Container = styled.div`
    width: 100%;
    hieght: 100%;
    background-color: black;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: nowrap;
`;

export default CreateMeetingComponent;
