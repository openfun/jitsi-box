import React, { FunctionComponent, useRef, useEffect, useState } from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import HomeButton from './HomeButton';
import '../css/ProgressButton.css';
import { ProgressButtonProps } from '../../utils/Props';
import { useTranslation } from 'react-i18next';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    borderRadius: '0px 0px 5px 5px',
    height: 10,
    marginTop: -10,
    [`& .${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
        backgroundColor: '#1a90ff',
        transition: 'transform 1s linear',
    },
}));

const ProgressButton: FunctionComponent<ProgressButtonProps> = (props) => {
    const [counter, setCounter] = useState(props.initialCounter);
    const { t } = useTranslation();

    useEffect(() => {
        if (props.initialCounter > 0) {
            let count = props.initialCounter;
            const intervalID = setInterval(() => {
                if (count <= 0) {
                    clearInterval(intervalID);
                }
                count--;
                setCounter((counter) => counter - 1);
            }, 1000);
            return () => {
                clearInterval(intervalID);
            };
        }
    }, []);

    return (
        <>
            {counter > 0 && (
                <>
                    <div className='ButtonContainer'>
                        <HomeButton id='ReturnToMeetingButton' onClick={props.onClick} variant='contained'>
                            {props.children}
                        </HomeButton>
                        <BorderLinearProgress
                            className='LinearProgress'
                            variant='determinate'
                            value={(counter / props.initialCounter) * 100}
                        />
                    </div>

                    <div id='counter'>
                        {t('disappear')} {counter} {t('seconds')}
                    </div>
                </>
            )}
        </>
    );
};

export default ProgressButton;
