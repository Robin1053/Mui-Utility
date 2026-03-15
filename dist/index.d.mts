import * as react_jsx_runtime from 'react/jsx-runtime';
import { ButtonProps, OutlinedInputProps, IconButtonProps, BadgeProps } from '@mui/material';
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
    Muiprops?: ButtonProps;
    destructive?: boolean;
    children: React$1.ReactNode;
    Notification?: ActionButtonNotification;
};
declare function ActionButton({ action, requireAreYouSure, icon, DialogProps, Muiprops, destructive, children, Notification, }: ActionButtonProps): react_jsx_runtime.JSX.Element;

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
    onChange?: (event: React$1.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value?: string;
    Props?: {
        Muiprops?: OutlinedInputProps;
    };
};
declare function Passwordfield({ loading, children, showstrength, error, onChange, Props, value, }: PasswordfieldProps): react_jsx_runtime.JSX.Element;

type AvataruploadProps = {
    image?: string;
    onUpload: (file: File) => void;
    icon?: React.ReactNode;
    Props?: {
        IconButtonProps?: IconButtonProps;
        BadgeProps?: BadgeProps;
        InputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    };
};
declare function AvatarUpload({ image, onUpload, icon, Props, }: AvataruploadProps): react_jsx_runtime.JSX.Element;

declare function GoogleSVG(): react_jsx_runtime.JSX.Element;
declare function MicrosoftSVG(): react_jsx_runtime.JSX.Element;
declare function AppleSVG(): react_jsx_runtime.JSX.Element;
declare function GitHubSVG(): react_jsx_runtime.JSX.Element;
declare function FacebookSVG(): react_jsx_runtime.JSX.Element;
declare function LinkedInSVG(): react_jsx_runtime.JSX.Element;
declare function XSVG(): react_jsx_runtime.JSX.Element;
declare function GitLabSVG(): react_jsx_runtime.JSX.Element;
declare function DiscordSVG(): react_jsx_runtime.JSX.Element;
declare function SlackSVG(): react_jsx_runtime.JSX.Element;

export { ActionButton, type ActionButtonNotification, type ActionButtonProps, AppleSVG, AvatarUpload, type AvataruploadProps, DiscordSVG, FacebookSVG, GitHubSVG, GitLabSVG, GoogleSVG, LinkedInSVG, MicrosoftSVG, type NotificationContextValue, NotificationProvider, Passwordfield, type PasswordfieldProps, SlackSVG, type ToastMessage, type ToastType, XSVG, useNotification };
