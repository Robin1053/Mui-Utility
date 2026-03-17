import * as Mui from "@mui/material";
import * as React from "react";
import {
    type BuiltInProvider,
    type CustomProvider,
    type ProviderType,
    type SocialButtonProps,
    getProviderButtonStyles,
    resolveProviderPresentation
} from "./Providerconfigs";

const BASE_BUTTON_WIDTH = 183;

function resolveButtonWidth(extrawidth?: number, maxWidth?: number): string {
    let width = BASE_BUTTON_WIDTH;

    if (typeof maxWidth === "number") {
        width = maxWidth;
    }

    if (typeof extrawidth === "number") {
        width = BASE_BUTTON_WIDTH + extrawidth;
    }

    if (typeof maxWidth === "number") {
        width = Math.min(width, maxWidth);
    }

    width = Math.max(BASE_BUTTON_WIDTH, width);
    return `${width}px`;
}

function SocialButton({
    OnClick,
    Provider,
    variant,
    Props,
    disabled,
    loading,
    children,
    action,
    extrawidth,
    maxWidth
}: SocialButtonProps) {
    const providerPresentation = resolveProviderPresentation(Provider);
    const isDark = Mui.useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
    const providerStyles = getProviderButtonStyles(Provider, isDark);
    const logoColor = typeof Provider === "object" ? Provider.logoColor : providerStyles.logoColor;
    const buttonWidth = resolveButtonWidth(extrawidth, maxWidth);

    const iconNode = React.isValidElement(providerPresentation.svg)
        ? React.cloneElement(providerPresentation.svg as React.ReactElement<any>, {
            Props: {
                SVGProps: {
                    ...(Props?.SVGProps?.Props?.SVGProps ?? {}),
                    ...(logoColor ? { color: logoColor, fill: logoColor, stroke: logoColor } : {}),
                },
            },
        })
        : providerPresentation.svg;

    if (variant == "circle") {
        return (
            <>
                <Mui.IconButton
                    sx={
                        {
                            height: "40px",
                            width: "40px",
                        }
                    }
                    {...Props?.ButtonProps}
                    onClick={OnClick}
                    disabled={disabled || loading}
                >
                    {loading ?
                        <Mui.CircularProgress
                            size={20}
                            sx={
                                {
                                    color: providerStyles.color
                                }
                            } />
                        : iconNode}
                </Mui.IconButton>
            </>
        )
    } else {
        return (
            <>
                <Mui.Button
                    {...Props?.ButtonProps}
                    variant="outlined"
                    startIcon={iconNode}
                    sx={
                        {
                            border: providerStyles.border,
                            borderRadius: '20px',
                            backgroundColor: providerStyles.backgroundColor,
                            height: '40px',
                            width: buttonWidth,
                            minWidth: '183px',
                            justifyContent: 'flex-start',
                            textTransform: 'none',
                            color: providerStyles.color,
                            '& .MuiButton-loading': {
                                color: providerStyles.color,
                            },
                            fontSize: '14px',
                            lineHeight: '20px',
                            letterSpacing: '0.25px',
                            padding: 0,
                            '&:hover': {
                                backgroundColor: providerStyles.hoverBgColor,
                                borderColor: providerStyles.hoverBorder,
                            },
                            '& .MuiButton-startIcon': {
                                marginLeft: '11px',
                                marginRight: '11px',
                            },
                            '& .MuiButton-startIcon svg': {
                                height: '20px',
                                width: '20px',
                            },
                        }
                    }
                    loading={loading}
                    onClick={OnClick}
                    disabled={disabled || loading}
                > <Mui.Box sx={
                    {
                        paddingRight: "12px"
                    }
                }>
                        {(children ?? `Sign in with ${providerPresentation.label}`)}
                    </Mui.Box>
                </Mui.Button>
            </>
        )
    }
}

export { SocialButton };
export type {
    SocialButtonProps,
    BuiltInProvider,
    CustomProvider,
    ProviderType,
};

export { resolveButtonWidth };
