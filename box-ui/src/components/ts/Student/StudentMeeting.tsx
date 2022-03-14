import React, { useState, FunctionComponent, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/StudentMeeting.css';
import PopupComponent from '../PopupComponent';
import CircularProgress from '@mui/material/CircularProgress';
import { LocationState } from '../../../utils/State';
import styled from '@emotion/styled';
import JitsiFrame from '../JitsiFrame';
import axios from 'axios';

const StudentMeeting: FunctionComponent = () => {
    const meetingOptions = useMemo(
        () => ({
            configOverwrite: {
                prejoinConfig: {
                    enabled: false,
                },
            },
        }),
        [],
    );
    const state = useLocation().state as LocationState;
    const [information, setInformation] = useState({
        roomName: state && state.roomName ? state.roomName : 'dty',
        domain: state && state.domain ? state.domain : 'meeting.education',
    });

    const [selectCoord, setSelectCoord] = useState<boolean>(false);
    const [coord, setCoord] = useState<[number, number][]>([]);

    //circle : svg element to display on click on the image
    const [circles, setCircles] = useState<React.SVGProps<SVGCircleElement>[]>([]);
    const [textBtn, setTextBtn] = useState<string>('Recadrer');

    // img : downloaded from back, potentially cropped
    const [height_img, setHeight] = useState<number>(0);
    const [img, setImg] = useState<string>('../../FirstPicture.png');

    // img original : not cropped
    const [width_img_original, setWidthOriginal] = useState<number>(0);
    const [height_img_original, setHeightOriginal] = useState<number>(0);
    const [ratio_img_original, setRatioOriginal] = useState<string>('');
    const [img_original, setImg_original] = useState<string>('../../FirstPicture.png');

    //Dimension image affichée
    const [widthAff, setWidthAff] = useState<number>(0);
    const [heightAff, setHeightAff] = useState<number>(0);

    //Animation loading, waiting for new Image
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (selectCoord) {
            if (!(coord.length == 4)) {
                setTextBtn('Annuler');
            }
        } else {
            setTextBtn('Recadrer');
            setCoord([]);
            setCircles([]);
        }
    }, [selectCoord]);

    useEffect(() => {
        getImgSize(img, false);
    }, [img]);

    useEffect(() => {
        getImgSize(img_original, true);
    }, [img_original]);

    useEffect(() => {
        const address = process.env.REACT_APP_WS_ADDRESS;
        if (address) {
            const ws1 = new WebSocket(address);
            ws1.onmessage = function (event) {
                if (event.data == 'true') {
                    // if there is a new image availabe on the back
                    requestImage();
                }
            };

            // ask to backend if there is a new photo to download
            const interval = setInterval(() => {
                ws1.send(information.roomName);
            }, 1000);

            return () => {
                ws1.close;
                clearInterval(interval);
            };
        }
    }, []);

    // function called on click to validate the coordinates entry
    function validerSaisie() {
        setSelectCoord(false);
        let coordinatesList: any[] = [];

        // operation to send the correct coordinates to the back
        const rapportx = width_img_original / widthAff;
        const rapporty = height_img_original / heightAff;
        coordinatesList = coord.map((point) => [point[0] * rapportx, point[1] * rapporty]);
        const address = process.env.REACT_APP_COORD;
        if (address) {
            axios.post(address, { roomName: information.roomName, coord: coordinatesList }).then(function () {
                setCoord([]);
                setCircles([]);
            });
        } else {
            alert('test');
        }
    }

    // get relative coodinates of the click of the user
    const getClickCoords = (event: { target: any; clientX: number; clientY: number }) => {
        const dim = event.target.getBoundingClientRect();
        const x = event.clientX - dim.left;
        const y = event.clientY - dim.top;
        return [x, y];
    };

    const addCircle = (event: { target: any; clientX: number; clientY: number }) => {
        if (selectCoord && !(coord.length == 4)) {
            // get click coordinates
            const [x, y] = getClickCoords(event);
            setCoord([...coord, [x, y]]);
            // make new svg circle element
            const newCircle = (
                <circle key={circles.length + 1} cx={x} cy={y} r='6' stroke='white' strokeWidth='2' fill='blue' />
            );

            // update the array of circles; you HAVE to spread the current array
            // as 'circles' is immutible and will not accept new info
            const allCircles: React.SVGProps<SVGCircleElement>[] = [...circles, newCircle];

            const cnt = allCircles.length;
            if (cnt == 4) {
                // if there are 4 coordinates, do not allow to click again
                const dim = event.target.getBoundingClientRect();
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
        if (selectCoord) {
            setSelectCoord(false);
            setLoading(false);
        } else {
            requestOriginalImage();
            setSelectCoord(true);
        }
    }

    function getImgSize(imgSrc: string, original: boolean) {
        const newImg = new Image();

        newImg.onload = function () {
            const width = newImg.width;
            let height = newImg.height;
            if (original) {
                const ratio_img = ((width * 50) / height).toString() + 'vh';
                setRatioOriginal(ratio_img);
                setWidthOriginal(width);
                setHeightOriginal(height);
            } else {
                // dimensions of the original image, not of the image displayed on screen
                const ViewportWidth = window.innerWidth * 0.9;
                const ViewportHeight = window.innerHeight * 0.5;

                const pot_height = (height / width) * ViewportWidth;
                if (pot_height < ViewportHeight) {
                    height = pot_height;
                } else {
                    height = ViewportHeight;
                }
                setHeight(height);
            }
        };

        newImg.src = imgSrc; // this must be done AFTER setting onload
    }

    // download the image (with the potential cropped effect) from the back
    function requestImage() {
        const address = process.env.REACT_APP_PHOTO;
        if (address) {
            axios.get(address, { params: { roomName: information.roomName } }).then((resp) => {
                const arrayBuffer = resp.data;
                const image_Slice = new Image();
                image_Slice.src = 'data:image/jpg;base64,' + arrayBuffer;
                setImg(image_Slice.src);
                setLoading(false);
                setTextBtn('Recadrer');
            });
        }
    }

    //download the original image from the back
    function requestOriginalImage() {
        setLoading(true);
        const address = process.env.REACT_APP_ORIGINAL_PHOTO;
        if (address) {
            axios.get(address, { params: { roomName: information.roomName } }).then((resp) => {
                const arrayBuffer = resp.data;
                const image_Slice = new Image();
                image_Slice.src = 'data:image/jpg;base64,' + arrayBuffer;
                setImg_original(image_Slice.src);
            });
        }
    }

    return (
        <div className='CreateMeetingComponent'>
            <PopupComponent information={information} setInformation={setInformation} />
            <div className='CreateMeetingContainer'>
                <div className='JitsiComponent'>
                    <JitsiFrame isBox={false} information={information} options={meetingOptions} />
                </div>
            </div>
            <div className='containerStudent'>
                {!selectCoord && (
                    <div className='containerImgStudent'>
                        <div className='sectionClickSolo'>
                            <ClickableSVG
                                height={height_img.toString() + 'px'}
                                style={{
                                    backgroundImage: "url('" + img + "')",
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    maxWidth: '95vw',
                                    maxHeight: '50vh',
                                }}
                            ></ClickableSVG>
                            {loading && <CircularProgress className='circularProgress' />}
                        </div>
                    </div>
                )}

                {selectCoord && (
                    <div className='containerImgStudent'>
                        <div>
                            <ClickableSVG
                                height='50vh'
                                width={ratio_img_original}
                                onClick={addCircle}
                                style={{
                                    backgroundImage: "url('" + img_original + "')",
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    maxWidth: '45vw',
                                    border: '1px solid blue',
                                }}
                            >
                                {circles}
                            </ClickableSVG>
                        </div>
                        <div className='sectionClick'>
                            <ClickableSVG
                                height='50vh'
                                style={{
                                    backgroundImage: "url('" + img + "')",
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    maxWidth: '40vw',
                                }}
                            ></ClickableSVG>
                        </div>
                    </div>
                )}
            </div>

            <div className='sectionButtonsStudent'>
                <div className='buttonAmeliorerVue'>
                    <button className='buttonStudent' onClick={() => AmeliorerVue()}>
                        {textBtn}
                    </button>
                </div>
                {coord.length == 4 && (
                    <div>
                        <button className='buttonStudent' onClick={() => validerSaisie()}>
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

export default StudentMeeting;
