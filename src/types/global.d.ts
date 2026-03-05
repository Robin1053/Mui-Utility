
import type { SxProps, Theme } from "@mui/material/styles";

declare global {
    //Notification Typen
    type ToastType = "success" | "error" | "info" | "warning";

    interface ToastMessage {
        message: string;
        type: ToastType;
    }

    interface NotificationContextValue {
        notify: (toast: ToastMessage) => void;
    }



    //Actionbutton Typen
    type ActionButtonProps = {
        action: () => void | Promise<void>;
        requireAreYouSure?: boolean;
        icon?: React.ReactNode;
        DialogProps?: {
            dialogTitle?: React.ReactNode;
            dialogContent?: React.ReactNode;
            confirmText?: string;
            sx? : SxProps<Theme>
        },
        ButtonProps?: {
            sx?: SxProps<Theme>
        }
        destructive?: boolean;
        children: React.ReactNode;
        Notification?: ActionButtonNotification;
    }

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
}
export { };