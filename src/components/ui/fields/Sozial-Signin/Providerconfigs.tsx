import * as React from "react";
import * as Mui from "@mui/material";
import * as SVG from "./SVGs";
import { SocialSvgProps } from "./SVGs";

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
    | "slack";

type CustomProvider = {
    type: "custom";
    name: string;
    svg: React.ReactNode;
    logoColor?: string;
};

type ProviderType = BuiltInProvider | CustomProvider;

type Variant = "large" | "circle";

type ProviderPresentation = {
    label: string;
    svg: React.ReactNode;
};

const BUILT_IN_PROVIDER_PRESENTATION: Record<BuiltInProvider, ProviderPresentation> = {
    google: { label: "Google", svg: <SVG.GoogleSVG /> },
    microsoft: { label: "Microsoft", svg: <SVG.MicrosoftSVG /> },
    apple: { label: "Apple", svg: <SVG.AppleSVG /> },
    github: { label: "GitHub", svg: <SVG.GitHubSVG /> },
    facebook: { label: "Facebook", svg: <SVG.FacebookSVG /> },
    linkedin: { label: "LinkedIn", svg: <SVG.LinkedInSVG /> },
    x: { label: "X", svg: <SVG.XSVG /> },
    gitlab: { label: "GitLab", svg: <SVG.GitLabSVG /> },
    discord: { label: "Discord", svg: <SVG.DiscordSVG /> },
    slack: { label: "Slack", svg: <SVG.SlackSVG /> },
};

function resolveProviderPresentation(provider: ProviderType): ProviderPresentation {
    if (typeof provider === "object") {
        return {
            label: provider.name,
            svg: provider.svg,
        };
    }

    return BUILT_IN_PROVIDER_PRESENTATION[provider];
}

type ProviderButtonStyle = {
    backgroundColor: string;
    color: string;
    border: string;
    hoverBgColor: string;
    hoverBorder: string;
    logoColor?: string;
};


type SocialButtonProps = {
    Props?: {
        ButtonProps?: Mui.ButtonProps
        SVGProps?: SocialSvgProps
    };
    Provider: ProviderType;
    variant?: Variant;
    OnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
    loading?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    action?: () => void | Promise<void>;
    extrawidth?: number;
    maxWidth?: number;
}

function getProviderButtonStyles(provider: ProviderType, isDark: boolean = false): ProviderButtonStyle {
    const providerName = typeof provider === "object" ? provider.name.toLowerCase() : provider.toLowerCase();

    const styles: Record<string, ProviderButtonStyle> = {
        google: isDark ? {
            backgroundColor: '#FFFFFF',
            color: '#1F1F1F',
            border: '1px solid #747775',
            hoverBgColor: '#FFFFFF',
            hoverBorder: 'rgba(0, 0, 0, 0.1)',
        } : {
            backgroundColor: '#131314',
            color: '#E3E3E3',
            border: '1px solid #8E918F',
            hoverBgColor: '#FFFFFF',
            hoverBorder: 'rgba(0, 0, 0, 0.1)',
        },


        apple: isDark ? {
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: '1px solid #000000',
            hoverBgColor: '#1C1C1C',
            hoverBorder: '#1C1C1C',
            logoColor: '#FFFFFF',
        } : {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: '1px solid #FFFFFF',
            hoverBgColor: '#F0F0F0',
            hoverBorder: '#F0F0F0',
            logoColor: '#000000',
        },


        github: isDark ? {
            backgroundColor: '#F2F5F3',
            color: '#232925',
            border: '1px solid rgba(240, 246, 252, 0.16)',
            hoverBgColor: '#161B22',
            hoverBorder: 'rgba(240, 246, 252, 0.24)',
            logoColor: '#000000',
        } : {
            backgroundColor: 'rgb(43,45,49)',
            color: '#F2F5F3',
            border: '1px solid rgba(35, 41, 37, 0.16)',
            hoverBgColor: '#F2F5F3',
            hoverBorder: 'rgba(16, 20, 17, 0.24)',
            logoColor: '#FFFFFF',
        },


        microsoft: isDark ? {
            backgroundColor: '#FFFFFF',
            color: '#1F1F1F',
            border: '1px solid #8c8c8c',
            hoverBgColor: '#F5F5F5',
            hoverBorder: '#8c8c8c',
        } : {
            backgroundColor: '#2f2f2f',
            color: '#FFFFFF',
            border: '1px solid #8c8c8c',
            hoverBgColor: '#3B3B3B',
            hoverBorder: '#A0A0A0'
        },


        facebook: {
            backgroundColor: '#1877F2',
            color: '#FFFFFF',
            border: '1px solid #1877F2',
            hoverBgColor: '#166FE5',
            hoverBorder: '#166FE5',
            logoColor: '#5890FF',
        },


        linkedin: {
            backgroundColor: '#0A66C2',
            color: '#FFFFFF',
            border: '1px solid #0A66C2',
            hoverBgColor: '#004182',
            hoverBorder: '#004182',
            logoColor: '#FFFFFF',
        },


        x: isDark ? {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: '1px solid rgba(0, 0, 0, 0.18)',
            hoverBgColor: '#F2F2F2',
            hoverBorder: 'rgba(0, 0, 0, 0.26)',
            logoColor: '#000000',
        } : {
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            hoverBgColor: '#272727',
            hoverBorder: 'rgba(255, 255, 255, 0.3)',
            logoColor: '#FFFFFF',
        },


        gitlab: {
            backgroundColor: '#FFFFFF',
            color: '#FC6D26',
            border: '1px solid #FC6D26',
            hoverBgColor: '#F5F5F5',
            hoverBorder: '#FC6D26',
        },


        discord: isDark ? {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            hoverBgColor: '#F4F5F7',
            hoverBorder: 'rgba(17, 18, 19, 0.16)',
        } : {
            backgroundColor: '#1c1d23',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            hoverBgColor: '#23252e',
            hoverBorder: 'rgba(255, 255, 255, 0.16)',
        },


        slack: {
            backgroundColor: '#FFFFFF',
            color: '#1F1F1F',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            hoverBgColor: '#F8F8F8',
            hoverBorder: 'rgba(0, 0, 0, 0.18)',
        },
    };

    return styles[providerName] || styles.google;
}
export type {
    BuiltInProvider,
    CustomProvider,
    ProviderType,
    Variant,
    ProviderPresentation,
    ProviderButtonStyle,
    SocialButtonProps,
};

export {
    resolveProviderPresentation,
    getProviderButtonStyles,
}