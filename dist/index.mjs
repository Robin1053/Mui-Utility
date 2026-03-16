var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/components/ui/ActionButton/ActionButton.tsx
import {
  Button,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ClickAwayListener
} from "@mui/material";
import * as React2 from "react";

// src/components/ui/Notifications.tsx
import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { jsx, jsxs } from "react/jsx-runtime";
var NotificationContext = createContext({
  notify: () => {
  }
});
var useNotification = () => useContext(NotificationContext);
var NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "info"
  });
  const notify = ({ message, type }) => {
    setToast({ message, type });
    setOpen(true);
  };
  return /* @__PURE__ */ jsxs(NotificationContext.Provider, { value: { notify }, children: [
    children,
    /* @__PURE__ */ jsx(
      Snackbar,
      {
        open,
        autoHideDuration: 4e3,
        onClose: () => setOpen(false),
        anchorOrigin: { vertical: "bottom", horizontal: "left" },
        children: /* @__PURE__ */ jsx(
          Alert,
          {
            onClose: () => setOpen(false),
            severity: toast.type,
            sx: { width: "100%" },
            children: toast.message
          }
        )
      }
    )
  ] });
};

// src/components/ui/ActionButton/ActionButton.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function ActionButton({
  action,
  requireAreYouSure = false,
  icon,
  Dialog = {},
  Props = {
    DialogProps: { open: false },
    ButtonProps: {}
  },
  destructive = false,
  children,
  Notification = {}
}) {
  const [Open, setOpen] = React2.useState(false);
  const [Loading, setLoading] = React2.useState(false);
  const [error, setError] = React2.useState(null);
  const { notify } = useNotification();
  const handleClickAway = () => {
    setOpen(false);
  };
  async function Clicked() {
    if (error) setError(null);
    if (requireAreYouSure) {
      setOpen(true);
    } else {
      await executeAction();
    }
  }
  async function executeAction() {
    setLoading(true);
    try {
      await action();
      if (Notification.useNotification === true) {
        notify({ message: Notification.successmessage, type: "success" });
      }
    } catch (e) {
      const caughtError = e instanceof Error ? e : new Error("An unknown error has occurred.");
      setError(caughtError);
      if (Notification.useNotification === true) {
        const errorMessage = caughtError.message || Notification.errormessage;
        notify({ type: "error", message: errorMessage });
      }
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsx2(ClickAwayListener, { onClickAway: handleClickAway, children: /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsx2(
      Button,
      {
        ...Props.ButtonProps,
        onClick: Clicked,
        loading: Loading,
        color: destructive || error ? "error" : "primary",
        startIcon: icon,
        sx: Props.ButtonProps.sx,
        variant: "outlined",
        "aria-busy": Loading,
        "aria-invalid": !!error,
        "aria-describedby": error ? "action-error-desc" : void 0,
        children
      }
    ),
    /* @__PURE__ */ jsx2(Dialogfunction, {}),
    error && /* @__PURE__ */ jsx2("span", { id: "action-error-desc", style: { display: "none" }, children: "Aktion fehlgeschlagen" })
  ] }) }) });
  function Dialogfunction() {
    return /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsxs2(
      MuiDialog,
      {
        ...Props.DialogProps,
        open: Open,
        onClose: () => setOpen(false),
        sx: Props.DialogProps.sx,
        "aria-labelledby": "dialog-title",
        "aria-describedby": "dialog-description",
        children: [
          /* @__PURE__ */ jsx2(DialogTitle, { id: "dialog-title", children: Dialog.dialogTitle || "Confirm Action" }),
          /* @__PURE__ */ jsx2(DialogContent, { children: /* @__PURE__ */ jsx2(DialogContentText, { id: "dialog-description", children: Dialog.dialogContent || "Are you sure you want to do this?" }) }),
          /* @__PURE__ */ jsxs2(DialogActions, { children: [
            /* @__PURE__ */ jsx2(Button, { onClick: () => setOpen(false), color: "error", children: "Cancel" }),
            /* @__PURE__ */ jsx2(
              Button,
              {
                onClick: () => executeAction(),
                color: destructive ? "error" : "primary",
                children: Dialog.confirmText || "Yes"
              }
            )
          ] })
        ]
      }
    ) });
  }
}

