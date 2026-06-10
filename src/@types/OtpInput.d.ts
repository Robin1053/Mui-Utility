import { TextFieldProps } from '@mui/material';


type MUIOTPInputProps = {
    autoFocus?: boolean
    length?: number
    loading?: boolean;
    error?: boolean;
    value?: string;
    groups?: number;
    separator?: { [string] };
    onChange?: (value: string) => void;
    validateChar?: (character: string, index: number) => boolean
    onComplete?: (value: string) => void
    onBlur?: (value: string, isCompleted: boolean) => void;
    TextFieldsProps?: TextFieldProps | ((index: number) => TextFieldProps);
    Props?: {
        TextfieldProps?: TextFieldProps;
    };
};

export { MUIOTPInputProps }