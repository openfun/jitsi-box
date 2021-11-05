import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import './MarshaComponent.css';

const MarshaComponent = () => {
    return (
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" variant="outlined" className="ButtonContainer">Marsha</Button>
                    </Toolbar>
                </AppBar>
            </Box>
      );
}

export default MarshaComponent;