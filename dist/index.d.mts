import * as react_jsx_runtime from 'react/jsx-runtime';
import { ButtonProps, TextFieldProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
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
    icon?: React.ReactNode;
    DialogProps?: {
        dialogTitle?: React.ReactNode;
        dialogContent?: React.ReactNode;
        confirmText?: string;
        sx?: SxProps<Theme>;
    };
    ButtonProps?: ButtonProps;
    destructive?: boolean;
    children: React.ReactNode;
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
} & Omit<TextFieldProps, "type">;
declare function Passwordfield({ loading, InputProps, ...props }: PasswordfieldProps): react_jsx_runtime.JSX.Element;

export { ActionButton, type ActionButtonNotification, type ActionButtonProps, type NotificationContextValue, NotificationProvider, Passwordfield, type PasswordfieldProps, type ToastMessage, type ToastType, useNotification };
