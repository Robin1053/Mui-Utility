import * as react_jsx_runtime from 'react/jsx-runtime';
import { ButtonProps, OutlinedInputProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import * as React$1 from 'react';
import React__default from 'react';

type ActionButtonNotification = {
    useNotification: true;
    errormessage: string;
    successmessage: string;
} | {
    useNotification?: false;
    errormessage?: never;
    successmessage?: never;
};
type ActionButtonProps = {
    action: () => void | Promise<void>;
    requireAreYouSure?: boolean;
    icon?: React$1.ReactNode;
    DialogProps?: {
        dialogTitle?: React$1.ReactNode;
        dialogContent?: React$1.ReactNode;
        confirmText?: string;
        sx?: SxProps<Theme>;
    };
    ButtonProps?: ButtonProps;
    destructive?: boolean;
    children: React$1.ReactNode;
    Notification?: ActionButtonNotification;
};
declare function ActionButton({ action, requireAreYouSure, icon, DialogProps, ButtonProps, destructive, children, Notification }: ActionButtonProps): react_jsx_runtime.JSX.Element;

type ToastType = "success" | "error" | "info" | "warning";
interface ToastMessage {
    message: string;
    type: ToastType;
}
interface NotificationContextValue {
    notify: (toast: ToastMessage) => void;
}
declare const useNotification: () => NotificationContextValue;
declare const NotificationProvider: ({ children }: {
    children: React__default.ReactNode;
}) => react_jsx_runtime.JSX.Element;

type PasswordfieldProps = {
    loading?: boolean;
    showstrength?: boolean;
    children: React$1.ReactNode;
    error?: boolean;
} & Omit<OutlinedInputProps, "type">;
declare function Passwordfield({ loading, children, showstrength, error, onChange, value, ...props }: PasswordfieldProps): react_jsx_runtime.JSX.Element;

type AvataruploadProps = {
    image?: string;
    onUpload: (file: File) => void;
    icon?: React.ReactNode;
};
declare function AvatarUpload({ image, onUpload, icon }: AvataruploadProps): react_jsx_runtime.JSX.Element;

export { ActionButton, type ActionButtonNotification, type ActionButtonProps, AvatarUpload, type AvataruploadProps, type NotificationContextValue, NotificationProvider, Passwordfield, type PasswordfieldProps, type ToastMessage, type ToastType, useNotification };
