import React, { FunctionComponent } from 'react';
import Draggable from 'react-draggable';
import '../css/FloatingBox.css';
import { FloatProps } from '../../utils/Props';

const FloatingBox = ({ children }: FloatProps) => {
    return (
        <div>
            <Draggable>
                <div className='pipWindow'>{children}</div>
            </Draggable>
        </div>
    );
};

export default FloatingBox;
