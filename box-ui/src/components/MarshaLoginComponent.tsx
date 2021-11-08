import React, { FunctionComponent, useState, useEffect } from 'react';
import { Button, Grid, IconButton } from '@mui/material';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import HeaderComponent from './HeaderComponent';
import JoinMeetingComponent from './JoinMeetingComponent';

import './MarshaLoginComponent.css';

const MarshaLoginComponent: FunctionComponent = () => {
    const [code, setCode] = useState('');

    const onButtonPress = (button: any): void => {
        if (button.target.value !== 'return') {
            setCode(code.concat(button.target.value));
        } else {
            setCode(code.slice(0, -1));
        }
    };

    useEffect(() => {
        console.log(code);
        if (code.length === 6) {
            const url = 'http://127.0.0.1:3001/login';
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({
                    code: code,
                }),
            };
            setCode('');

            // Ask marsha API if the code is known, and retrieve the corresponding link
            fetch(url, options)
                .catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                })
                .then(() => console.log('done !'));
        }
    });

    const inputFirstLine = ['0', '1', '2', '3', '4'];
    const inputSecondLine = ['5', '6', '7', '8', '9'];

    return (
        <div className='MarshaLoginComponent'>
            <div>
                <HeaderComponent />
            </div>
            <div className='MarshaLoginInfoContainer'>
                {`
                    Entrez le code fourni par Marsha.
                    Si vous n'en avez pas, revenez en arrière.
                `}
            </div>
            <div className='MarshaLoginDisplayContainer'>
                <h2>{code ? '_ _ _ _ _ _' : code}</h2>
                <Button
                    value={'return'}
                    variant='outlined'
                    key={'return'}
                    className='Button'
                    onClick={(e) => onButtonPress(e)}
                >
                    <BackspaceOutlinedIcon />
                </Button>
            </div>
            <div className='MarshaLoginInputContainer'>
                <div className='MarshaLoginInputContainerFirstLine'>
                    {inputFirstLine.map((index) => {
                        return (
                            <Button
                                key={index}
                                value={index}
                                variant='outlined'
                                className='numberButton'
                                onClick={(e) => onButtonPress(e)}
                            >
                                {index}
                            </Button>
                        );
                    })}
                </div>
                <div className='MarshaLoginInputContainerSecondLine'>
                    {inputSecondLine.map((index) => {
                        return (
                            <Button
                                key={index}
                                value={index}
                                variant='outlined'
                                className='numberButton'
                                onClick={(e) => onButtonPress(e)}
                            >
                                {index}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MarshaLoginComponent;