// src/components/ui/fields/Password/Passwordfield.tsx
import {
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  Divider,
  LinearProgress
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import * as React3 from "react";

// src/components/ui/fields/Password/Passwordstrenght.tsx
function getPasswordStrength(password) {
  if (!password) return 0;
  let score = 0;
  const len = password.length;
  if (len > 12) score += 40;
  else if (len > 8) score += 25;
  else if (len > 6) score += 10;
  else score += 5;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  if (hasUpper) score += 15;
  if (hasLower) score += 15;
  if (hasNumber) score += 15;
  if (hasSpecial) score += 15;
  const variationCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
    Boolean
  ).length;
  if (variationCount <= 1 && len > 5) {
    score -= 20;
  }
  return Math.max(0, Math.min(100, score));
}

// src/components/ui/fields/Password/Passwordfield.tsx
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function Passwordfield({
  loading = false,
  children,
  showstrength = false,
  error = false,
  onChange,
  Props = {
    Muiprops: {}
  },
  value
}) {
  const [showPassword, setShowPassword] = React3.useState(false);
  const [internalPassword, setInternalPassword] = React3.useState("");
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const passwordValue = typeof value === "string" ? value : internalPassword;
  const strength = getPasswordStrength(passwordValue);
  return /* @__PURE__ */ jsx3(Fragment2, { children: /* @__PURE__ */ jsxs3(FormControl, { sx: { m: 1, width: "25ch" }, variant: "outlined", children: [
    /* @__PURE__ */ jsx3(InputLabel, { htmlFor: "Passwordfield", children }),
    /* @__PURE__ */ jsx3(
      Input,
      {
        "aria-label": "Password field",
        ...Props.Muiprops,
        sx: Props.Muiprops?.sx,
        disableUnderline: true,
        inputComponent: "input",
        id: "Passwordfield",
        type: showPassword ? "text" : "password",
        value: passwordValue,
        onChange: (event) => {
          setInternalPassword(event.target.value);
          onChange?.(event);
        },
        endAdornment: /* @__PURE__ */ jsx3(InputAdornment, { position: "end", children: /* @__PURE__ */ jsx3(
          IconButton,
          {
            "aria-label": showPassword ? "hide the password" : "display the password",
            onClick: () => setShowPassword((prev) => !prev),
            onMouseDown: handleMouseDownPassword,
            onMouseUp: handleMouseUpPassword,
            edge: "end",
            children: showPassword ? /* @__PURE__ */ jsx3(VisibilityOff, {}) : /* @__PURE__ */ jsx3(Visibility, {})
          }
        ) }),
        name: "Password",
        error
      }
    ),
    !showstrength ? /* @__PURE__ */ jsx3(Divider, {}) : /* @__PURE__ */ jsx3(
      LinearProgress,
      {
        variant: "determinate",
        value: strength,
        sx: { height: "2px" }
      }
    )
  ] }) });
}

