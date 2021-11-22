import { Box, Button } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';
import '../css/ConnectionComponent.css';
import 'react-simple-keyboard/build/css/index.css';
import LogoMarsha from '../../logo/LogoMarsha.svg';
import LogoUbicast from '../../logo/LogoUbicast.svg';
import LogoPod from '../../logo/LogoPod.svg';
import MarshaLoginComponent from './MarshaLoginComponent';
const ConnectionComponent: FunctionComponent = () => {
    const [serviceChosen, setServiceChosen] = useState<string>('');

    return (
        <div className='ConnectionContainer'>
            {serviceChosen == '' ? (
                <>
                    <div className='Partners'>
                        <div className='FirstLineButton'>
                            <div>
                                <Button
                                    variant='contained'
                                    className='MediumButton'
                                    style={{ backgroundColor: '#EFF5FC' }}
                                    disabled
                                >
                                    <div>
                                        <img src={LogoUbicast} height='60%' />
                                        <strong> Ubicast </strong>
                                    </div>
                                </Button>
                            </div>
                            <div>
                                <Button
                                    variant='contained'
                                    className='MediumButton'
                                    style={{ backgroundColor: '#EFF5FC' }}
                                    disabled
                                >
                                    <div>
                                        <img src={LogoPod} height='60%' />
                                        <strong> Pod </strong>
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
                                        <strong> Marsha </strong>
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
        </div>
    );
};

export default ConnectionComponent;
