import React, { useState, FunctionComponent, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/StudentMeeting.css';
import PopupComponent from '../PopupComponent';
import CircularProgress from '@mui/material/CircularProgress';
import { LocationState } from '../../../utils/State';
import styled from '@emotion/styled';
import JitsiFrame from '../JitsiFrame';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const StudentMeeting: FunctionComponent = () => {
    const { t } = useTranslation();
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

    // img : downloaded from back, potentially cropped
    const [heightImg, setHeightImg] = useState<number>(0);
    const [widthImgDouble, setWidthImgDouble] = useState<string>('');
    const [img, setImg] = useState<string>('../../FirstPicture.png');
    const [imgIsCropped, setImgIsCropped] = useState<boolean>(false);

    // img original : not cropped
    const [widthImgOriginal, setWidthImgOriginal] = useState<number>(0);
    const [heightImgOriginal, setHeightImgOriginal] = useState<number>(0);
    const [ratioImgOriginal, setRatioImgOriginal] = useState<string>('');
    const [imgOriginal, setImgOriginal] = useState<string>('../../FirstPicture.png');

    //Dimension image affichée
    const [widthAff, setWidthAff] = useState<number>(0);
    const [heightAff, setHeightAff] = useState<number>(0);

    //Animation loading, waiting for new Image
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!selectCoord) {
            setCoord([]);
            setCircles([]);
        }
    }, [selectCoord]);

    useEffect(() => {
        getImgSize(img, false);
    }, [img]);

    useEffect(() => {
        getImgSize(imgOriginal, true);
    }, [imgOriginal]);

    useEffect(() => {
        const addressWebsocket = process.env.REACT_APP_WS_ADDRESS;
        if (addressWebsocket == undefined) {
            console.error('Websocket address is not configured');
        } else {
            const ws1 = new WebSocket(addressWebsocket);
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
    }, [information]);

    // function called on click to validate the coordinates entry
    function validerSaisie() {
        setLoading(true);
        setImgIsCropped(true);
        setSelectCoord(false);
        let coordinatesList: [number, number][] = [];

        // operation to send the correct coordinates to the back
        const rapportx = widthImgOriginal / widthAff;
        const rapporty = heightImgOriginal / heightAff;
        coordinatesList = coord.map((point) => [point[0] * rapportx, point[1] * rapporty]);
        const addressCoord = process.env.REACT_APP_COORD;
        if (addressCoord == undefined) {
            console.error('Coordinate address is not configured');
        } else {
            axios.post(addressCoord, { roomName: information.roomName, coord: coordinatesList }).then(function () {
                setCoord([]);
                setCircles([]);
            });
        }
    }

    function resetCadrage() {
        setImgIsCropped(false);
        const addressCoord = process.env.REACT_APP_COORD;
        if (addressCoord == undefined) {
            console.error('Coordinate address is not configured');
        } else {
            axios.post(addressCoord, { roomName: information.roomName, coord: [] }).then(function () {
                setCoord([]);
                setCircles([]);
            });
        }
    }

    // get relative coodinates of the click of the user
    const getClickCoords = (event: React.MouseEvent) => {
        const dim = (event.target as Element).getBoundingClientRect();
        const x = event.clientX - dim.left;
        const y = event.clientY - dim.top;
        return [x, y];
    };

    const addCircle = (event: React.MouseEvent) => {
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
                const dim = (event.target as Element).getBoundingClientRect();
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
            const widthNew = newImg.width;
            let heightNew = newImg.height;
            if (original) {
                const ratioImg = ((widthNew * 45) / heightNew).toString() + 'vh';
                setRatioImgOriginal(ratioImg);
                setWidthImgOriginal(widthNew);
                setHeightImgOriginal(heightNew);
            } else {
                // dimensions of the original image, not of the image displayed on screen
                const ViewportWidth = window.innerWidth * 0.9;
                const ViewportHeight = window.innerHeight * 0.45;
                setWidthImgDouble(((widthNew * 45) / heightNew).toString() + 'vh');
                const potentialHeight = (heightNew / widthNew) * ViewportWidth;
                if (potentialHeight < ViewportHeight) {
                    heightNew = potentialHeight;
                } else {
                    heightNew = ViewportHeight;
                }
                setHeightImg(heightNew);
            }
        };

        newImg.src = imgSrc; // this must be done AFTER setting onload
    }

    // download the image (with the potential cropped effect) from the back
    function requestImage() {
        const addressPhoto = process.env.REACT_APP_PHOTO;
        if (addressPhoto == undefined) {
            console.error('Photo address is not configured');
        } else {
            axios.get(addressPhoto, { params: { roomName: information.roomName } }).then((resp) => {
                const arrayBuffer = resp.data;
                const imageSlice = new Image();
                imageSlice.src = 'data:image/jpg;base64,' + arrayBuffer;
                setImg(imageSlice.src);
                setLoading(false);
            });
        }
    }

    //download the original image from the back
    function requestOriginalImage() {
        const addressOriginalPhoto = process.env.REACT_APP_ORIGINAL_PHOTO;
        if (addressOriginalPhoto == undefined) {
            console.error('Original photo address is not configured');
        } else {
            axios.get(addressOriginalPhoto, { params: { roomName: information.roomName } }).then((resp) => {
                const arrayBuffer = resp.data;
                const imageSlice = new Image();
                imageSlice.src = 'data:image/jpg;base64,' + arrayBuffer;
                setImgOriginal(imageSlice.src);
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
                                height={heightImg + 'px'}
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
                                height='45vh'
                                width={ratioImgOriginal}
                                onClick={addCircle}
                                style={{
                                    backgroundImage: "url('" + imgOriginal + "')",
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
                                height='45vh'
                                width={widthImgDouble}
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
                        {!selectCoord ? t('crop') : t('cancel')}
                    </button>
                </div>
                {coord.length == 4 && (
                    <div>
                        <button className='buttonStudent' onClick={() => validerSaisie()}>
                            {t('validate')}
                        </button>
                    </div>
                )}

                {imgIsCropped && (
                    <button className='buttonStudent' onClick={() => resetCadrage()}>
                        {t('resetCropping')}
                    </button>
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
