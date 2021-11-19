import React, { FunctionComponent, useState } from 'react';
import HomeButtonsComponent from './HomeButtonsComponent';
import '../css/HomeComponent.css';
import JitsiBoxLogo from '/Users/arthurpdl/Documents/jitsi-box/box-ui/src/logo/jitsibox.svg';

const HomeComponent: FunctionComponent = () => {
    const [counter, setCounter] = useState(5);

    React.useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        <div className='Home'>
            <div className='HomeButtonsContainer'>
                <img src={JitsiBoxLogo} alt='logo de la jitsi-box' className='logo' />
                <HomeButtonsComponent counter={counter} />
            </div>
        </div>
    );
};

export default HomeComponent;
