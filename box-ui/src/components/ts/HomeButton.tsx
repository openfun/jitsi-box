import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const HomeButton = styled(Button)(() => ({
    height: '17vh',
    width: '60vw',
    overflowWrap: 'break-word',
    overflowX: 'visible',
    overflowY: 'hidden',
}));

export default HomeButton;
