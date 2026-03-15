import * as react_jsx_runtime from 'react/jsx-runtime';
import { ButtonProps, DialogProps, OutlinedInputProps, IconButtonProps, BadgeProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import * as React$1 from 'react';
import React__default, { SVGProps } from 'react';

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
    Dialog?: {
        dialogTitle?: React$1.ReactNode;
        dialogContent?: React$1.ReactNode;
        confirmText?: string;
        sx?: SxProps<Theme>;
    };
    Props?: {
        ButtonProps?: ButtonProps;
        DialogProps?: DialogProps;
    };
    destructive?: boolean;
    children: React$1.ReactNode;
    Notification?: ActionButtonNotification;
};
declare function ActionButton({ action, requireAreYouSure, icon, Dialog, Props, destructive, children, Notification, }: ActionButtonProps): react_jsx_runtime.JSX.Element;

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

type SocialSvgProps = {
    size?: number | string;
    title?: string;
    Props?: {
        SVGProps?: SVGProps<SVGSVGElement>;
    };
};
declare function GoogleSVG({ size, title, Props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function MicrosoftSVG({ size, title, Props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function AppleSVG({ size, title, ...props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function GitHubSVG({ size, title, ...props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function FacebookSVG({ size, title, ...props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function LinkedInSVG({ size, title, ...props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function XSVG({ size, title, ...props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function GitLabSVG({ size, title, ...props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function DiscordSVG({ size, title, ...props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function SlackSVG({ size, title, ...props }: SocialSvgProps): react_jsx_runtime.JSX.Element;

declare const SVGs_AppleSVG: typeof AppleSVG;
declare const SVGs_DiscordSVG: typeof DiscordSVG;
declare const SVGs_FacebookSVG: typeof FacebookSVG;
declare const SVGs_GitHubSVG: typeof GitHubSVG;
declare const SVGs_GitLabSVG: typeof GitLabSVG;
declare const SVGs_GoogleSVG: typeof GoogleSVG;
declare const SVGs_LinkedInSVG: typeof LinkedInSVG;
declare const SVGs_MicrosoftSVG: typeof MicrosoftSVG;
declare const SVGs_SlackSVG: typeof SlackSVG;
declare const SVGs_XSVG: typeof XSVG;
declare namespace SVGs {
  export { SVGs_AppleSVG as AppleSVG, SVGs_DiscordSVG as DiscordSVG, SVGs_FacebookSVG as FacebookSVG, SVGs_GitHubSVG as GitHubSVG, SVGs_GitLabSVG as GitLabSVG, SVGs_GoogleSVG as GoogleSVG, SVGs_LinkedInSVG as LinkedInSVG, SVGs_MicrosoftSVG as MicrosoftSVG, SVGs_SlackSVG as SlackSVG, SVGs_XSVG as XSVG };
}

export { ActionButton, type ActionButtonNotification, type ActionButtonProps, AvatarUpload, type AvataruploadProps, type NotificationContextValue, NotificationProvider, Passwordfield, type PasswordfieldProps, SVGs, type ToastMessage, type ToastType, useNotification };
