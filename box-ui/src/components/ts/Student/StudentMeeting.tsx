import React, { useState, FunctionComponent, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/BoxMeeting.css';
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
    const processes = ['process1', 'process2', 'process3', 'process4'];
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
    const [coord, setCoord] = useState<Array<Array<number>>>([]);

    //circle : svg element to display on click on the image
    const [circles, setCircles] = useState<React.SVGProps<SVGCircleElement>[]>([]);
    const [endCarre, setEndCarre] = useState<boolean>(false);
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
            if (!endCarre) {
                setTextBtn('Annuler');
            }
        } else {
            setTextBtn('Recadrer');
            setCoord([]);
            setEndCarre(false);
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

    // function called on click to validate the coordinates entry
    function validerSaisie() {
        setSelectCoord(false);
        setEndCarre(false);
        let c: any[] = [];

        // operation to send the correct coordinates to the back
        const rapportx = width_img_original / widthAff;
        const rapporty = height_img_original / heightAff;
        for (let i = 0; i < 4; i++) {
            const x = coord[i][0] * rapportx;
            const y = coord[i][1] * rapporty;
            c = [...c, [x, y]];
        }

        const bodyFormData = new FormData();

        c.forEach((item) => {
            bodyFormData.append('coord', item);
        });
        axios.post('http://localhost:8070/coord', { coord: c }).then(function () {
            setCoord([]);
            setCircles([]);
        });
    }

    // get relative coodinates of the click of the user
    const getClickCoords = (event: { target: any; clientX: number; clientY: number }) => {
        const e = event.target;
        const dim = e.getBoundingClientRect();
        const x = event.clientX - dim.left;
        const y = event.clientY - dim.top;
        return [x, y];
    };

    const addCircle = (event: { target: any; clientX: number; clientY: number }) => {
        if (selectCoord && !endCarre) {
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
            if (original) {
                const height = newImg.height;
                const width = newImg.width;
                const ratio_img = ((width * 50) / height).toString() + 'vh';
                setRatioOriginal(ratio_img);
                setWidthOriginal(width);
                setHeightOriginal(height);
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
                setHeight(height);
            }
        };

        newImg.src = imgSrc; // this must be done AFTER setting onload
    }

    // download the image (with the potential cropped effect) from the back
    function requestImage() {
        axios.get('http://localhost:8070/photo').then((resp) => {
            const arrayBuffer = resp.data;
            const image_Slice = new Image();
            image_Slice.src = 'data:image/jpg;base64,' + arrayBuffer;
            setImg(image_Slice.src);
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
            setImg_original(image_Slice.src);
        });
    }

    const requestProcessedImage = (process: string) => {
        axios.get(`http://localhost:8070/photo?process=${process}`).then((resp) => {
            const arrayBuffer = resp.data;
            const image_Slice = new Image();
            image_Slice.src = 'data:image/jpg;base64,' + arrayBuffer;
            setImg(image_Slice.src);
        });
    };

    return (
        <div className='CreateMeetingComponent'>
            <PopupComponent information={information} setInformation={setInformation} />
            <div className='CreateMeetingContainer'>
                <div className='JitsiComponent'>
                    <JitsiFrame information={information} options={meetingOptions} />
                </div>
            </div>
            <div className='containerStudent'>
                {!selectCoord && (
                    <Container>
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
                    </Container>
                )}

                {selectCoord && (
                    <Container>
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
                    </Container>
                )}
            </div>

            <div className='sectionButtonsStudent'>
                <div className='buttonAmeliorerVue'>
                    <button className='buttonStudent' onClick={() => AmeliorerVue()}>
                        {textBtn}
                    </button>
                </div>
                {endCarre && (
                    <div>
                        <button className='buttonStudent' onClick={() => validerSaisie()}>
                            Valider
                        </button>
                    </div>
                )}
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

export default StudentMeeting;
