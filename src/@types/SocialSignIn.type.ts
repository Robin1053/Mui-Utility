import { SocialSvgProps } from "@/index";
import { ActionButtonNotification } from "@/index";
import { ButtonProps } from "@mui/material/Button";
import { IconButtonProps } from "@mui/material/IconButton";

type BuiltInProvider =
    | "google"
    | "microsoft"
    | "apple"
    | "github"
    | "facebook"
    | "linkedin"
    | "x"
    | "gitlab"
    | "discord"
    | "slack"
    | "passkey";

type CustomProvider = {
    type: "custom";
    name: string;
    svg: React.ReactNode;
    logoColor?: string;
    color: {
        backgroundColor: string;
        color: string;
        border: string;
        hoverBgColor: string;
        hoverBorder: string;
        logoColor?: string;
        loadingcolor?: string;
    }
};

type ProviderType = BuiltInProvider | CustomProvider;

type Variant = "large" | "circle";

type ProviderPresentation = {
    label: string;
    svg: React.ReactNode;
};

type ProviderButtonStyle = {
    button: {
        backgroundColor: string;
        color: string;
        border: string;
        hoverBgColor: string;
        hoverBorder: string;
        logoColor?: string;
        loadingcolor?: string;
    };
    circle: {
        backgroundColor: string;
        color: string;
        border: string;
        hoverBgColor: string;
        hoverBorder: string;
        logoColor?: string;
        loadingcolor?: string;
    }
};


type SocialButtonProps =
    | {
        Props?: {
            ButtonProps?: ButtonProps
            SVGProps?: SocialSvgProps
        };
        Provider: ProviderType;
        OnClick?: React.MouseEventHandler<HTMLElement> | undefined
        action?: () => void | Promise<void>;
        Notification?: ActionButtonNotification;
        loading?: boolean;
        disabled?: boolean;
        children?: React.ReactNode;
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
    }
    | {
        Props?: {
            ButtonProps?: IconButtonProps
            SVGProps?: SocialSvgProps
        };
        Provider: ProviderType;
        variant: "circle";
        OnClick?: React.MouseEventHandler<HTMLElement> | undefined
        loading?: boolean;
        disabled?: boolean;
        children?: React.ReactNode;
        action?: () => void | Promise<void>;
        Notification?: ActionButtonNotification;
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
    }


export {
    BuiltInProvider,
    CustomProvider,
    ProviderType,
    Variant,
    ProviderPresentation,
    SocialButtonProps,
    ProviderButtonStyle
}