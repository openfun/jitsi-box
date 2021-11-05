import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const MarshaComponent = () => {


    return (
        <div className='MarshaContainer'>
            <div>
                <Box>
                    <AppBar position="static">
                        <Toolbar>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        </div>
      );
}

export default MarshaComponent;