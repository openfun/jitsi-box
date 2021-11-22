import { Box, Button } from '@mui/material';
import React, { FunctionComponent } from 'react';
import '../css/ConnectionComponent.css';
import 'react-simple-keyboard/build/css/index.css';
import LogoMarsha from '../../logo/LogoMarsha.svg';
import LogoUbicast from '../../logo/LogoUbicast.svg';
import LogoPod from '../../logo/LogoPod.svg';
const ConnectionComponent: FunctionComponent = () => {
    return (
        <div className='ConnectionContainer'>
            <div className='Partners'>
                <div className='FirstLineButton'>
                    <div>
                        <Button variant='contained' className='MediumButton' style={{ backgroundColor: '#EFF5FC' }}>
                            <div>
                                <img src={LogoUbicast} height='60%' />
                                <strong> Ubicast </strong>
                            </div>
                        </Button>
                    </div>
                    <div>
                        <Button variant='contained' className='MediumButton' style={{ backgroundColor: '#EFF5FC' }}>
                            <div>
                                <img src={LogoPod} height='60%' />
                                <strong> Pod </strong>
                            </div>
                        </Button>
                    </div>
                </div>
                <div className='SecondLineButton'>
                    <Button variant='contained' style={{ backgroundColor: '#EFF5FC' }}>
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
                    <p>
                        At vero eos et quasi architecto beatae vitae sine causa, mox videro; interea hoc tenebo, si mihi
                        probabis ea, quae dices, libenter assentiar probabo.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConnectionComponent;
