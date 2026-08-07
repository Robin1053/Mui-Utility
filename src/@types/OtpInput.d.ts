import type { TextFieldProps } from '@mui/material';
import type { Theme, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

type MUIOTPInputProps = {
    autoFocus?: boolean;
    length?: number;
    loading?: boolean;
    error?: boolean;
    value?: string;
    groups?: number;
    separator?: React.ReactNode;
    onChange?: (value: string) => void;
    validateChar?: (character: string, index: number) => boolean;
    onComplete?: (value: string) => void;
    onBlur?: (value: string, isCompleted: boolean) => void;
    TextFieldsProps?: TextFieldProps | ((index: number) => TextFieldProps);
};

declare module '@mui/material/styles' {
    interface ComponentNameToClassKey {
        MuiOtpInput: 'root' | 'input' | 'separator';
    }

    interface ComponentsPropsList {
        MuiOtpInput: Partial<MUIOTPInputProps>;
    }

    interface Components {
        MuiOtpInput?: {
            defaultProps?: ComponentsPropsList['MuiOtpInput'];
            styleOverrides?: ComponentsOverrides<Theme>['MuiOtpInput'];
            variants?: ComponentsVariants['MuiOtpInput'];
        };
    }
}

export type { MUIOTPInputProps };
