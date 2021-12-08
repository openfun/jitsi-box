import React, { FunctionComponent, useState } from 'react';
import '../css/ConnectionComponent.css';
import 'react-simple-keyboard/build/css/index.css';
import LogoMarsha from '../../logo/LogoMarsha.svg';
import LogoPod from '../../logo/LogoPod.svg';
import MarshaLoginComponent from './MarshaLoginComponent';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { ConnectionProps } from '../../utils/Props';
import { useTranslation } from 'react-i18next';

const ConnectionComponent: FunctionComponent<ConnectionProps> = (props: ConnectionProps) => {
    const { t } = useTranslation();
    const [serviceChosen, setServiceChosen] = useState<string>('');

    return (
        <div className='ConnectionContainer'>
            {serviceChosen == '' ? null : (
                <div className='ReturnButton'>
                    <Button
                        onClick={() => {
                            setServiceChosen('');
                        }}
                    >
                        <ArrowBackRoundedIcon style={{ height: '50px', width: '50px' }} />
                    </Button>
                </div>
            )}
            {serviceChosen == '' ? (
                <>
                    <div className='Partners'>
                        <div className='FirstLineButton'>
                            <div style={{ width: '50%' }}>
                                <Button
                                    variant='contained'
                                    className='MediumButton'
                                    style={{ backgroundColor: '#EFF5FC' }}
                                    onClick={() => {
                                        setServiceChosen('Marsha');
                                    }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                        <img src={LogoMarsha} />
                                        <strong className='TitleButton'> Marsha </strong>
                                    </div>
                                </Button>
                            </div>
                            <div style={{ width: '50%' }}>
                                <Button
                                    variant='contained'
                                    className='MediumButton'
                                    style={{ backgroundColor: '#EFF5FC' }}
                                    disabled
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <img src={LogoPod} />
                                        <strong className='TitleButton'> Pod </strong>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='TitleContainer'>
                        <div>
                            <h2>{t('howItWorks')}</h2>
                        </div>
                        <div className='Paragraph'>
                            <p>{t('serviceToConnect')}</p> <p>{t('typeCode')}</p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {serviceChosen === 'Marsha' ? (
                        <>
                            <MarshaLoginComponent close={props.close} setInformation={props.setInformation} />
                        </>
                    ) : null}
                </>
            )}
            <div className='CloseButton'>
                <Button aria-label='close' onClick={props.close}>
                    <HighlightOffIcon style={{ height: '50px', width: '50px' }} />
                </Button>
            </div>
        </div>
    );
};
export default ConnectionComponent;
