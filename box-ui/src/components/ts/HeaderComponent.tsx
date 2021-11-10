import React, { FunctionComponent } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import '../css/HeaderComponent.css';

interface HeaderProps {
    homeDisplayed: boolean;
    marshaDisplayed: boolean;
    joinDisplayed: boolean;
}

const HeaderComponent: FunctionComponent<HeaderProps> = ({
    homeDisplayed: isReturnDisplayed,
    marshaDisplayed: isMarshaDisplayed,
    joinDisplayed: isJoinDisplayed,
}: HeaderProps) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const goToLoginMarsha = (): void => {
        navigate({ pathname: '/login' }, { replace: true });
    };

    const goBackToHome = (): void => {
        navigate({ pathname: '/' }, { replace: true });
    };
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const joinMeeting = (): void => {
        navigate({ pathname: '/join' }, { replace: true });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' enableColorOnDark>
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
                    {isMarshaDisplayed || isJoinDisplayed ? (
                        <div>
                            <IconButton
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={handleMenu}
                                color='inherit'
                            >
                                <MoreIcon />
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {isMarshaDisplayed ? <MenuItem onClick={goToLoginMarsha}>Login Marsha</MenuItem> : null}
                                {isJoinDisplayed ? <MenuItem onClick={joinMeeting}>Join a wished room</MenuItem> : null}
                            </Menu>
                        </div>
                    ) : null}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default HeaderComponent;
