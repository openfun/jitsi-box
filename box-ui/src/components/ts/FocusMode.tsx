import React, { useState, FunctionComponent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FocusModeProps } from '../../utils/Props';
import '../css/FocusMode.css';

const FocusMode: FunctionComponent<FocusModeProps> = (props: FocusModeProps) => {
    const [borderSize, setBorderSize] = useState('0px');
    const [tutoState, setTutoState] = useState(0);
    const { t } = useTranslation();
    let timerId: NodeJS.Timeout;
    const resize = () => {
        let coord;
        let right = 0;
        let bottom = 0;
        if (tutoState < props.focusItems.length) {
            const element = document.querySelector(props.focusItems[tutoState].element);
            if (element === null) setTutoState(tutoState + 1);
            else {
                coord = element.getBoundingClientRect();
                right = coord?.right !== undefined ? window.innerWidth - coord.right : 0;
                bottom = coord?.bottom !== undefined ? window.innerHeight - coord.bottom : 0;
                setBorderSize(
                    `${coord?.top}px ${right > 0 ? right : 0}px ${bottom > 0 ? bottom : 0}px ${coord?.left}px`,
                );
            }
        } else {
            props.setDisplayFocus(false);
        }
    };
    useEffect(() => {
        resize();
    }, [tutoState]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            clearTimeout(timerId);
            timerId = setTimeout(() => resize(), 100);
        });
        return window.removeEventListener('resize', () => resize());
    });
    return (
        <div>
            <div
                id='focusMode'
                style={{
                    borderWidth: `${borderSize}`,
                }}
            />
            <div id='explanationPosition'>
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
                        {t('continueTuto')}
                    </button>
                    <button id='quitterTuto' onClick={() => props.setDisplayFocus(false)}>
                        {t('quitTuto')}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default FocusMode;
