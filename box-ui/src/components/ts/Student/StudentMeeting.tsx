import React, { useState, FunctionComponent, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/StudentMeeting.css';
import { LocationState } from '../../../utils/State';
import { TutoButtonProps, SelectFilterButtonProps, CropButtonProps } from '../../../utils/Props';
import JitsiFrame from '../JitsiFrame';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { IconButton, CircularProgress } from '@mui/material';
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
    const { t, i18n } = useTranslation();
    const meetingOptions = useMemo(
        () => ({
            userInfo: {
                email: '',
                displayName: t('student'),
            },
            configOverwrite: {
                toolbarButtons: [
                    'microphone',
                    'camera',
                    'videoquality',
                    'fodeviceselection',
                    'raisehand',
                    'tileview',
                    'hangup',
                    'chat',
                    'desktop',
                ],
                prejoinConfig: {
                    enabled: false,
                },
                startWithVideoMuted: false,
                startWithAudioMuted: true,
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
    // img : downloaded from back, potentially cropped
    const [img, setImg] = useState<string>(
        i18n.language == 'en' ? '../../FirstPictureEN.png' : '../../FirstPictureFR.png',
    );
    const [imgIsCropped, setImgIsCropped] = useState<boolean>(false);

    // img original : not cropped
    const [widthImgOriginal, setWidthImgOriginal] = useState<number>(0);
    const [heightImgOriginal, setHeightImgOriginal] = useState<number>(0);
    const [imgOriginal, setImgOriginal] = useState<string>(
        i18n.language == 'en' ? '../../FirstPictureEN.png' : '../../FirstPictureFR.png',
    );

    //Animation loading, waiting for new Image
    const [loading, setLoading] = useState<boolean>(false);

    //choose if the image or the video is the secondary display
    const [minimize, setMinimize] = useState<boolean>(false);

    //choose if the image or the video is the secondary display
    const [miniImg, setMiniImg] = useState<boolean>(true);

    useEffect(() => {
        getImgSize(imgOriginal);
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
        coordinatesList = coord.map((point) => [point[0] * widthImgOriginal, point[1] * heightImgOriginal]);
        const addressCoord = process.env.REACT_APP_BACK_WEBROOT + '/coord';
        if (addressCoord === undefined) {
            console.error('Coordinate address is not configured');
            setCoord([]);
        } else {
            axios.post(addressCoord, { room_name: information.roomName, coord: coordinatesList }).then(function () {
                setCoord([]);
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
            });
        }
    }

    // get relative coordinates of the click in proportion of image dimensions
    const getClickCoordsProportional = (event: React.MouseEvent) => {
        const dim = (event.target as Element).getBoundingClientRect();
        const x = (event.clientX - dim.left) / dim.width;
        const y = (event.clientY - dim.top) / dim.height;
        return [x, y];
    };

    const addCircle = (event: React.MouseEvent) => {
        if (selectCoord && !(coord.length == 4)) {
            const [xProportional, yProportional] = getClickCoordsProportional(event);
            setCoord([...coord, [xProportional, yProportional]]);
        }
    };

    // function called on click of the button
    function AmeliorerVue() {
        if (selectCoord) {
            setCoord([]);
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

    function getImgSize(imgSrc: string) {
        const newImg = new Image();

        newImg.onload = function () {
            setWidthImgOriginal(newImg.width);
            setHeightImgOriginal(newImg.height);
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
                if (!(arrayBuffer == undefined)) {
                    setImg(imageSlice.src);
                }
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
        <div className='studentMeeting'>
            {!minimize && (
                <>
                    <JitsiFrame information={information} options={meetingOptions} configure={configureFrame} />
                    <div className='containerImgStudent'>
                        <ImageViewer
                            img1={img}
                            img2={imgOriginal}
                            onclick={addCircle}
                            coords={coord}
                            selectWindow={selectCoord}
                            loading={loading}
                        />
                        <div className='sectionButtonsStudent'>
                            <button className='openWindow' onClick={ChangeMinimize}>
                                <LaunchIcon style={{ height: '20px', width: '20px' }} />
                            </button>
                            <TutoButton setDisplayFocus={setDisplayFocus} displayFocus={displayFocus} />
                            <CropButton
                                selectCoord={selectCoord}
                                coord={coord}
                                validerSaisie={validerSaisie}
                                imgIsCropped={imgIsCropped}
                                resetCadrage={resetCadrage}
                                AmeliorerVue={AmeliorerVue}
                            />
                            <SelectFilterButton requestProcessedImage={requestProcessedImage} processes={processes} />
                        </div>
                    </div>
                </>
            )}
            {minimize && miniImg && (
                <>
                    <FloatingBox>
                        <div className='containerImgStudent floating'>
                            <ImageViewer
                                img1={img}
                                img2={imgOriginal}
                                onclick={addCircle}
                                coords={coord}
                                loading={loading}
                                selectWindow={selectCoord}
                            />
                            {loading && <CircularProgress className='circularProgress' />}
                            <div className='sectionButtonsStudent'>
                                <div className='windowButtons'>
                                    <button className='switch' onClick={ChangeView}>
                                        <CompareArrowsIcon style={{ height: '20px', width: '20px' }} />
                                    </button>
                                    <button className='closeWindow' onClick={ChangeMinimize}>
                                        <HighlightOffIcon style={{ height: '20px', width: '20px' }} />
                                    </button>
                                </div>
                                <TutoButton setDisplayFocus={setDisplayFocus} displayFocus={displayFocus} />
                                <CropButton
                                    selectCoord={selectCoord}
                                    coord={coord}
                                    validerSaisie={validerSaisie}
                                    imgIsCropped={imgIsCropped}
                                    resetCadrage={resetCadrage}
                                    AmeliorerVue={AmeliorerVue}
                                />
                                <SelectFilterButton
                                    requestProcessedImage={requestProcessedImage}
                                    processes={processes}
                                />
                            </div>
                        </div>
                    </FloatingBox>
                    <JitsiFrame information={information} options={meetingOptions} configure={configureFrame} />
                </>
            )}
            {minimize && !miniImg && (
                <>
                    <FloatingBox>
                        <div className='jitsiFrame floating'>
                            <JitsiFrame information={information} options={meetingOptions} configure={configureFrame} />
                        </div>
                        <div className='windowButtons meeting'>
                            <button className='switch' onClick={ChangeView}>
                                <CompareArrowsIcon style={{ height: '20px', width: '20px' }} />
                            </button>
                            <button className='closeWindow' onClick={ChangeMinimize}>
                                <HighlightOffIcon style={{ height: '20px', width: '20px' }} />
                            </button>
                        </div>
                    </FloatingBox>
                    <div className='containerImgStudent maximize'>
                        <ImageViewer
                            img1={img}
                            img2={imgOriginal}
                            selectWindow={selectCoord}
                            loading={loading}
                            coords={coord}
                            onclick={addCircle}
                        />
                        <div className='sectionButtonsStudent maximize'>
                            <TutoButton setDisplayFocus={setDisplayFocus} displayFocus={displayFocus} />
                            <CropButton
                                selectCoord={selectCoord}
                                coord={coord}
                                validerSaisie={validerSaisie}
                                imgIsCropped={imgIsCropped}
                                resetCadrage={resetCadrage}
                                AmeliorerVue={AmeliorerVue}
                            />
                            <SelectFilterButton requestProcessedImage={requestProcessedImage} processes={processes} />
                        </div>
                    </div>
                </>
            )}

            {displayFocus && (
                <FocusMode
                    focusItems={[
                        { element: '.containerImgStudent', textElement: t('tutoSectionClickSolo') },
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

const TutoButton: FunctionComponent<TutoButtonProps> = (props) => {
    return (
        <IconButton
            id='TutoButton'
            aria-label='help'
            onClick={() => props.setDisplayFocus((displayFocus: boolean) => !displayFocus)}
        >
            <HelpIcon
                sx={{
                    color: 'white',
                }}
            />
        </IconButton>
    );
};

const SelectFilterButton: FunctionComponent<SelectFilterButtonProps> = (props) => {
    const { t } = useTranslation();
    return (
        <div className='selectFilter'>
            <SelectButton
                menuItemsStyle={{
                    color: 'white',
                    backgroundColor: 'rgb(30,30,30)',
                    fontSize: 'medium',
                    '& .MuiSelect-icon': {
                        color: 'white',
                    },
                    '&:hover': {
                        background: 'rgba(30,30,30,0.5)',
                    },
                    cursor: 'pointer',
                    borderRadius: '0.6rem',
                }}
                className='buttonStudent'
                selectItems={{
                    inputLabel: {
                        text: t('selectFilter'),
                        style: {
                            color: 'white',
                        },
                    },
                    menuItems: props.processes,
                }}
                onChange={(e) => {
                    props.requestProcessedImage(e.target.value);
                }}
            />
        </div>
    );
};

const CropButton: FunctionComponent<CropButtonProps> = (props) => {
    const { t } = useTranslation();
    return (
        <>
            <div className='cropButton'>
                <button className='buttonStudent' onClick={() => props.AmeliorerVue()}>
                    {!props.selectCoord ? t('crop') : t('cancel')}
                </button>
            </div>
            {props.coord.length == 4 && (
                <div>
                    <button className='buttonStudent' onClick={() => props.validerSaisie()}>
                        {t('validate')}
                    </button>
                </div>
            )}

            {props.imgIsCropped && (
                <button className='buttonStudent' onClick={() => props.resetCadrage()}>
                    {t('resetCropping')}
                </button>
            )}
        </>
    );
};

export default StudentMeeting;
