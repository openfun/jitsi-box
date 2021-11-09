import React, { FunctionComponent, useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosRequestConfig, Method } from 'axios';
import { Box, Button } from '@mui/material';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import HeaderComponent from './HeaderComponent';
import JoinMeetingComponent from './JoinMeetingComponent';

import './MarshaLoginComponent.css';

const MarshaLoginComponent: FunctionComponent = () => {
    const [code, setCode] = useState<Array<number>>([]);

    const onButtonPress = (button: any): void => {
        console.log(button.currentTarget.value);
        if (button.currentTarget.value !== 'return') {
            setCode([...code, parseInt(button.currentTarget.value)]);
        } else {
            setCode([...code.slice(0, -1)]);
        }
    };

    async function fetchMarsha(config: AxiosRequestConfig<any>): Promise<string> {
        // Ask marsha API if the code is known, and retrieve the corresponding link
        return axios(config)
            .then((response: AxiosResponse) => {
                // Success
                console.log(response.data.link);
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
        console.log(code);
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
                console.log(link);
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
                <HeaderComponent />
            </div>
            <div className='MarshaLoginInfoContainer'>
                <h2>Entrez le code fourni par Marsha.</h2>
                <h3>{`Si vous n'en avez pas, revenez en arrière.`}</h3>
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
