import {
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { styled, useTheme, useThemeProps } from "@mui/material/styles";
import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import type { IconButtonProps as MuiIconButtonProps } from "@mui/material/IconButton";
import * as React from "react";
import { cloneElement, isValidElement, useState } from "react";
import { useNotification } from "../Notification/Notifications";
import {
  getProviderButtonStyles,
  resolveProviderPresentation,
} from "./Providerconfigs";
import type {
  BuiltInProvider,
  CustomProvider,
  ProviderType,
  SocialButtonProps,
  SocialSigninButtonOwnerState,
} from "@robineb/mui-utility";
import { shouldForwardSlotProp } from "@robineb/mui-utility";

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

type OwnerStateProps = { ownerState: SocialSigninButtonOwnerState };

// 40px entspricht der Hoehe des grossen Buttons und Googles Icon-Button
const CIRCLE_DIAMETER = { small: 32, medium: 40, large: 48 } as const;

// beide Varianten teilen sich den Slot "root", damit styleOverrides.root/variants fuer beide gelten
const SocialSigninLargeRoot = styled(Button, {
  name: "MuiSocialSigninButton",
  slot: "root",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>(({ ownerState }) => {
  const styles = ownerState.providerStyles.button;
  return {
    border: styles.border,
    borderRadius: "20px",
    backgroundColor: styles.backgroundColor,
    height: "40px",
    // Mindestbreite statt fester Breite, damit laengere Labels nicht umbrechen
    minWidth: ownerState.buttonWidth,
    maxWidth: "400px",
    justifyContent: "flex-start",
    color: styles.color,
    // Google-Vorgaben: Medium 14/20, Satzschreibung (MUI-Buttons sind sonst uppercase)
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.25px",
    textTransform: "none",
    whiteSpace: "nowrap",
    padding: 0,
    "&:hover": {
      backgroundColor: styles.hoverBgColor,
      borderColor: styles.hoverBorder,
    },
    "&.Mui-disabled": {
      backgroundColor: styles.backgroundColor,
      border: styles.border,
      color: styles.color,
      opacity: 0.75,
    },
    "&.Mui-disabled .MuiCircularProgress-root": {
      color: `${styles.loadingcolor || styles.color} !important`,
    },
    // Google-Vorgaben: 12px vor dem Logo, 10px zwischen Logo und Text, 12px nach dem Text (Label)
    "& .MuiButton-startIcon": {
      marginLeft: "12px",
      marginRight: "10px",
      display: "flex",
      alignItems: "center",
    },
    "& .MuiButton-endIcon": {
      marginLeft: "11px",
      marginRight: "11px",
      display: "flex",
      alignItems: "center",
    },
  };
});

const SocialSigninCircleRoot = styled(IconButton, {
  name: "MuiSocialSigninButton",
  slot: "root",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>(({ ownerState }) => {
  const styles = ownerState.providerStyles.circle;
  // ohne feste Groesse schrumpft der Kreis auf die Logo-Groesse und der Rand liegt als Ring um das Logo
  const diameter = CIRCLE_DIAMETER[ownerState.size ?? "medium"];
  return {
    width: diameter,
    height: diameter,
    backgroundColor: styles.backgroundColor,
    border: styles.border,
    color: styles.color,
    "&:hover": {
      backgroundColor: styles.hoverBgColor,
      borderColor: styles.hoverBorder,
    },
    "&.Mui-disabled": {
      backgroundColor: styles.backgroundColor,
      border: styles.border,
      color: styles.color,
      opacity: 0.75,
    },
    padding: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
});

// Wrapper fuer Logo und Ladeindikator; span statt div, da div in <button> kein gueltiges HTML ist
const SocialSigninIcon = styled("span", {
  name: "MuiSocialSigninButton",
  slot: "icon",
})<OwnerStateProps>(({ ownerState }) => ({
  width: `${ownerState.iconSize}px`,
  height: `${ownerState.iconSize}px`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& > svg": {
    width: "100%",
    height: "100%",
    display: "block",
  },
}));

const SocialSigninLabel = styled("span", {
  name: "MuiSocialSigninButton",
  slot: "label",
})<OwnerStateProps>({
  paddingRight: "12px",
});

const SocialSigninProgress = styled(CircularProgress, {
  name: "MuiSocialSigninButton",
  slot: "progress",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>(({ ownerState }) => {
  const styles =
    ownerState.variant === "circle"
      ? ownerState.providerStyles.circle
      : ownerState.providerStyles.button;
  const color = styles.loadingcolor || styles.color;
  // die Kreisvariante muss die disabled-Farbe des IconButtons uebersteuern
  return { color: ownerState.variant === "circle" ? `${color} !important` : color };
});

const MUISocialSigninButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
  function MUISocialSigninButton(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: "MuiSocialSigninButton" });
    const {
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
    } = props;
    const [internalLoading, setInternalLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { notify } = useNotification();

    const ProviderPresentation = resolveProviderPresentation(Provider);
    const isPasskeyProvider = Provider === "passkey";
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const ProviderStyles = getProviderButtonStyles(Provider, isDarkMode);
    const isCircle = variant === "circle";
    const variantStyles = isCircle ? ProviderStyles.circle : ProviderStyles.button;
    const logoColor =
      typeof Provider === "object"
        ? (Provider.logoColor ??
          Provider.color.logoColor ??
          variantStyles.logoColor)
        : variantStyles.logoColor;
    const isLoading = !!loading || internalLoading;
    const isDisabled = disabled || isLoading;
    const iconButtonProps = isCircle
      ? (Props?.ButtonProps as MuiIconButtonProps | undefined)
      : undefined;
    const buttonProps = isCircle
      ? undefined
      : (Props?.ButtonProps as MuiButtonProps | undefined);

    const ownerState = {
      ...props,
      variant: isCircle ? "circle" : "large",
      providerStyles: ProviderStyles,
      iconSize: isPasskeyProvider ? 24 : 20,
      buttonWidth: resolveButtonWidth(maxWidth),
      isLoading,
      hasError: !!error,
    } as SocialSigninButtonOwnerState;

    const handleClick: React.MouseEventHandler<HTMLElement> = async (
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

    const progressNode = (
      <SocialSigninIcon ownerState={ownerState}>
        <SocialSigninProgress ownerState={ownerState} size={`${ownerState.iconSize}px`} />
      </SocialSigninIcon>
    );

    if (isCircle) {
      return (
        <SocialSigninCircleRoot
          size={size}
          {...iconButtonProps}
          ref={ref}
          ownerState={ownerState}
          onClick={handleClick}
          disabled={isDisabled}
          aria-busy={isLoading}
          aria-invalid={!!error}
        >
          {isLoading ? (
            progressNode
          ) : (
            <SocialSigninIcon ownerState={ownerState}>{iconNode}</SocialSigninIcon>
          )}
        </SocialSigninCircleRoot>
      );
    }

    return (
      <SocialSigninLargeRoot
        {...buttonProps}
        ref={ref}
        ownerState={ownerState}
        loadingIndicator={progressNode}
        loadingPosition="end"
        variant="outlined"
        startIcon={<SocialSigninIcon ownerState={ownerState}>{iconNode}</SocialSigninIcon>}
        loading={isLoading}
        onClick={handleClick}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-invalid={!!error}
      >
        {" "}
        <SocialSigninLabel ownerState={ownerState}>
          {children ?? `Sign in with ${ProviderPresentation.label}`}
        </SocialSigninLabel>
      </SocialSigninLargeRoot>
    );
  },
);

export default MUISocialSigninButton
export { resolveButtonWidth };
export type {
  SocialButtonProps,
  BuiltInProvider,
  CustomProvider,
  ProviderType,
};
