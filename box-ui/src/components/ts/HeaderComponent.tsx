import React, { FunctionComponent } from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import '../css/HeaderComponent.css';

interface HeaderProps {
    homeDisplayed: boolean;
    marshaDisplayed: boolean;
}

const HeaderComponent: FunctionComponent<HeaderProps> = ({
    homeDisplayed: isReturnDisplayed,
    marshaDisplayed: isMarshaDisplayed,
}: HeaderProps) => {
    const navigate = useNavigate();

    const goToLoginMarsha = (): void => {
        navigate({ pathname: '/login' }, { replace: true });
    };

    const goBackToHome = (): void => {
        navigate({ pathname: '/' }, { replace: true });
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    {isReturnDisplayed ? (
                        <IconButton
                            size='large'
                            onClick={goBackToHome}
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx={{ mr: 2 }}
                        >
                            <HomeIcon />
                        </IconButton>
                    ) : null}
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        Jitsi-Box
                    </Typography>
                    {isMarshaDisplayed ? (
                        <Button color='inherit' variant='outlined' onClick={goToLoginMarsha}>
                            Marsha Login
                        </Button>
                    ) : null}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default HeaderComponent;
