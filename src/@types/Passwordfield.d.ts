import { OutlinedInputProps } from "@mui/material";
import type { ThemedStyleOverrides, ThemedVariants } from './Theming';

type PasswordfieldProps = {
    loading?: boolean;
    showstrength?: boolean;
    children: React.ReactNode;
    error?: boolean;
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    value?: string;
    Props?: {
        TextfieldProps?: OutlinedInputProps;
    };
};

/** Wird als `ownerState` an alle Slots gereicht (styleOverrides-Callbacks, Theme-variants) */
type PasswordfieldOwnerState = PasswordfieldProps & {
    /** 0-100, siehe `getPasswordStrength` */
    strength: number;
    showPassword: boolean;
};

declare module '@mui/material/styles' {
    interface ComponentNameToClassKey {
        MuiPasswordfield: 'root' | 'label' | 'input' | 'strength' | 'divider';
    }

    interface ComponentsPropsList {
        MuiPasswordfield: Partial<PasswordfieldProps>;
    }

    interface Components {
        MuiPasswordfield?: {
            defaultProps?: ComponentsPropsList['MuiPasswordfield'];
            styleOverrides?: ThemedStyleOverrides<ComponentNameToClassKey['MuiPasswordfield'], PasswordfieldOwnerState>;
            variants?: ThemedVariants<PasswordfieldOwnerState>;
        };
    }
}

export type { PasswordfieldProps, PasswordfieldOwnerState };
