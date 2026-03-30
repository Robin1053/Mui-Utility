import * as React from "react";
import * as Mui from "@mui/material";
import * as SVG from "./SVGs/SVGs";
import { SocialSvgProps } from "./SVGs/SVGs";
import type { ActionButtonNotification } from "@/ActionButton";

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

const BUILT_IN_Provider_PRESENTATION: Record<BuiltInProvider, ProviderPresentation> = {
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
    passkey: { label: "Passkey", svg: <SVG.PasskeySVG /> },
};

function resolveProviderPresentation(Provider: ProviderType): ProviderPresentation {
    if (typeof Provider === "object") {
        return {
            label: Provider.name,
            svg: Provider.svg,
        };
    }

    return BUILT_IN_Provider_PRESENTATION[Provider];
}

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
            ButtonProps?: Mui.ButtonProps
            SVGProps?: SocialSvgProps
        };
        Provider: ProviderType;
        OnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
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
            ButtonProps?: Mui.IconButtonProps
            SVGProps?: SocialSvgProps
        };
        Provider: ProviderType;
        variant?: "circle";
        OnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
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




function getProviderButtonStyles(Provider: ProviderType, isDark: boolean = false): ProviderButtonStyle {
    const ProviderName = typeof Provider === "object" ? Provider.name.toLowerCase() : Provider.toLowerCase();

    const styles: Record<string, ProviderButtonStyle> = {

        google: isDark ? {
            button: {
                backgroundColor: '#131314',
                color: '#E3E3E3',
                border: '1px solid #8E918F',
                hoverBgColor: '#FFFFFF',
                hoverBorder: 'rgba(0, 0, 0, 0.1)',
            },
            circle: {
                backgroundColor: '#131314',
                color: '#E3E3E3',
                border: '1px solid #8E918F',
                hoverBgColor: '#FFFFFF',
                hoverBorder: 'rgba(0, 0, 0, 0.1)',
            }
        } : {
            button: {
                backgroundColor: '#E3E3E3',
                color: '#131314',
                border: '1px solid #131314',
                hoverBgColor: '#8E918F',
                hoverBorder: '1px solid rgba(17, 16, 16, 0.09)'
            },
            circle: {
                backgroundColor: '#E3E3E3',
                color: '#131314',
                border: '1px solid #E3E3E3',
                hoverBgColor: 'rgb(64, 64, 70)',
                hoverBorder: '1px solid rgb(227, 227, 227)'
            }
        },


        apple: isDark ? {
            button: {
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid #ffffff',
                hoverBgColor: '#F0F0F0',
                hoverBorder: '#F0F0F0',
                logoColor: '#000000',
                loadingcolor: '#000000'
            },
            circle: {
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid #ffffff',
                hoverBgColor: '#F0F0F0',
                hoverBorder: '#F0F0F0',
                logoColor: '#000000',
                loadingcolor: '#000000'
            }
        } : {
            button: {
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: '1px solid #000000',
                hoverBgColor: '#1C1C1C',
                hoverBorder: '#1C1C1C',
                logoColor: '#FFFFFF',
                loadingcolor: '#FFFFFF'

            },
            circle: {
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: '1px solid #000000',
                hoverBgColor: '#1C1C1C',
                hoverBorder: '#1C1C1C',
                logoColor: '#FFFFFF',
                loadingcolor: '#FFFFFF'
            }
        },


        github: isDark ? {
            button: {
                backgroundColor: 'rgb(43,45,49)',
                color: '#F2F5F3',
                border: '1px solid rgba(35, 41, 37, 0.24)',
                hoverBgColor: 'rgb(25, 27, 25)',
                hoverBorder: 'rgba(25, 27, 25, 0.32)',
                logoColor: '#FFFFFF',
            },
            circle: {
                backgroundColor: 'rgb(43,45,49)',
                color: '#F2F5F3',
                border: '1px solid rgba(35, 41, 37, 0.24)',
                hoverBgColor: 'rgb(25, 27, 25)',
                hoverBorder: 'rgba(25, 27, 25, 0.32)',
                logoColor: '#FFFFFF',
            }
        } : {
            button: {
                backgroundColor: '#F2F5F3',
                color: '#232925',
                border: '1px solid rgba(240, 246, 252, 0.24)',
                hoverBgColor: '#cae4d3',
                hoverBorder: 'rgba(240, 246, 252, 0.32)',
                logoColor: '#000000',
            },
            circle: {
                backgroundColor: '#F2F5F3',
                color: '#232925',
                border: '1px solid rgba(240, 246, 252, 0.24)',
                hoverBgColor: '#cae4d3',
                hoverBorder: 'rgba(240, 246, 252, 0.32)',
                logoColor: '#000000',
            }
        },


        microsoft: isDark ? {
            button: {
                backgroundColor: '#2f2f2f',
                color: '#FFFFFF',
                border: '1px solid #8c8c8c',
                hoverBgColor: '#3B3B3B',
                hoverBorder: '#A0A0A0'
            },
            circle: {
                backgroundColor: '#2f2f2f',
                color: '#FFFFFF',
                border: '1px solid #8c8c8c',
                hoverBgColor: '#3B3B3B',
                hoverBorder: '#A0A0A0'
            }

        } : {
            button: {
                backgroundColor: '#FFFFFF',
                color: '#1F1F1F',
                border: '1px solid #F5F5F5',
                hoverBgColor: '#f7f1f1',
                hoverBorder: '#f3e3e3'
            },
            circle: {
                backgroundColor: '#FFFFFF',
                color: '#1F1F1F',
                border: '1px solid #F5F5F5',
                hoverBgColor: '#f7f1f1',
                hoverBorder: '#f3e3e3'
            }
        },


        facebook: {
            button: {
                backgroundColor: '#1877F2',
                color: '#FFFFFF',
                border: '1px solid #1877F2',
                hoverBgColor: '#4287e2',
                hoverBorder: '#4287e2',
                logoColor: '#FFFFFF',
            },
            circle: {
                backgroundColor: '#1877F2',
                color: '#FFFFFF',
                border: '1px solid #1877F2',
                hoverBgColor: '#4287e2',
                hoverBorder: '#4287e2',
                logoColor: '#ffffff',
            }

        },


        linkedin: {
            button: {
                backgroundColor: '#0A66C2',
                color: '#FFFFFF',
                border: '1px solid #0A66C2',
                hoverBgColor: '#004182',
                hoverBorder: '#004182',
                logoColor: '#FFFFFF',
                loadingcolor: '#FFFFFF'
            },
            circle: {
                backgroundColor: '#0A66C2',
                color: '#FFFFFF',
                border: '1px solid #0A66C2',
                hoverBgColor: '#004182',
                hoverBorder: '#004182',
                logoColor: '#FFFFFF',
                loadingcolor: '#FFFFFF'
            }

        },


        x: isDark ? {
            button: {
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                hoverBgColor: '#272727',
                hoverBorder: 'rgba(255, 255, 255, 0.3)',
                logoColor: '#FFFFFF',
            },
            circle: {
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                hoverBgColor: '#272727',
                hoverBorder: 'rgba(255, 255, 255, 0.3)',
                logoColor: '#FFFFFF',
            }
        } : {
            button: {
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid rgba(0, 0, 0, 0.18)',
                hoverBgColor: '#F2F2F2',
                hoverBorder: 'rgba(0, 0, 0, 0.26)',
                logoColor: '#000000',
            },
            circle: {
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid rgba(0, 0, 0, 0.18)',
                hoverBgColor: '#F2F2F2',
                hoverBorder: 'rgba(0, 0, 0, 0.26)',
                logoColor: '#000000',
            }
        },


        gitlab: isDark ? {
            button: {
                backgroundColor: '#171321',
                color: '#FFFFFF',
                border: '1px solid #FC6D26',
                hoverBgColor: 'rgb(26, 23, 23)',
                hoverBorder: 'rgba(226, 67, 41, 0.8)',
                loadingcolor: '#FC6D26'
            },
            circle: {
                backgroundColor: '#171321',
                color: '#FFFFFF',
                border: '1px solid #FC6D26',
                hoverBgColor: 'rgb(26, 23, 23)',
                hoverBorder: 'rgba(226, 67, 41, 0.8)',
                loadingcolor: '#FC6D26'
            }
        } : {
            button: {
                backgroundColor: '#FFFFFF',
                color: '#FC6D26',
                border: '1px solid #FC6D26',
                hoverBgColor: '#F5F5F5',
                hoverBorder: '#FC6D26',
                loadingcolor: '#FC6D26'
            },
            circle: {
                backgroundColor: '#FFFFFF',
                color: '#FC6D26',
                border: '1px solid #FC6D26',
                hoverBgColor: '#F5F5F5',
                hoverBorder: '#FC6D26',
                loadingcolor: '#FC6D26'
            }
        },


        discord: isDark ? {
            button: {
                backgroundColor: '#1c1d23',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                hoverBgColor: '#23252e',
                hoverBorder: 'rgba(255, 255, 255, 0.16)',
            },
            circle: {
                backgroundColor: '#1c1d23',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                hoverBgColor: '#23252e',
                hoverBorder: 'rgba(255, 255, 255, 0.16)',
            },
        } : {
            button: {
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                hoverBgColor: '#F4F5F7',
                hoverBorder: 'rgba(17, 18, 19, 0.16)',
            },
            circle: {
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                hoverBgColor: '#F4F5F7',
                hoverBorder: 'rgba(17, 18, 19, 0.16)',
            }
        },


        slack: isDark ? {
            button: {
                backgroundColor: '#1c1d23',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                hoverBgColor: '#23252e',
                hoverBorder: 'rgba(255, 255, 255, 0.16)',
            },
            circle: {
                backgroundColor: '#1c1d23',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                hoverBgColor: '#23252e',
                hoverBorder: 'rgba(255, 255, 255, 0.16)',
            }
        } : {
            button: {
                backgroundColor: '#FFFFFF',
                color: '#1F1F1F',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                hoverBgColor: '#F8F8F8',
                hoverBorder: 'rgba(0, 0, 0, 0.18)',
            },
            circle: {
                backgroundColor: '#FFFFFF',
                color: '#1F1F1F',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                hoverBgColor: '#F8F8F8',
                hoverBorder: 'rgba(0, 0, 0, 0.18)',
            }
        },

        passkey: isDark ? {
            button: {
                backgroundColor: '#1F222B',
                color: '#F8F5F1',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                hoverBgColor: '#2A2F3A',
                hoverBorder: 'rgba(255, 255, 255, 0.24)',
                loadingcolor: '#F8F5F1',
                logoColor: '#F8F5F1',
            },
            circle: {
                backgroundColor: '#1F222B',
                color: '#F8F5F1',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                hoverBgColor: '#2A2F3A',
                hoverBorder: 'rgba(255, 255, 255, 0.24)',
                loadingcolor: '#F8F5F1',
                logoColor: '#F8F5F1',
            }
        } : {
            button: {
                backgroundColor: '#F4ECE4',
                color: '#2D1C12',
                border: '1px solid rgba(157, 112, 82, 0.32)',
                hoverBgColor: '#EDE1D5',
                hoverBorder: 'rgba(157, 112, 82, 0.48)',
                loadingcolor: '#2D1C12',
                logoColor: '#2D1C12',
            },
            circle: {
                backgroundColor: '#F4ECE4',
                color: '#2D1C12',
                border: '1px solid rgba(157, 112, 82, 0.32)',
                hoverBgColor: '#EDE1D5',
                hoverBorder: 'rgba(157, 112, 82, 0.48)',
                loadingcolor: '#2D1C12',
                logoColor: '#2D1C12',
            }
        }
    }
    return styles[ProviderName] || styles.google;

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