import React, { FunctionComponent } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { availableLanguages } from '../../i18n';
import '../css/LanguageSelector.css';

const LanguageSelector: FunctionComponent<React.HTMLAttributes<any>> = (props: React.HTMLAttributes<any>) => {
    const { t, i18n } = useTranslation();
    return (
        <div {...props} className='LanguageSelector'>
            <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }} style={{ backgroundColor: '#1976D2' }}>
                <InputLabel id='demo-simple-select-label' style={{ color: 'white' }}>
                    {t('lang')}
                </InputLabel>
                <Select
                    value={i18n.language}
                    defaultValue={i18n.language}
                    onChange={(e) => {
                        const boxStorage = window.localStorage;
                        boxStorage.setItem('language', e.target.value as string);
                        i18n.changeLanguage(e.target.value as string);
                    }}
                    style={{ color: 'white' }}
                >
                    {availableLanguages.map((language) => (
                        <MenuItem value={language} key={language}>
                            {new Intl.DisplayNames([language], { type: 'language' }).of(language)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default LanguageSelector;
