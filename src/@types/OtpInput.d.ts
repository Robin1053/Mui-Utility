import { TextFieldProps } from '@mui/material';


type MUIOTPInputProps = {
    autoFocus?: boolean
    length?: number
    loading?: boolean;
    error?: boolean;
    value?: string;
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    validateChar?: (character: string, index: number) => boolean
    onComplete?: (value: string) => void
    Props?: {
        TextfieldProps?: TextFieldProps;
    };
};

export { MUIOTPInputProps }