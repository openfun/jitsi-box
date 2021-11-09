import React, { FunctionComponent } from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './HeaderComponent.css';

interface HeaderProps {
    returnDisplayed: boolean;
    marshaDisplayed: boolean;
}

const HeaderComponent: FunctionComponent<HeaderProps> = ({
    returnDisplayed: isReturnDisplayed,
    marshaDisplayed: isMarshaDisplayed,
}) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    {isReturnDisplayed ? (
                        <IconButton
                            size='large'
                            onClick={() => navigate(-1)}
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx={{ mr: 2 }}
                        >
                            <ArrowBack />
                        </IconButton>
                    ) : null}
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        Jitsi-Box
                    </Typography>
                    {isMarshaDisplayed ? (
                        <Button color='inherit' variant='outlined'>
                            Marsha Login
                        </Button>
                    ) : null}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default HeaderComponent;
