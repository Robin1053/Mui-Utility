
import type { SxProps, Theme } from "@mui/material/styles";
import type { TextFieldProps } from "@mui/material";
declare global {
    //Notification Typen
    type ToastType = "success" | "error" | "info" | "warning";

    export interface ToastMessage {
        message: string;
        type: ToastType;
    }

    export interface NotificationContextValue {
        notify: (toast: ToastMessage) => void;
    }



    //Actionbutton Typen
    export type ActionButtonProps = {
        action: () => void | Promise<void>;
        requireAreYouSure?: boolean;
        icon?: React.ReactNode;
        DialogProps?: {
            dialogTitle?: React.ReactNode;
            dialogContent?: React.ReactNode;
            confirmText?: string;
            sx?: SxProps<Theme>
        },
        ButtonProps?: {
            sx?: SxProps<Theme>
        }
        destructive?: boolean;
        children: React.ReactNode;
        Notification?: ActionButtonNotification;
    }

    export type ActionButtonNotification =
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

    //Passwordfield Typen
    export type PasswordfieldProps = {
        loading?: boolean;
    } & Omit<TextFieldProps, "type">;

}
export {__global };