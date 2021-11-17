import React, { FunctionComponent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse, AxiosRequestConfig, Method } from 'axios';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import HeaderComponent from './HeaderComponent';

import '../css/MarshaLoginComponent.css';

const MarshaLoginComponent: FunctionComponent = () => {
    const [code, setCode] = useState<Array<number>>([]);
    const [isAlert, setAlert] = useState<boolean>(false);
    const navigate = useNavigate();

    const onButtonPress = (button: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (button.currentTarget.value !== 'return') {
            setCode([...code, parseInt(button.currentTarget.value)]);
        } else {
            setCode([...code.slice(0, -1)]);
        }
    };

    async function fetchMarsha(config: AxiosRequestConfig<unknown>): Promise<string> {
        // Ask marsha API if the code is known, and retrieve the corresponding link
        return axios(config)
            .then((response: AxiosResponse) => {
                // Success
                return response.data.link;
            })
            .catch((error) => {
                // Error
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    useEffect(() => {
        if (code.length === 6) {
            const method: Method = 'POST';
            const options = {
                url: 'http://127.0.0.1:3001/login',
                method: method,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                data: {
                    code: code.join(''),
                },
            };
            let link;
            const waitMarshaResponse = async () => {
                link = await fetchMarsha(options);
                if (link) {
                    navigate({ pathname: '/launch' }, { state: { link }, replace: true });
                } else {
                    setAlert(true);
                }
            };
            waitMarshaResponse();
            setCode([]);
        }
    }, [code]);

    const inputFirstLine = ['0', '1', '2', '3', '4'];
    const inputSecondLine = ['5', '6', '7', '8', '9'];

    return (
        <div className='MarshaLoginComponent'>
            <div>
                <HeaderComponent homeDisplayed={true} marshaDisplayed={false} joinDisplayed={false} />
            </div>
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={isAlert}
                    autoHideDuration={6000}
                    onClose={() => setAlert(false)}
                    key={'marshaLoginAlert'}
                >
                    <Alert severity='error' sx={{ width: '100%' }} variant='filled'>
                        {'Wrong code'}
                    </Alert>
                </Snackbar>
            </div>
            <div className='MarshaLoginInfoContainer'>
                <h2>Tap the Marsha Code</h2>
                <h3>If you do not have it, go back to the home page.</h3>
            </div>
            <div className='MarshaLoginDisplayContainer'>
                {Array.from({ length: 6 }).map((_, index) => {
                    return (
                        <Box component='div' key={index} className='numberDisplay'>
                            {typeof code[index] === 'number' ? code[index] : '_'}
                        </Box>
                    );
                })}
                <Button
                    key={'return'}
                    value={'return'}
                    variant='outlined'
                    className='deleteButton'
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
