import React from 'react';
import Draggable from 'react-draggable';
import '../css/FloatingBox.css';

const FloatingBox = ({ children }: { children: any }) => {
    return (
        <div>
            <Draggable>
                <div className='pipWindow'>{children}</div>
            </Draggable>
        </div>
    );
};

export default FloatingBox;
