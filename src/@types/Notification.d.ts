import type { AlertProps, SnackbarOrigin, SnackbarProps } from '@mui/material';
import type { ThemedStyleOverrides, ThemedVariants } from './Theming';

type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessage {
    message: string;
    type: ToastType;
}

interface NotificationContextValue {
    notify: (toast: ToastMessage) => void;
}

type NotificationProviderProps = {
    children: React.ReactNode;
    /** Default `4000` ms */
    autoHideDuration?: number | null;
    /** Default `{ vertical: "bottom", horizontal: "left" }` */
    anchorOrigin?: SnackbarOrigin;
    Props?: {
        SnackbarProps?: Partial<SnackbarProps>;
        AlertProps?: Partial<AlertProps>;
    };
};

/** Wird als `ownerState` an alle Slots gereicht (styleOverrides-Callbacks, Theme-variants) */
type NotificationProviderOwnerState = NotificationProviderProps & {
    open: boolean;
    type: ToastType;
};

declare module '@mui/material/styles' {
    interface ComponentNameToClassKey {
        MuiNotificationProvider: 'root' | 'alert';
    }

    interface ComponentsPropsList {
        MuiNotificationProvider: Partial<NotificationProviderProps>;
    }

    interface Components {
        MuiNotificationProvider?: {
            defaultProps?: ComponentsPropsList['MuiNotificationProvider'];
            styleOverrides?: ThemedStyleOverrides<ComponentNameToClassKey['MuiNotificationProvider'], NotificationProviderOwnerState>;
            variants?: ThemedVariants<NotificationProviderOwnerState>;
        };
    }
}

export type {
    ToastMessage,
    ToastType,
    NotificationContextValue,
    NotificationProviderProps,
    NotificationProviderOwnerState,
};
