import * as SVG from "./SVGs";
import * as Mui from "@mui/material";
import type { SocialSvgProps } from "./SVGs";
import type { ReactNode } from "react";

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
    svg: ReactNode;
};

type ProviderType = BuiltInProvider | CustomProvider;

type Variant = "large" | "circle";

type ProviderPresentation = {
    label: string;
    svg: ReactNode;
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
    children?: React.ReactNode
}

function SocialButton({ OnClick, Provider, variant, Props, disabled, loading, children }: SocialButtonProps) {
    const providerPresentation = resolveProviderPresentation(Provider);

    if (variant == "circle") {
        return (
            <>
                <Mui.IconButton
                    {...Props.ButtonProps}
                    loading={loading}
                    onClick={OnClick}
                    disabled={disabled}
                >{children ?? providerPresentation.svg}</Mui.IconButton>
            </>
        )
    } else {
        return (
            <>
                <Mui.Button
                    {...Props.ButtonProps}
                    loading={loading}
                    onClick={OnClick}
                    startIcon={providerPresentation.svg}
                    sx={
                        {
                            height: "40px"
                        }
                    }
                > {children ?? `Sign in with ${providerPresentation.label}`}
                </Mui.Button>
            </>
        )
    }
}

export { SocialButton };
export type {
    SocialButtonProps,
    ProviderType,
    BuiltInProvider,
    CustomProvider,
};
