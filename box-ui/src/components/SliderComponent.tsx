import React, { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

const ContinuousSlider: FunctionComponent = () => {
    const [value, setValue] = React.useState<number>(30);

    const handleChange = (event: Event, newValue: number | number[]): void => {
        setValue(newValue as number);
    };

    return (
        <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
                <VolumeDown />
                <Slider aria-label='Volume' value={value} onChange={handleChange} />
                <VolumeUp />
            </Stack>
        </Box>
    );
};
export default ContinuousSlider;
