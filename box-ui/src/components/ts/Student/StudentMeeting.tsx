import React, { useState, FunctionComponent, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/StudentMeeting.css';
import PopupComponent from '../PopupComponent';
import CircularProgress from '@mui/material/CircularProgress';
import { LocationState } from '../../../utils/State';
import styled from '@emotion/styled';
import JitsiFrame from '../JitsiFrame';
import axios from 'axios';
import { Button, Menu, MenuItem } from '@mui/material';

const StudentMeeting: FunctionComponent = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const processes = ['Color', 'B&W', 'Contrast', 'original', 'SuperRes'];
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
    const [processSelected, setprocessSelected] = useState<string>('original');

    //circle : svg element to display on click on the image
    const [circles, setCircles] = useState<React.SVGProps<SVGCircleElement>[]>([]);
    const [textBtn, setTextBtn] = useState<string>('Recadrer');

    // img : downloaded from back, potentially cropped
    const [height_img, setHeight] = useState<number>(0);
    const [width_img_double, setWidth_img_double] = useState<string>('');
    const [img, setImg] = useState<string>('../../FirstPicture.png');
    const [imgIsCropped, setImgIsCropped] = useState<boolean>(false);

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
            setTextBtn('Annuler');
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
    }, [processSelected, information]);

    // function called on click to validate the coordinates entry
    function validerSaisie() {
        setLoading(true);
        setImgIsCropped(true);
        setSelectCoord(false);
        let coordinatesList: [number, number][] = [];

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

    function resetCadrage() {
        setImgIsCropped(false);
        const address = process.env.REACT_APP_COORD;
        if (address) {
            axios.post(address, { roomName: information.roomName, coord: [] }).then(function () {
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
            const width_new = newImg.width;
            let height_new = newImg.height;
            if (original) {
                const ratio_img = ((width_new * 45) / height_new).toString() + 'vh';
                setRatioOriginal(ratio_img);
                setWidthOriginal(width_new);
                setHeightOriginal(height_new);
            } else {
                // dimensions of the original image, not of the image displayed on screen
                const ViewportWidth = window.innerWidth * 0.9;
                const ViewportHeight = window.innerHeight * 0.45;
                setWidth_img_double(((width_new * 45) / height_new).toString() + 'vh');
                const pot_height = (height_new / width_new) * ViewportWidth;
                if (pot_height < ViewportHeight) {
                    height_new = pot_height;
                } else {
                    height_new = ViewportHeight;
                }
                setHeight(height_new);
            }
        };

        newImg.src = imgSrc; // this must be done AFTER setting onload
    }

    // download the image (with the potential cropped effect) from the back
    function requestImage() {
        const address = process.env.REACT_APP_PROCESS;
        if (address) {
            axios.get(address, { params: { roomName: information.roomName, process: proco } }).then((resp) => {
                const arrayBuffer = resp.data;
                const image_Slice = new Image();
                image_Slice.src = 'data:image/jpg;base64,' + arrayBuffer;
                setImg(image_Slice.src);
                setLoading(false);
            });
        }
    }

    const requestProcessedImage = (proc: string) => {
        const address = process.env.REACT_APP_PROCESS;
        setproco(proc);
        if (address) {
            axios.get(address, { params: { roomName: information.roomName, process: proc } }).then((resp) => {
                const arrayBuffer = resp.data;
                const image_Slice = new Image();
                image_Slice.src = 'data:image/jpg;base64,' + arrayBuffer;
                setImg(image_Slice.src);
                setLoading(false);
            });
        }
    };
    //download the original image from the back
    function requestOriginalImage() {
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
                                height='45vh'
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
                                height='45vh'
                                width={width_img_double}
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
                <div className='selectProcess'>
                    <button
                        // id='button'
                        className='buttonStudent'
                        aria-controls={open ? 'menu' : undefined}
                        aria-haspopup='menu'
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(event) => {
                            handleClick(event);
                        }}
                    >
                        Select Filter
                    </button>
                    <Menu
                        id='menu'
                        aria-labelledby='button'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {processes.map((element, index) => {
                            return (
                                <MenuItem onClick={() => requestProcessedImage(element)} key={index}>
                                    select {element}
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </div>
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

                {imgIsCropped && (
                    <button className='buttonStudent' onClick={() => resetCadrage()}>
                        Annuler recadrage
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
