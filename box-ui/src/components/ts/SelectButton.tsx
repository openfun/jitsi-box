import React, { FunctionComponent } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import '../css/SelectButton.css';
import { SelectButtonProps } from '../../utils/Props';

const SelectButton: FunctionComponent<SelectButtonProps> = (props: SelectButtonProps) => {
    return (
        <div {...props.div} className='SelectButton'>
            <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }} style={{ backgroundColor: '#1976D2' }}>
                <InputLabel id='input-label' style={{ color: 'white' }}>
                    {props.selectItems.inputLabelText}
                </InputLabel>
                <Select
                    style={{ color: 'white' }}
                    defaultValue=''
                    onChange={(e) => (props.onChange ? props.onChange(e) : null)}
                    onClick={(e) => (props.onClick ? props.onClick(e) : null)}
                >
                    {props.selectItems.menuItems.map((menuItemText, index) => (
                        <MenuItem key={index} value={menuItemText ? menuItemText : ''}>
                            {menuItemText}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default SelectButton;
