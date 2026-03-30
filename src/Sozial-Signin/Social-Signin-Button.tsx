import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  useTheme,
} from "@mui/material";
import { cloneElement, isValidElement, useState } from "react";
import { useNotification } from "../Notefication/Notifications";
import {
  type BuiltInProvider,
  type CustomProvider,
  type ProviderType,
  type SocialButtonProps,
  getProviderButtonStyles,
  resolveProviderPresentation,
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

function SocialSigninButton({
  OnClick,
  Provider,
  variant,
  Props,
  disabled,
  loading,
  children,
  action,
  Notification = {},
  maxWidth,
  size,
}: SocialButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { notify } = useNotification();

  const ProviderPresentation = resolveProviderPresentation(Provider);
  const ProviderName = typeof Provider === "string" ? Provider : Provider;
  const isPasskeyProvider = ProviderName === "passkey";
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const ProviderStyles = getProviderButtonStyles(Provider, isDarkMode);
  const variantStyles =
    variant === "circle" ? ProviderStyles.circle : ProviderStyles.button;
  const logoColor =
    typeof Provider === "object"
      ? (Provider.logoColor ??
        Provider.color.logoColor ??
        variantStyles.logoColor)
      : variantStyles.logoColor;
  const buttonWidth = resolveButtonWidth(maxWidth);
  const iconSize = isPasskeyProvider ? 24 : 20;
  const isLoading = loading || internalLoading;
  const isDisabled = disabled || isLoading;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    if (isDisabled) return;

    if (!action) {
      OnClick?.(event);
      return;
    }

    if (error) {
      setError(null);
    }

    setInternalLoading(true);
    try {
      await action();
      if (Notification.useNotification === true) {
        notify({ message: Notification.successmessage, type: "success" });
      }
    } catch (caught) {
      const caughtError =
        caught instanceof Error
          ? caught
          : new Error("An unknown error has occurred.");
      setError(caughtError);

      if (Notification.useNotification === true) {
        const errorMessage = caughtError.message || Notification.errormessage;
        notify({ message: errorMessage, type: "error" });
      }
    } finally {
      setInternalLoading(false);
    }
  };

  const iconNode = isValidElement(ProviderPresentation.svg)
    ? cloneElement(ProviderPresentation.svg as React.ReactElement<any>, {
      Props: {
        SVGProps: {
          ...(Props?.SVGProps?.Props?.SVGProps ?? {}),
          ...(logoColor ? { color: logoColor } : {}),
        },
      },
    })
    : ProviderPresentation.svg;

  if (variant == "circle") {

    return (
      <>
        <IconButton
          sx={{
            backgroundColor: ProviderStyles.circle.backgroundColor,
            border: ProviderStyles.circle.border,
            color: ProviderStyles.circle.color,
            "&:hover": {
              backgroundColor: ProviderStyles.circle.hoverBgColor,
              borderColor: ProviderStyles.circle.hoverBorder,
            },
            "&.Mui-disabled": {
              backgroundColor: ProviderStyles.circle.backgroundColor,
              border: ProviderStyles.circle.border,
              color: ProviderStyles.circle.color,
              opacity: 0.75,
            },
            padding: 0,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          size={size}
          {...Props?.ButtonProps}
          onClick={handleClick}
          disabled={isDisabled}
          aria-busy={isLoading}
          aria-invalid={!!error}
        >
          {isLoading ? (
            <Box
              sx={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress
                size={`${iconSize}px`}
                sx={{
                  color: `${ProviderStyles.circle.loadingcolor || ProviderStyles.circle.color} !important`,
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& > svg": {
                  width: "100%",
                  height: "100%",
                  display: "block",
                },
              }}
            >
              {iconNode}
            </Box>
          )}
        </IconButton>
      </>
    );
  } else {
    return (
      <>
        <Button
          {...Props?.ButtonProps}
          loadingIndicator={
            <Box
              sx={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress
                sx={{
                  color:
                    ProviderStyles.button.loadingcolor ||
                    ProviderStyles.button.color,
                }}
                size={`${iconSize}px`}
              />
            </Box>
          }
          loadingPosition="end"
          variant="outlined"
          startIcon={
            <Box
              sx={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& > svg": {
                  width: "100%",
                  height: "100%",
                  display: "block",
                },
              }}
            >
              {iconNode}
            </Box>
          }
          sx={{
            border: ProviderStyles.button.border,
            borderRadius: "20px",
            backgroundColor: ProviderStyles.button.backgroundColor,
            height: "40px",
            width: buttonWidth,
            minWidth: "183px",
            maxWidth: "400px",
            justifyContent: "flex-start",
            color: ProviderStyles.button.color,
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "0.25px",
            padding: 0,
            "&:hover": {
              backgroundColor: ProviderStyles.button.hoverBgColor,
              borderColor: ProviderStyles.button.hoverBorder,
            },
            "&.Mui-disabled": {
              backgroundColor: ProviderStyles.button.backgroundColor,
              border: ProviderStyles.button.border,
              color: ProviderStyles.button.color,
              opacity: 0.75,
            },
            "&.Mui-disabled .MuiCircularProgress-root": {
              color: `${ProviderStyles.button.loadingcolor || ProviderStyles.button.color} !important`,
            },
            "& .MuiButton-startIcon": {
              marginLeft: "11px",
              marginRight: "11px",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiButton-endIcon": {
              marginLeft: "11px",
              marginRight: "11px",
              display: "flex",
              alignItems: "center",
            },
          }}
          loading={isLoading}
          onClick={handleClick}
          disabled={isDisabled}
          aria-busy={isLoading}
          aria-invalid={!!error}
        >
          {" "}
          <Box
            sx={{
              paddingRight: "12px",
            }}
          >
            {children ?? `Sign in with ${ProviderPresentation.label}`}
          </Box>
        </Button>
      </>
    );
  }
}
export default SocialSigninButton
export { resolveButtonWidth };
export type {
  SocialButtonProps,
  BuiltInProvider,
  CustomProvider,
  ProviderType,
};
