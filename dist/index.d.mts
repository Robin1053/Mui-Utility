import * as react_jsx_runtime from 'react/jsx-runtime';
import * as Mui from '@mui/material';
import { ButtonProps, DialogProps, OutlinedInputProps, IconButtonProps, BadgeProps } from '@mui/material';
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
        TextfieldProps?: OutlinedInputProps;
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
declare function AppleSVG({ size, title, Props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function GitHubSVG({ size, title, Props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function FacebookSVG({ size, title, Props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function LinkedInSVG({ size, title, Props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function XSVG({ size, title, Props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function GitLabSVG({ size, title, Props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function DiscordSVG({ size, title, Props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function SlackSVG({ size, title, Props }: SocialSvgProps): react_jsx_runtime.JSX.Element;
declare function PasskeySVG({ size, title, Props }: SocialSvgProps): react_jsx_runtime.JSX.Element;

declare const SVGs_AppleSVG: typeof AppleSVG;
declare const SVGs_DiscordSVG: typeof DiscordSVG;
declare const SVGs_FacebookSVG: typeof FacebookSVG;
declare const SVGs_GitHubSVG: typeof GitHubSVG;
declare const SVGs_GitLabSVG: typeof GitLabSVG;
declare const SVGs_GoogleSVG: typeof GoogleSVG;
declare const SVGs_LinkedInSVG: typeof LinkedInSVG;
declare const SVGs_MicrosoftSVG: typeof MicrosoftSVG;
declare const SVGs_PasskeySVG: typeof PasskeySVG;
declare const SVGs_SlackSVG: typeof SlackSVG;
type SVGs_SocialSvgProps = SocialSvgProps;
declare const SVGs_XSVG: typeof XSVG;
declare namespace SVGs {
  export { SVGs_AppleSVG as AppleSVG, SVGs_DiscordSVG as DiscordSVG, SVGs_FacebookSVG as FacebookSVG, SVGs_GitHubSVG as GitHubSVG, SVGs_GitLabSVG as GitLabSVG, SVGs_GoogleSVG as GoogleSVG, SVGs_LinkedInSVG as LinkedInSVG, SVGs_MicrosoftSVG as MicrosoftSVG, SVGs_PasskeySVG as PasskeySVG, SVGs_SlackSVG as SlackSVG, type SVGs_SocialSvgProps as SocialSvgProps, SVGs_XSVG as XSVG };
}

type BuiltInProvider = "google" | "microsoft" | "apple" | "github" | "facebook" | "linkedin" | "x" | "gitlab" | "discord" | "slack" | "passkey";
type CustomProvider = {
    type: "custom";
    name: string;
    svg: React$1.ReactNode;
    logoColor?: string;
    color: {
        backgroundColor: string;
        color: string;
        border: string;
        hoverBgColor: string;
        hoverBorder: string;
        logoColor?: string;
        loadingcolor?: string;
    };
};
type ProviderType = BuiltInProvider | CustomProvider;
type SocialButtonProps = {
    Props?: {
        ButtonProps?: Mui.ButtonProps;
        SVGProps?: SocialSvgProps;
    };
    Provider: ProviderType;
    OnClick?: React$1.MouseEventHandler<HTMLButtonElement> | undefined;
    action?: () => void | Promise<void>;
    loading?: boolean;
    disabled?: boolean;
    children?: React$1.ReactNode;
    /**
    * ONLY FOR LARGE VARIANT
    * @maximum 217
    * ATTENTION: Values ​​above 217 will be automatically truncated.
    */
    maxWidth?: number;
    /**
    * ONLY FOR CIRCLE VARIANT
    */
    size?: never;
    variant?: "large";
} | {
    Props?: {
        ButtonProps?: Mui.IconButtonProps;
        SVGProps?: SocialSvgProps;
    };
    Provider: ProviderType;
    variant?: "circle";
    OnClick?: React$1.MouseEventHandler<HTMLButtonElement> | undefined;
    loading?: boolean;
    disabled?: boolean;
    children?: React$1.ReactNode;
    action?: () => void | Promise<void>;
    /**
    * ONLY FOR LARGE VARIANT
    * @maximum 217
    * ATTENTION: Values ​​above 217 will be automatically truncated.
    */
    maxWidth?: never;
    /**
    * ONLY FOR CIRCLE VARIANT
    */
    size?: "large" | "small" | "medium";
};

declare function resolveButtonWidth(extrawidth?: number, maxWidth?: number): string;
declare function SocialButton({ OnClick, Provider, variant, Props, disabled, loading, children, action, maxWidth, size, }: SocialButtonProps): react_jsx_runtime.JSX.Element;

export { ActionButton, type ActionButtonNotification, type ActionButtonProps, AvatarUpload, type AvataruploadProps, type BuiltInProvider, type CustomProvider, type NotificationContextValue, NotificationProvider, Passwordfield, type PasswordfieldProps, type ProviderType, SVGs, SocialButton, type SocialButtonProps, type ToastMessage, type ToastType, resolveButtonWidth, useNotification };
