import React, { useState, FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/CreateMeetingComponent.css';
import JitsiComponent from './JitsiComponent';
import PopupComponent from './PopupComponent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { availableLanguages } from '../../i18n';
import { useTranslation } from 'react-i18next';

const CreateMeetingComponent: FunctionComponent = () => {
    const { t, i18n } = useTranslation();

    const data = useLocation();
    const [information, setInformation] = useState({
        roomName: data.state && data.state.roomName ? data.state.roomName : 'dty',
        domain: data.state && data.state.domain ? data.state.domain : 'meeting.education',
    });

    return (
        <div className='CreateMeetingComponent'>
            <PopupComponent information={information} setInformation={setInformation} />
            <div className='CreateMeetingContainer'>
                <div className='JitsiComponent'>
                    <JitsiComponent information={information} />
                </div>
            </div>
            <div className='LanguageSupport'>
                <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id='demo-simple-select-label'>{t('lang')}</InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={i18n.language}
                        defaultValue={i18n.language}
                        onChange={(e) => {
                            i18n.changeLanguage(e.target.value as string);
                        }}
                    >
                        {availableLanguages.map((language) => (
                            <MenuItem value={language} key={language}>
                                {language === 'fr' ? 'Français' : 'English'}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default CreateMeetingComponent;
