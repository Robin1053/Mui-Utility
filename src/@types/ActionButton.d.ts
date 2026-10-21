import { ButtonProps, DialogProps } from '@mui/material';
import type { ThemedStyleOverrides, ThemedVariants } from './Theming';

type ActionButtonResult = {
    error: boolean;
    message?: string;
};

type ActionButtonNotification =
    | {
        useNotification: true;
        errormessage: string;
        successmessage: string;
    }
    | {
        useNotification?: false;
        errormessage?: never;
        successmessage?: never;
    };

type ActionButtonProps = {
    action: () => ActionButtonResult | void | Promise<ActionButtonResult | void>
    onSuccess?: (result: ActionButtonResult | void) => void;
    onError?: (error: Error, result?: ActionButtonResult) => void;
    onSettled?: () => void;
    requireAreYouSure?: boolean;
    icon?: React.ReactNode;
    Dialog?: {
        dialogTitle?: React.ReactNode;
        dialogContent?: React.ReactNode;
        confirmText?: string;
    };
    Props?: {
        ButtonProps?: ButtonProps;
        DialogProps?: DialogProps;
    };
    destructive?: boolean;
    children: React.ReactNode;
    Notification?: ActionButtonNotification;
    fullWidth?: boolean;
};

/** Wird als `ownerState` an alle Slots gereicht (styleOverrides-Callbacks, Theme-variants) */
type ActionButtonOwnerState = ActionButtonProps & {
    loading: boolean;
    hasError: boolean;
    dialogOpen: boolean;
};

declare module '@mui/material/styles' {
    interface ComponentNameToClassKey {
        MuiActionButton: 'root' | 'button' | 'dialog';
    }

    interface ComponentsPropsList {
        MuiActionButton: Partial<ActionButtonProps>;
    }

    interface Components {
        MuiActionButton?: {
            defaultProps?: ComponentsPropsList['MuiActionButton'];
            styleOverrides?: ThemedStyleOverrides<ComponentNameToClassKey['MuiActionButton'], ActionButtonOwnerState>;
            variants?: ThemedVariants<ActionButtonOwnerState>;
        };
    }
}

export type { ActionButtonProps, ActionButtonNotification, ActionButtonResult, ActionButtonOwnerState };
