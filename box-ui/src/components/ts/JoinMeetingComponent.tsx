import { Box, Button } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '../css/JoinMeetingComponent.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import QrCodeScanner from './QrCodeScanner';
import FormJoinMeeting from './FormJoinMeeting';
import { InformationProps, TabPanelProps } from '../../types';

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

const a11yProps = (index: number) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
};

const JoinMeetingComponent: FunctionComponent<InformationProps> = (props: InformationProps) => {
    const [tabActivate, setTabActive] = React.useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabActive(newValue);
    };

    return (
        <StyledEngineProvider injectFirst>
            {
                <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                    <Tabs
                        value={tabActivate}
                        onChange={handleChange}
                        indicatorColor='secondary'
                        variant='fullWidth'
                        aria-label='full width tabs example'
                    >
                        <Tab label='Entrez le lien de la rencontre' {...a11yProps(0)} wrapped />
                        <Tab label='Scanner le QR Code de la rencontre' {...a11yProps(1)} wrapped />
                    </Tabs>
                    <TabPanel value={tabActivate} index={0}>
                        <FormJoinMeeting
                            close={props.close}
                            setInformation={props.setInformation}
                            information={props.information}
                        />
                    </TabPanel>
                    <TabPanel value={tabActivate} index={1}>
                        <QrCodeScanner close={props.close} setInformation={props.setInformation} />
                    </TabPanel>
                    <div className='CloseButton'>
                        <Button aria-label='close' onClick={props.close}>
                            <HighlightOffIcon style={{ height: '50px', width: '50px' }} />
                        </Button>
                    </div>
                </Box>
            }
        </StyledEngineProvider>
    );
};

export default JoinMeetingComponent;
