import React, { FunctionComponent, useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosRequestConfig, Method } from 'axios';
import { Alert, Box, Button, Grid, IconButton, Snackbar } from '@mui/material';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { StyledEngineProvider } from '@mui/material/styles';
import '../css/MarshaLoginComponent.css';
import { ConnectionProps } from '../../types';

const MarshaLoginComponent: FunctionComponent<ConnectionProps> = (props: ConnectionProps) => {
    const [code, setCode] = useState<Array<number>>([]);
    const [isAlert, setAlert] = useState<boolean>(false);

    const onButtonPress = (button: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (button.currentTarget.value !== 'return') {
            setCode([...code, parseInt(button.currentTarget.value)]);
        } else {
            setCode([...code.slice(0, -1)]);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function fetchMarsha(config: AxiosRequestConfig<any>): Promise<string> {
        // Ask marsha API if the code is known, and retrieve the corresponding link
        return axios(config)
            .then((response: AxiosResponse) => {
                // Success
                return response.data.jitsi_url;
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
        if (code.length === 6) {
            const method: Method = 'POST';
            const options = {
                url: `${process.env.REACT_APP_MARSHA_URL}`,
                method: method,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                data: {
                    box_id: process.env.REACT_APP_BOX_UUID,
                    secret: code.join(''),
                },
            };
            const waitMarshaResponse = async () => {
                const link = await fetchMarsha(options);
                if (link) {
                    const linkAsURL = new URL(link);
                    const domain = linkAsURL.host;
                    const roomName = linkAsURL.pathname.substring(1);
                    console.log(domain);
                    console.log(roomName);
                    props.setInformation({ domain, roomName });
                    props.close();
                } else {
                    setAlert(true);
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
