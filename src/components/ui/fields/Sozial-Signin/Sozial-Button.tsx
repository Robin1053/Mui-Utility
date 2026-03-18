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
    maxWidth,
    size,
}: SocialButtonProps) {
    //TODO: Implement Action Handling, so that the Button handels the loading and disabled state itself. 

    const providerPresentation = resolveProviderPresentation(Provider);
    const providerName = typeof Provider === "string" ? Provider : Provider;
    const isPasskeyProvider = providerName === "passkey";
    const theme = Mui.useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const providerStyles = getProviderButtonStyles(Provider, isDarkMode);
    const variantStyles = variant === "circle" ? providerStyles.circle : providerStyles.button;
    const logoColor = typeof Provider === "object"
        ? (Provider.logoColor ?? Provider.color.logoColor ?? variantStyles.logoColor)
        : variantStyles.logoColor;
    const buttonWidth = resolveButtonWidth(maxWidth);
    const iconSize = isPasskeyProvider ? 24 : 20;

    const iconNode = React.isValidElement(providerPresentation.svg)
        ? React.cloneElement(providerPresentation.svg as React.ReactElement<any>, {
            Props: {
                SVGProps: {
                    ...(Props?.SVGProps?.Props?.SVGProps ?? {}),
                    ...(logoColor ? { color: logoColor } : {}),
                },
            },
        })
        : providerPresentation.svg;

    if (variant == "circle") {
        //TODO: FIX: Facebook, LinkedIn icon in darkmode, and Facebook icons in light mode. 

        return (
            <>
                <Mui.IconButton
                    sx={
                        {
                            backgroundColor: providerStyles.circle.backgroundColor,
                            border: providerStyles.circle.border,
                            color: providerStyles.circle.color,
                            '&:hover': {
                                backgroundColor: providerStyles.circle.hoverBgColor,
                                borderColor: providerStyles.circle.hoverBorder,
                            },
                            '&.Mui-disabled': {
                                backgroundColor: providerStyles.circle.backgroundColor,
                                border: providerStyles.circle.border,
                                color: providerStyles.circle.color,
                                opacity: 0.75,
                            },
                            padding: 0,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }
                    }
                    size={size}
                    {...Props?.ButtonProps}
                    onClick={OnClick}
                    disabled={disabled || loading}                >
                    {loading ?
                        <Mui.Box
                            sx={{
                                width: `${iconSize}px`,
                                height: `${iconSize}px`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Mui.CircularProgress
                                size={`${iconSize}px`}
                                sx={
                                    {
                                        color: `${providerStyles.circle.loadingcolor || providerStyles.circle.color} !important`
                                    }
                                } />
                        </Mui.Box>
                        : <Mui.Box
                            sx={{
                                width: `${iconSize}px`,
                                height: `${iconSize}px`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                '& > svg': {
                                    width: '100%',
                                    height: '100%',
                                    display: 'block',
                                },
                            }}
                        >
                            {iconNode}
                        </Mui.Box>}
                </Mui.IconButton>
            </>
        )
    } else {
        //TODO: Cap the Button Width to a maxWidth if provided, and resolve the extrawidth accordingly.

        return (
            <>
                <Mui.Button
                    {...Props?.ButtonProps}
                    loadingIndicator={
                        <Mui.Box
                            sx={{
                                width: `${iconSize}px`,
                                height: `${iconSize}px`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Mui.CircularProgress sx={{ color: providerStyles.button.loadingcolor || providerStyles.button.color }} size={`${iconSize}px`} />
                        </Mui.Box>
                    }
                    loadingPosition="end"
                    variant="outlined"
                    startIcon={
                        <Mui.Box
                            sx={{
                                width: `${iconSize}px`,
                                height: `${iconSize}px`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                '& > svg': {
                                    width: '100%',
                                    height: '100%',
                                    display: 'block',
                                },
                            }}
                        >
                            {iconNode}
                        </Mui.Box>
                    }
                    sx={
                        {
                            border: providerStyles.button.border,
                            borderRadius: '20px',
                            backgroundColor: providerStyles.button.backgroundColor,
                            height: '40px',
                            width: buttonWidth,
                            minWidth: '183px',
                            maxWidth: '400px',
                            justifyContent: 'flex-start',
                            color: providerStyles.button.color,
                            fontSize: '14px',
                            lineHeight: '20px',
                            letterSpacing: '0.25px',
                            padding: 0,
                            '&:hover': {
                                backgroundColor: providerStyles.button.hoverBgColor,
                                borderColor: providerStyles.button.hoverBorder,
                            },
                            '&.Mui-disabled': {
                                backgroundColor: providerStyles.button.backgroundColor,
                                border: providerStyles.button.border,
                                color: providerStyles.button.color,
                                opacity: 0.75,
                            },
                            '&.Mui-disabled .MuiCircularProgress-root': {
                                color: `${providerStyles.button.loadingcolor || providerStyles.button.color} !important`,
                            },
                            '& .MuiButton-startIcon': {
                                marginLeft: '11px',
                                marginRight: '11px',
                                display: 'flex',
                                alignItems: 'center',
                            },
                            '& .MuiButton-endIcon': {
                                marginLeft: '11px',
                                marginRight: '11px',
                                display: 'flex',
                                alignItems: 'center',
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

export { SocialButton, resolveButtonWidth };
export type {
    SocialButtonProps,
    BuiltInProvider,
    CustomProvider,
    ProviderType,
};