// src/components/ui/fields/Avatarupload.tsx
import {
  Avatar,
  Badge,
  IconButton as IconButton2
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function AvatarUpload({
  image,
  onUpload,
  icon,
  Props = {
    BadgeProps: {},
    IconButtonProps: {},
    InputProps: {}
  }
}) {
  return /* @__PURE__ */ jsxs4(
    IconButton2,
    {
      component: "label",
      ...Props.IconButtonProps,
      sx: Props.IconButtonProps?.sx,
      children: [
        /* @__PURE__ */ jsx4(
          "input",
          {
            ...Props.InputProps,
            "aria-label": "Select image file for avatar upload",
            hidden: true,
            accept: "image/*",
            type: "file",
            onChange: (e) => {
              const file = e.target.files?.[0];
              if (file) {
                onUpload(file);
              }
            }
          }
        ),
        /* @__PURE__ */ jsx4(
          Badge,
          {
            ...Props.BadgeProps,
            sx: Props.BadgeProps?.sx,
            overlap: "circular",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
            badgeContent: icon || /* @__PURE__ */ jsx4(PhotoCameraIcon, { sx: { fontSize: 18 } }),
            children: /* @__PURE__ */ jsx4(
              Avatar,
              {
                src: image,
                sx: { width: 128, height: 128 },
                alt: image || "No profile picture set"
              }
            )
          }
        )
      ]
    }
  );
}

// src/components/ui/fields/Sozial-Signin/SVGs.tsx
var SVGs_exports = {};
__export(SVGs_exports, {
  AppleSVG: () => AppleSVG,
  DiscordSVG: () => DiscordSVG,
  FacebookSVG: () => FacebookSVG,
  GitHubSVG: () => GitHubSVG,
  GitLabSVG: () => GitLabSVG,
  GoogleSVG: () => GoogleSVG,
  LinkedInSVG: () => LinkedInSVG,
  MicrosoftSVG: () => MicrosoftSVG,
  SlackSVG: () => SlackSVG,
  XSVG: () => XSVG
});
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function getA11yProps(title) {
  return title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
}
function GoogleSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "-3 0 262 262",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid",
      ...getA11yProps(title),
      ...Props.SVGProps,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5(
          "path",
          {
            d: "M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027",
            fill: "#4285F4"
          }
        ),
        /* @__PURE__ */ jsx5(
          "path",
          {
            d: "M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1",
            fill: "#34A853"
          }
        ),
        /* @__PURE__ */ jsx5(
          "path",
          {
            d: "M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782",
            fill: "#FBBC05"
          }
        ),
        /* @__PURE__ */ jsx5(
          "path",
          {
            d: "M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251",
            fill: "#EB4335"
          }
        )
      ]
    }
  );
}
function MicrosoftSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...Props.SVGProps,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("rect", { x: "17", y: "17", width: "10", height: "10", fill: "#FEBA08" }),
        /* @__PURE__ */ jsx5("rect", { x: "5", y: "17", width: "10", height: "10", fill: "#05A6F0" }),
        /* @__PURE__ */ jsx5("rect", { x: "17", y: "5", width: "10", height: "10", fill: "#80BC06" }),
        /* @__PURE__ */ jsx5("rect", { x: "5", y: "5", width: "10", height: "10", fill: "#F25325" })
      ]
    }
  );
}
function AppleSVG({ size = 20, title, ...props }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "-1.5 0 20 20",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("g", { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd", children: /* @__PURE__ */ jsx5("g", { id: "Dribbble-Light-Preview", transform: "translate(-102.000000, -7439.000000)", fill: "#000000", children: /* @__PURE__ */ jsx5("g", { id: "icons", transform: "translate(56.000000, 160.000000)", children: /* @__PURE__ */ jsx5("path", { d: "M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485" }) }) }) })
      ]
    }
  );
}
function GitHubSVG({ size = 20, title, ...props }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      fill: "#181717",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" })
      ]
    }
  );
}
function FacebookSVG({ size = 20, title, ...props }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      fill: "#0866FF",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" })
      ]
    }
  );
}
function LinkedInSVG({ size = 20, title, ...props }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z", fill: "#0F0F0F" }),
        /* @__PURE__ */ jsx5("path", { d: "M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z", fill: "#0F0F0F" }),
        /* @__PURE__ */ jsx5("path", { d: "M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z", fill: "#0F0F0F" }),
        /* @__PURE__ */ jsx5(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z",
            fill: "#0F0F0F"
          }
        )
      ]
    }
  );
}
function XSVG({ size = 20, title, ...props }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      fill: "#000000",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" })
      ]
    }
  );
}
function GitLabSVG({ size = 20, title, ...props }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      fill: "#FC6D26",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z" })
      ]
    }
  );
}
function DiscordSVG({ size = 20, title, ...props }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      fill: "#5865F2",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" })
      ]
    }
  );
}
function SlackSVG({ size = 20, title, ...props }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M26.5002 14.9996C27.8808 14.9996 29 13.8804 29 12.4998C29 11.1192 27.8807 10 26.5001 10C25.1194 10 24 11.1193 24 12.5V14.9996H26.5002ZM19.5 14.9996C20.8807 14.9996 22 13.8803 22 12.4996V5.5C22 4.11929 20.8807 3 19.5 3C18.1193 3 17 4.11929 17 5.5V12.4996C17 13.8803 18.1193 14.9996 19.5 14.9996Z", fill: "#2EB67D" }),
        /* @__PURE__ */ jsx5("path", { d: "M5.49979 17.0004C4.11919 17.0004 3 18.1196 3 19.5002C3 20.8808 4.1193 22 5.49989 22C6.8806 22 8 20.8807 8 19.5V17.0004H5.49979ZM12.5 17.0004C11.1193 17.0004 10 18.1197 10 19.5004V26.5C10 27.8807 11.1193 29 12.5 29C13.8807 29 15 27.8807 15 26.5V19.5004C15 18.1197 13.8807 17.0004 12.5 17.0004Z", fill: "#E01E5A" }),
        /* @__PURE__ */ jsx5("path", { d: "M17.0004 26.5002C17.0004 27.8808 18.1196 29 19.5002 29C20.8808 29 22 27.8807 22 26.5001C22 25.1194 20.8807 24 19.5 24L17.0004 24L17.0004 26.5002ZM17.0004 19.5C17.0004 20.8807 18.1197 22 19.5004 22L26.5 22C27.8807 22 29 20.8807 29 19.5C29 18.1193 27.8807 17 26.5 17L19.5004 17C18.1197 17 17.0004 18.1193 17.0004 19.5Z", fill: "#ECB22E" }),
        /* @__PURE__ */ jsx5("path", { d: "M14.9996 5.49979C14.9996 4.11919 13.8804 3 12.4998 3C11.1192 3 10 4.1193 10 5.49989C10 6.88061 11.1193 8 12.5 8L14.9996 8L14.9996 5.49979ZM14.9996 12.5C14.9996 11.1193 13.8803 10 12.4996 10L5.5 10C4.11929 10 3 11.1193 3 12.5C3 13.8807 4.11929 15 5.5 15L12.4996 15C13.8803 15 14.9996 13.8807 14.9996 12.5Z", fill: "#36C5F0" })
      ]
    }
  );
}

