import * as React from 'react';
import {
    styled
} from '@mui/material/styles';
import {
    MUIOTPInputProps,
    MuiOtpInputtheme
} from '@robineb/mui-utility';
import {
    TextField,
    outlinedInputClasses
} from '@mui/material';



const StatRoot = styled('div', {
    name: 'MuiOtpInput',
    slot: 'root',
})(({ theme }) => ({
    MuiOtpInputtheme
}));

const Input = styled(TextField, {
    name: 'MuiOtpInput',
    slot: 'input',
})(({ theme }) => ({
    MuiOtpInputtheme,
    width: 48,
    [`& .${outlinedInputClasses.input}`]: {
        padding: theme.spacing(1, 0),
        textAlign: 'center',
    },
}));

const Dash = styled('div', {
    name: 'MuiOtpInput',
    slot: 'separator'
})(({ theme }) => ({
    MuiOtpInputtheme
}))


const MuiOtpInput = React.forwardRef<HTMLDivElement, MUIOTPInputProps>(function MUIOTPInput(MUIOTPInputProps, ref) {


    return (
        <StatRoot>
        </StatRoot>
    );
});
export default MuiOtpInput