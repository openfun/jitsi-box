import React, { useState, FunctionComponent, useEffect } from 'react';
import { FocusModeProps } from '../../utils/Props';
import '../css/FocusMode.css';

const FocusMode: FunctionComponent<FocusModeProps> = (props: FocusModeProps) => {
    const [borderSize, setBorderSize] = useState('0px');
    const [tutoState, setTutoState] = useState(0);
    const [sizeChanged, setSizeChanged] = useState(true);
    let timerId: NodeJS.Timeout;
    console.log('help asked');
    useEffect(() => {
        let coord;
        let right = 0;
        let bottom = 0;
        if (tutoState < props.focusItems.length) {
            coord = document.querySelector(props.focusItems[tutoState].element)?.getBoundingClientRect();
            right = coord?.right !== undefined ? window.innerWidth - coord.right : 0;
            bottom = coord?.bottom !== undefined ? window.innerHeight - coord.bottom : 0;
            setBorderSize(`${coord?.top}px ${right > 0 ? right : 0}px ${bottom > 0 ? bottom : 0}px ${coord?.left}px`);
        } else {
            setTutoState(0);
            setBorderSize('0px');
        }
    }, [tutoState, sizeChanged]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            clearTimeout(timerId);
            timerId = setTimeout(() => setSizeChanged(!sizeChanged), 500);
        });
        return window.removeEventListener('resize', () => setSizeChanged(!sizeChanged));
    });
    return (
        <div>
            <div
                id='focusMode'
                style={{
                    borderWidth: `${borderSize}`,
                }}
            />
            <div id='centeringExplanation'>
                <div
                    id='explanation'
                    style={{
                        visibility: `${tutoState >= 0 ? 'visible' : 'hidden'}`,
                    }}
                >
                    <p id='explanationText'>
                        {tutoState < props.focusItems.length ? props.focusItems[tutoState].textElement : ''}
                    </p>
                    <button id='continueTuto' onClick={() => setTutoState(tutoState + 1)}>
                        Continuer le tuto
                    </button>
                </div>
            </div>
        </div>
    );
};
export default FocusMode;