// src/components/ui/fields/Sozial-Signin/Sozial-Button.tsx
import * as Mui from "@mui/material";
import { Fragment as Fragment3, jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var BUILT_IN_PROVIDER_PRESENTATION = {
  google: { label: "Google", svg: /* @__PURE__ */ jsx6(GoogleSVG, {}) },
  microsoft: { label: "Microsoft", svg: /* @__PURE__ */ jsx6(MicrosoftSVG, {}) },
  apple: { label: "Apple", svg: /* @__PURE__ */ jsx6(AppleSVG, {}) },
  github: { label: "GitHub", svg: /* @__PURE__ */ jsx6(GitHubSVG, {}) },
  facebook: { label: "Facebook", svg: /* @__PURE__ */ jsx6(FacebookSVG, {}) },
  linkedin: { label: "LinkedIn", svg: /* @__PURE__ */ jsx6(LinkedInSVG, {}) },
  x: { label: "X", svg: /* @__PURE__ */ jsx6(XSVG, {}) },
  gitlab: { label: "GitLab", svg: /* @__PURE__ */ jsx6(GitLabSVG, {}) },
  discord: { label: "Discord", svg: /* @__PURE__ */ jsx6(DiscordSVG, {}) },
  slack: { label: "Slack", svg: /* @__PURE__ */ jsx6(SlackSVG, {}) }
};
function resolveProviderPresentation(provider) {
  if (typeof provider === "object") {
    return {
      label: provider.name,
      svg: provider.svg
    };
  }
  return BUILT_IN_PROVIDER_PRESENTATION[provider];
}
function SocialButton({ OnClick, Provider, variant, Props, disabled, loading, children }) {
  const providerPresentation = resolveProviderPresentation(Provider);
  if (variant == "circle") {
    return /* @__PURE__ */ jsx6(Fragment3, { children: /* @__PURE__ */ jsx6(
      Mui.IconButton,
      {
        ...Props.ButtonProps,
        loading,
        onClick: OnClick,
        disabled,
        children: children ?? providerPresentation.svg
      }
    ) });
  } else {
    return /* @__PURE__ */ jsx6(Fragment3, { children: /* @__PURE__ */ jsxs6(
      Mui.Button,
      {
        ...Props.ButtonProps,
        loading,
        onClick: OnClick,
        startIcon: providerPresentation.svg,
        sx: {
          height: "40px"
        },
        children: [
          " ",
          children ?? `Sign in with ${providerPresentation.label}`
        ]
      }
    ) });
  }
}
export {
  ActionButton,
  AvatarUpload,
  NotificationProvider,
  Passwordfield,
  SVGs_exports as SVGs,
  SocialButton,
  useNotification
};
