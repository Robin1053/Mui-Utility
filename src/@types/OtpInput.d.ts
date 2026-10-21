import type { TextFieldProps } from '@mui/material';
import type { ThemedStyleOverrides, ThemedVariants } from './Theming';

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

/** Wird als `ownerState` an alle Slots gereicht (styleOverrides-Callbacks, Theme-variants) */
type OtpInputOwnerState = MUIOTPInputProps & {
    length: number;
    loading: boolean;
    error: boolean;
    /** nur fuer den `input`-Slot gesetzt */
    index?: number;
    /** nur fuer den `input`-Slot gesetzt */
    filled?: boolean;
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
            styleOverrides?: ThemedStyleOverrides<ComponentNameToClassKey['MuiOtpInput'], OtpInputOwnerState>;
            variants?: ThemedVariants<OtpInputOwnerState>;
        };
    }
}

export type { MUIOTPInputProps, OtpInputOwnerState };
