import React, { FunctionComponent, useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosRequestConfig, Method, AxiosError } from 'axios';
import { Alert, Box, Button, Grid, IconButton, Snackbar } from '@mui/material';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { StyledEngineProvider } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import '../css/MarshaLoginComponent.css';
import { ConnectionProps } from '../../types';

const MarshaLoginComponent: FunctionComponent<ConnectionProps> = (props: ConnectionProps) => {
    const [code, setCode] = useState<Array<number>>([]);
    const [alertMessage, setAlertMessage] = useState<string>('');

    const onButtonPress = (button: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (button.currentTarget.value !== 'return') {
            setCode([...code, parseInt(button.currentTarget.value)]);
        } else {
            setCode([...code.slice(0, -1)]);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function fetchMarsha(
        config: AxiosRequestConfig<any>,
    ): Promise<{ success: boolean; link?: string; err?: string }> {
        // Ask marsha API if the code is known, and retrieve the corresponding link
        return axios(config)
            .then((response: AxiosResponse) => {
                // Success
                if (response.data.jitsi_url) {
                    return {
                        success: true,
                        link: response.data.jitsi_url as string,
                    };
                } else {
                    return {
                        success: false,
                        err: 'Response obtained, but no link was provided',
                    };
                }
            })
            .catch((error: AxiosError | Error) => {
                // Error
                if (axios.isAxiosError(error) && error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    if (error.response.status == 429) {
                        return {
                            success: false,
                            err: 'Too much requests. Please wait 1 minute brefore retrying',
                        };
                    } else if (error.response.status == 404) {
                        return {
                            success: false,
                            err: 'Wrong code',
                        };
                    } else {
                        return {
                            success: false,
                            err: 'Error in retrieved response',
                        };
                    }
                } else if (axios.isAxiosError(error) && error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    return {
                        success: false,
                        err: 'Error sending secret code',
                    };
                } else {
                    return {
                        success: false,
                        err: 'Unknown error',
                    };
                }
            });
    }

    const InputRow = (valuesArray: Array<string>, addReturnButton: boolean) => {
        return (
            <React.Fragment>
                {valuesArray.map((index) => {
                    return (
                        <Grid item key={index} xs={4} className='numberInputGridItem'>
                            <Button
                                value={index}
                                variant='contained'
                                className='numberButton'
                                sx={{ backgroundColor: '#fcfcfe' }}
                                onClick={(e) => onButtonPress(e)}
                            >
                                {index}
                            </Button>
                        </Grid>
                    );
                })}
                {(() => {
                    if (addReturnButton) {
                        return (
                            <Grid item key={'return'} xs={4} className='numberInputGridItem'>
                                <IconButton value={'return'} className='deleteButton' onClick={(e) => onButtonPress(e)}>
                                    <BackspaceOutlinedIcon />
                                </IconButton>
                            </Grid>
                        );
                    }
                })()}
            </React.Fragment>
        );
    };

    useEffect(() => {
        // Check if box already as an uuid
        const boxStorage = window.localStorage;

        if (!boxStorage.getItem('box_id')) {
            boxStorage.setItem('box_id', uuidv4());
        }

        if (code.length === 6) {
            const method: Method = 'POST';
            const options = {
                url: `${process.env.REACT_APP_MARSHA_URL}`,
                method: method,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                data: {
                    box_id: boxStorage.getItem('box_id'),
                    secret: code.join(''),
                },
            };
            const waitMarshaResponse = async () => {
                const response = await fetchMarsha(options);
                if (response && response.success && response.link) {
                    const linkAsURL = new URL(response.link);
                    const domain = linkAsURL.host;
                    const roomName = linkAsURL.pathname.substring(1);
                    console.log(domain);
                    console.log(roomName);
                    props.setInformation({ domain, roomName });
                    props.close();
                } else if (!response.success && response.err) {
                    setAlertMessage(response.err);
                } else {
                    setAlertMessage('Unknown Error');
                }
            };
            waitMarshaResponse();
            setCode([]);
        }
    }, [code]);

    const inputFirstLine = ['1', '2', '3'];
    const inputSecondLine = ['4', '5', '6'];
    const inputThirdLine = ['7', '8', '9'];
    const inputFourthLine = ['0'];

    return (
        <StyledEngineProvider injectFirst>
            {
                <div className='MarshaLoginComponent'>
                    <div>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={alertMessage !== ''}
                            autoHideDuration={6000}
                            onClose={() => setAlertMessage('')}
                            key={'marshaLoginAlert'}
                        >
                            <Alert severity='error' sx={{ width: '100%' }} variant='filled'>
                                {alertMessage}
                            </Alert>
                        </Snackbar>
                    </div>
                    <div className='MarshaLoginInfoContainer'>{/*<h2>Enter the Marsha Code</h2>*/}</div>
                    <div className='MarshaLoginDisplayDiv'>
                        <Box className='MarshaLoginDisplayContainer'>
                            <Grid container spacing={0.5}>
                                {Array.from({ length: 6 }).map((_, index) => {
                                    return (
                                        <Grid item xs={'auto'} key={index} className='numberDisplayGridItem'>
                                            <Box className='numberDisplayBox'>
                                                {typeof code[index] === 'number' ? code[index] : ''}
                                            </Box>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </div>
                    <div className='MarshaLoginInputDiv'>
                        <Box className='MarshaLoginInputContainer'>
                            <div className='MarshaLoginInputContainerLine'>{InputRow(inputFirstLine, false)}</div>
                            <div className='MarshaLoginInputContainerLine'>{InputRow(inputSecondLine, false)}</div>
                            <div className='MarshaLoginInputContainerLine'>{InputRow(inputThirdLine, false)}</div>
                            <div className='MarshaLoginInputContainerLine MarshaLoginInputContainerLastLine'>
                                {InputRow(inputFourthLine, true)}
                            </div>
                        </Box>
                    </div>
                </div>
            }
        </StyledEngineProvider>
    );
};

export default MarshaLoginComponent;
