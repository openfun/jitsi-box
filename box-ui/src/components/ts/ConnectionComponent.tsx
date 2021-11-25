import React, { FunctionComponent, useState } from 'react';
import '../css/ConnectionComponent.css';
import 'react-simple-keyboard/build/css/index.css';
import LogoMarsha from '../../logo/LogoMarsha.svg';
import LogoUbicast from '../../logo/LogoUbicast.svg';
import LogoPod from '../../logo/LogoPod.svg';
import MarshaLoginComponent from './MarshaLoginComponent';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
interface ConnectionProps {
    close: () => void;
}
const ConnectionComponent: FunctionComponent<ConnectionProps> = (props: ConnectionProps) => {
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
                            <div style={{ width: '100%' }}>
                                <Button
                                    variant='contained'
                                    className='MediumButton'
                                    style={{ backgroundColor: '#EFF5FC' }}
                                    disabled
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <img src={LogoUbicast} height='80%' />
                                        <strong className='TitleButton'> Ubicast </strong>
                                    </div>
                                </Button>
                            </div>
                            <div style={{ width: '100%' }}>
                                <Button
                                    variant='contained'
                                    className='MediumButton'
                                    style={{ backgroundColor: '#EFF5FC' }}
                                    disabled
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <img src={LogoPod} height='80%' />
                                        <strong className='TitleButton'> Pod </strong>
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <div className='SecondLineButton'>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    setServiceChosen('Marsha');
                                }}
                                style={{ backgroundColor: '#EFF5FC' }}
                                className='MarshaButton'
                            >
                                <div>
                                    <img src={LogoMarsha} height='60%' />
                                    <div>
                                        <strong className='TitleButton'> Marsha </strong>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>
                    <div className='TitleContainer'>
                        <div>
                            <h2>Comment ça marche ?</h2>
                        </div>
                        <div className='Paragraph'>
                            <p>Choisissez le service à utiliser. Saisissez le code à 6 chiffres.</p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {serviceChosen === 'Marsha' ? (
                        <>
                            <MarshaLoginComponent />
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
