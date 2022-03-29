import React, { FunctionComponent } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectButtonProps } from '../../utils/Props';

const SelectButton: FunctionComponent<SelectButtonProps> = (props: SelectButtonProps) => {
    return (
        <div {...props.div} className='SelectButton'>
            <FormControl variant='filled' sx={{ m: 1, minWidth: 140 }}>
                <InputLabel id='input-label' sx={props.selectItems.inputLabel.style}>
                    {props.selectItems.inputLabel.text}
                </InputLabel>
                <Select
                    sx={props.menuItemsStyle}
                    defaultValue=''
                    onChange={(e) => (props.onChange ? props.onChange(e) : null)}
                    onClick={(e) => (props.onClick ? props.onClick(e) : null)}
                >
                    {props.selectItems.menuItems.map((menuItem) => (
                        <MenuItem key={menuItem.id} value={menuItem.text ? menuItem.text : ''}>
                            {menuItem.text}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default SelectButton;
