import React, { FunctionComponent } from 'react';
import Draggable from 'react-draggable';
import '../css/FloatingBox.css';

const FloatingBox: FunctionComponent = (props) => {
    return (
        <Draggable>
            <div className='pipWindow'>{props.children}</div>
        </Draggable>
    );
};

export default FloatingBox;
