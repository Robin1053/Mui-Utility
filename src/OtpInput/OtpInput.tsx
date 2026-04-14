import * as React from 'react';
import { styled } from '@mui/material/styles';
import { MUIOTPInputProps } from '@robineb/mui-utility';


function MUIOTPInput({ }: MUIOTPInputProps) {

    const StatRoot = styled('div', {
        name: 'MUIOTPInput', // The component name
        slot: 'root', // The slot name
    })(({ theme }) => ({
    }));

    const Textfield = styled('div', {
        name: 'MUIOTPInput',
        slot: 'Input',
    })(({ theme }) => ({
    }));


    return <div>MUIOTPInput</div>;
}
export default MUIOTPInput