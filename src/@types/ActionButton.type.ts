import { ButtonProps, DialogProps } from '@mui/material';

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
    action: () => void | Promise<void>;
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

export type { ActionButtonProps, ActionButtonNotification };