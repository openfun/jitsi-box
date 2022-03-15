import React, { FunctionComponent, useRef } from 'react';
import { Box } from '@mui/system';
import { TextField, Button } from '@mui/material';
import { InputButtonProps } from '../../utils/Props';

const InputButton: FunctionComponent<InputButtonProps> = ({ onSubmit, inputLabel, buttonLabel }) => {
    const input = useRef('');
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'row',
                maxWidth: 500,
                width: 'calc(100% - 32px)',
                borderRadius: 1,
                padding: 1,
            }}
        >
            <TextField
                id='roomName'
                label={inputLabel}
                sx={{
                    flexGrow: 1,
                    marginRight: 0.5,
                }}
                onChange={(event) => {
                    input.current = event.currentTarget.value;
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        onSubmit(input.current);
                    }
                }}
            />
            <Button variant='contained' onClick={() => onSubmit(input.current)}>
                {buttonLabel}
            </Button>
        </Box>
    );
};

export default InputButton;
