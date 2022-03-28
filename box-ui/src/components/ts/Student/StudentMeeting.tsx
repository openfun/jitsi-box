import React, { useState, FunctionComponent, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/StudentMeeting.css';
import CircularProgress from '@mui/material/CircularProgress';
import { LocationState } from '../../../utils/State';
import JitsiFrame from '../JitsiFrame';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import FocusMode from '../FocusMode';
import SelectButton from '../SelectButton';
import FloatingBox from '../FloatingBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LaunchIcon from '@mui/icons-material/Launch';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ImageViewer from '../ImageViewer';

const StudentMeeting: FunctionComponent = () => {
    const processes = [
        { id: 0, text: 'Color' },
        { id: 1, text: 'B&W' },
        { id: 2, text: 'Contrast' },
        { id: 3, text: 'Original' },
    ];
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
    const [displayFocus, setDisplayFocus] = useState(false);
    const state = useLocation().state as LocationState;
    const navigate = useNavigate();
    const information: { roomName: string; domain: string } = useMemo(() => {
        return {
            roomName: state && state.roomName ? state.roomName : 'dty',
            domain: state && state.domain ? state.domain : 'meeting.education',
        };
    }, []);

    const [selectCoord, setSelectCoord] = useState<boolean>(false);
    const [coord, setCoord] = useState<[number, number][]>([]);
    const [processSelected, setprocessSelected] = useState<string>('original');

    //circle : svg element to display on click on the image
    const [circles, setCircles] = useState<React.SVGProps<SVGCircleElement>[]>([]);

    // img : downloaded from back, potentially cropped
    const [widthImgDouble, setWidthImgDouble] = useState<number>(0);
    const [img, setImg] = useState<string>('../../FirstPicture.png');
    const [imgIsCropped, setImgIsCropped] = useState<boolean>(false);

    // img original : not cropped
    const [widthImgOriginal, setWidthImgOriginal] = useState<number>(0);
    const [heightImgOriginal, setHeightImgOriginal] = useState<number>(0);
    const [ratioImgOriginal, setRatioImgOriginal] = useState<number>(0);
    const [imgOriginal, setImgOriginal] = useState<string>('../../FirstPicture.png');

    //Dimension image affichée
    const [widthAff, setWidthAff] = useState<number>(0);
    const [heightAff, setHeightAff] = useState<number>(0);

    //Animation loading, waiting for new Image
    const [loading, setLoading] = useState<boolean>(false);

    //choose if the image or the video is the secondary display
    const [minimize, setMinimize] = useState<boolean>(false);

    //choose if the image or the video is the secondary display
    const [miniImg, setMiniImg] = useState<boolean>(true);

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
        const interval = setInterval(() => {
            requestProcessedImage(processSelected);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [information, processSelected]);

    const configureFrame = useCallback(
        (api: JitsiMeetExternalAPI) => {
            api.addListener('videoConferenceLeft', () => {
                navigate('/student', {
                    replace: true,
                    state: {
                        count: 120,
                        roomName: information.roomName,
                        domain: information.domain,
                    },
                });
            });
        },
        [information],
    );

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
        const addressCoord = process.env.REACT_APP_BACK_WEBROOT + '/coord';
        if (addressCoord === undefined) {
            console.error('Coordinate address is not configured');
        } else {
            axios.post(addressCoord, { room_name: information.roomName, coord: coordinatesList }).then(function () {
                setCoord([]);
                setCircles([]);
                requestProcessedImage(processSelected, true);
            });
        }
    }

    function resetCadrage() {
        setImgIsCropped(false);
        const addressCoord = process.env.REACT_APP_BACK_WEBROOT + '/coord';
        if (addressCoord === undefined) {
            console.error('Coordinate address is not configured');
        } else {
            axios.post(addressCoord, { room_name: information.roomName, coord: [] }).then(function () {
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

    function ChangeView() {
        setMiniImg((miniImg) => !miniImg);
    }

    function ChangeMinimize() {
        setMinimize((minimize) => !minimize);
    }

    function getImgSize(imgSrc: string, original: boolean) {
        const newImg = new Image();

        newImg.onload = function () {
            const widthNew = newImg.width;
            const heightNew = newImg.height;
            if (original) {
                const ratioImg = (widthNew * 45) / heightNew;
                setRatioImgOriginal(ratioImg);
                setWidthImgOriginal(widthNew);
                setHeightImgOriginal(heightNew);
            } else {
                // dimensions of the original image, not of the image displayed on screen
                setWidthImgDouble((widthNew * 45) / heightNew);
            }
        };

        newImg.src = imgSrc; // this must be done AFTER setting onload
    }

    // download the image (with the potential cropped effect) from the back

    const requestProcessedImage = (proc: string, afterCrop = false) => {
        const address = process.env.REACT_APP_BACK_WEBROOT + '/process';
        setprocessSelected(proc);
        if (address) {
            axios.get(address, { params: { room_name: information.roomName, process: proc } }).then((resp) => {
                const arrayBuffer = resp.data;
                const imageSlice = new Image();
                imageSlice.src = 'data:image/jpg;base64,' + arrayBuffer;
                setImg(imageSlice.src);
                if (afterCrop) {
                    setLoading(false);
                }
            });
        }
    };
    //download the original image from the back
    function requestOriginalImage() {
        const addressOriginalPhoto = process.env.REACT_APP_BACK_WEBROOT + '/original_photo';
        if (addressOriginalPhoto === undefined) {
            console.error('Original photo address is not configured');
        } else {
            axios.get(addressOriginalPhoto, { params: { room_name: information.roomName } }).then((resp) => {
                const arrayBuffer = resp.data;
                const imageSlice = new Image();
                imageSlice.src = 'data:image/jpg;base64,' + arrayBuffer;
                setImgOriginal(imageSlice.src);
            });
        }
    }

    return (
        <div className='CreateMeetingComponent'>
            {!minimize && (
                <div className='CreateMeetingComponent'>
                    <div className='CreateMeetingContainer'>
                        <div className='JitsiComponent'>
                            <JitsiFrame information={information} options={meetingOptions} configure={configureFrame} />
                        </div>
                    </div>
                    <div className='containerStudent'>
                        <div className='containerImgStudent'>
                            <ImageViewer
                                img1={[img, '45vh', widthImgDouble.toString() + 'vh']}
                                img2={[imgOriginal, '45vh', widthImgDouble.toString() + 'vh']}
                                onclick={addCircle}
                                addOn={circles}
                                selectWindow={selectCoord}
                            />
                            <button
                                className='openWindow'
                                onClick={ChangeMinimize}
                                style={{ position: 'absolute', top: '70%', left: '90%' }}
                            >
                                <LaunchIcon style={{ height: '20px', width: '20px' }} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {minimize && miniImg && (
                <FloatingBox>
                    <div className='containerImgStudent'>
                        <ImageViewer
                            img1={[img, '30vh', ((widthImgDouble / 45) * 30).toString() + 'vh']}
                            img2={[imgOriginal, '30vh', ((ratioImgOriginal / 45) * 30).toString() + 'vh']}
                            onclick={addCircle}
                            addOn={circles}
                            selectWindow={selectCoord}
                        />
                        <button
                            className='closeWindow'
                            onClick={ChangeMinimize}
                            style={{ position: 'absolute', top: '0%', left: '90%' }}
                        >
                            <HighlightOffIcon style={{ height: '20px', width: '20px' }} />
                        </button>
                        <button
                            className='switch'
                            onClick={ChangeView}
                            style={{ position: 'absolute', top: '85%', left: '90%' }}
                        >
                            <CompareArrowsIcon style={{ height: '20px', width: '20px' }} />
                        </button>
                        {loading && <CircularProgress className='circularProgress' />}
                    </div>
                </FloatingBox>
            )}
            {minimize && miniImg && (
                <div className='CreateMeetingContainer'>
                    <div className='JitsiComponent'>
                        <JitsiFrame information={information} options={meetingOptions} />
                    </div>
                </div>
            )}
            {minimize && !miniImg && (
                <FloatingBox>
                    <div className='CreateMeetingContainer'>
                        <div className='JitsiComponent' style={{ margin: '20px' }}>
                            <JitsiFrame information={information} options={meetingOptions} />
                        </div>
                        <button
                            className='switch'
                            onClick={ChangeView}
                            style={{ position: 'absolute', top: '85%', left: '90%' }}
                        >
                            <CompareArrowsIcon style={{ height: '20px', width: '20px' }} />
                        </button>
                        <button
                            className='closeWindow'
                            onClick={ChangeMinimize}
                            style={{ position: 'absolute', top: '0%', left: '90%' }}
                        >
                            <HighlightOffIcon style={{ height: '20px', width: '20px' }} />
                        </button>
                    </div>
                </FloatingBox>
            )}
            {minimize && !miniImg && (
                <div className='containerImgStudent'>
                    <ImageViewer
                        img1={[img, '45vh', widthImgDouble.toString() + 'vh']}
                        img2={[img, '45vh', ratioImgOriginal.toString() + 'vh']}
                        selectWindow={selectCoord}
                    />
                </div>
            )}

            <div className='sectionButtonsStudent'>
                <div className='selectFilter'>
                    <SelectButton
                        menuItemsStyle={{
                            color: 'white',
                            backgroundColor: '#141414',
                            '& .MuiSelect-icon': { color: 'white' },
                            '&:hover': { background: '#14141495' },
                            cursor: 'pointer',
                            border: 'solid white 1px',
                            borderRadius: '0.6rem',
                        }}
                        className='buttonStudent'
                        selectItems={{
                            inputLabel: { text: 'Select Filter', style: { color: 'white' } },
                            menuItems: processes,
                        }}
                        onChange={(e) => {
                            requestProcessedImage(e.target.value);
                        }}
                    />
                </div>
                <div className='cropButton'>
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
                <IconButton id='TutoButton' aria-label='help' onClick={() => setDisplayFocus(!displayFocus)}>
                    <HelpIcon sx={{ color: 'white' }} />
                </IconButton>
            </div>
            {displayFocus && (
                <FocusMode
                    focusItems={[
                        { element: '.sectionClickSolo', textElement: t('tutoSectionClickSolo') },
                        { element: '.selectFilter', textElement: t('tutoSelectFilter') },
                        { element: '.cropButton', textElement: t('tutoCropButton') },
                        { element: '.openWindow', textElement: t('tutoOpenWindow') },
                        { element: '.closeWindow', textElement: t('tutoCloseWindow') },
                        { element: '.switch', textElement: t('tutoCloseWindow') },
                    ]}
                    setDisplayFocus={setDisplayFocus}
                />
            )}
        </div>
    );
};
export default StudentMeeting;
