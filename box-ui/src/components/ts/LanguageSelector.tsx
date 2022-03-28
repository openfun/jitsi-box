import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { availableLanguages } from '../../i18n';
import '../css/LanguageSelector.css';
import SelectButton from './SelectButton';

const LanguageSelector: FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = (
    props: React.HTMLAttributes<HTMLDivElement>,
) => {
    const { t, i18n } = useTranslation();
    return (
        <div {...props} className='LanguageSelector'>
            <SelectButton
                menuItemsStyle={{
                    color: 'white',
                    backgroundColor: '#1976D2',
                    borderRadius: '8px',
                    '& .MuiSelect-icon': { color: 'white' },
                    '&:hover': { background: '#1976D295' },
                }}
                selectItems={{
                    inputLabel: { text: t('lang'), style: { color: 'white' } },
                    menuItems: availableLanguages.map((lang, index) => {
                        return { id: index, text: lang };
                    }),
                }}
                onChange={(e) => {
                    i18n.changeLanguage(e.target.value as string);
                }}
            />
        </div>
    );
};

export default LanguageSelector;
