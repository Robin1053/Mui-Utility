var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/components/ui/fields/ActionButton/ActionButton.tsx
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

// src/components/ui/Notefication/Notifications.tsx
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

// src/components/ui/fields/ActionButton/ActionButton.tsx
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
    TextfieldProps: {}
  },
  value
}) {
  const [showPassword, setShowPassword] = React3.useState(false);
  const [internalPassword, setInternalPassword] = React3.useState("");
  const strengthDescriptionId = "password-strength-indicator";
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
        ...Props?.TextfieldProps,
        sx: Props.TextfieldProps?.sx,
        inputProps: {
          ...Props.TextfieldProps?.inputProps || {},
          "aria-describedby": showstrength ? strengthDescriptionId : void 0
        },
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
        id: strengthDescriptionId,
        variant: "determinate",
        value: strength,
        sx: { height: "2px" }
      }
    )
  ] }) });
}

// src/components/ui/fields/Avatar/Avatarupload.tsx
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
  const buttonAriaLabel = Props.InputProps?.["aria-label"] || "Profilbild hochladen";
  return /* @__PURE__ */ jsxs4(
    IconButton2,
    {
      component: "label",
      "aria-label": buttonAriaLabel,
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

// src/components/ui/fields/Sozial-Signin/Sozial-Button.tsx
import * as Mui from "@mui/material";
import * as React4 from "react";

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
  PasskeySVG: () => PasskeySVG,
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
      viewBox: "0 0 48 48",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid",
      ...getA11yProps(title),
      ...Props.SVGProps,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { fill: "#EA4335", d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" }),
        /* @__PURE__ */ jsx5("path", { fill: "#4285F4", d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" }),
        /* @__PURE__ */ jsx5("path", { fill: "#FBBC05", d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" }),
        /* @__PURE__ */ jsx5("path", { fill: "#34A853", d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" }),
        /* @__PURE__ */ jsx5("path", { fill: "none", d: "M0 0h48v48H0z" })
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
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...Props?.SVGProps,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("rect", { x: "1", y: "1", width: "9", height: "9", fill: "#f25022" }),
        /* @__PURE__ */ jsx5("rect", { x: "1", y: "11", width: "9", height: "9", fill: "#00a4ef" }),
        /* @__PURE__ */ jsx5("rect", { x: "11", y: "1", width: "9", height: "9", fill: "#7fba00" }),
        /* @__PURE__ */ jsx5("rect", { x: "11", y: "11", width: "9", height: "9", fill: "#ffb900" })
      ]
    }
  );
}
function AppleSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "19 15 18 21",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "currentColor",
      preserveAspectRatio: "xMidYMid meet",
      ...getA11yProps(title),
      ...Props?.SVGProps,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M28.2226562,20.3846154 C29.0546875,20.3846154 30.0976562,19.8048315 30.71875,19.0317864 C31.28125,18.3312142 31.6914062,17.352829 31.6914062,16.3744437 C31.6914062,16.2415766 31.6796875,16.1087095 31.65625,16 C30.7304687,16.0362365 29.6171875,16.640178 28.9492187,17.4494596 C28.421875,18.06548 27.9414062,19.0317864 27.9414062,20.0222505 C27.9414062,20.1671964 27.9648438,20.3121424 27.9765625,20.3604577 C28.0351562,20.3725366 28.1289062,20.3846154 28.2226562,20.3846154 Z M25.2929688,35 C26.4296875,35 26.9335938,34.214876 28.3515625,34.214876 C29.7929688,34.214876 30.109375,34.9758423 31.375,34.9758423 C32.6171875,34.9758423 33.4492188,33.792117 34.234375,32.6325493 C35.1132812,31.3038779 35.4765625,29.9993643 35.5,29.9389701 C35.4179688,29.9148125 33.0390625,28.9122695 33.0390625,26.0979021 C33.0390625,23.6579784 34.9140625,22.5588048 35.0195312,22.474253 C33.7773438,20.6382708 31.890625,20.5899555 31.375,20.5899555 C29.9804688,20.5899555 28.84375,21.4596313 28.1289062,21.4596313 C27.3554688,21.4596313 26.3359375,20.6382708 25.1289062,20.6382708 C22.8320312,20.6382708 20.5,22.5950413 20.5,26.2911634 C20.5,28.5861411 21.3671875,31.013986 22.4335938,32.5842339 C23.3476562,33.9129053 24.1445312,35 25.2929688,35 Z", fillRule: "nonzero" })
      ]
    }
  );
}
function GitHubSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      fill: "currentColor",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...Props?.SVGProps,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" })
      ]
    }
  );
}
function FacebookSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      fill: "currentColor",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...Props?.SVGProps,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" })
      ]
    }
  );
}
function LinkedInSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...Props?.SVGProps,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z", fill: "currentColor" }),
        /* @__PURE__ */ jsx5("path", { d: "M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z", fill: "currentColor" }),
        /* @__PURE__ */ jsx5("path", { d: "M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z", fill: "currentColor" }),
        /* @__PURE__ */ jsx5(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
}
function XSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      fill: "currentColor",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...Props?.SVGProps,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" })
      ]
    }
  );
}
function GitLabSVG({ size = 20, title, Props }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...Props?.SVGProps,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M22.6496 14.39L20.6027 8.06336L18.5734 1.78474C18.4582 1.4291 17.9557 1.4291 17.8405 1.78474L15.8112 8.06336H8.18879L6.15948 1.78474C6.04431 1.4291 5.54184 1.4291 5.42667 1.78474L3.39737 8.06336L1.35042 14.39C1.24795 14.7067 1.36067 15.0541 1.63196 15.2538L11.8715 22.7972C11.9476 22.8532 12.0524 22.8532 12.1285 22.7972L22.368 15.2538C22.6393 15.0541 22.752 14.7067 22.6496 14.39Z", fill: "#E24329" }),
        /* @__PURE__ */ jsx5("path", { d: "M22.6496 14.39L20.6027 8.06336H15.8112L18.5734 16.58L22.368 15.2538C22.6393 15.0541 22.752 14.7067 22.6496 14.39Z", fill: "#FC6D26" }),
        /* @__PURE__ */ jsx5("path", { d: "M12 16.58L15.8112 8.06336H8.1888L12 16.58Z", fill: "#FCA326" }),
        /* @__PURE__ */ jsx5("path", { d: "M1.35042 14.39L3.39737 8.06336H8.18879L5.42667 16.58L1.63196 15.2538C1.36067 15.0541 1.24795 14.7067 1.35042 14.39Z", fill: "#FC6D26" })
      ]
    }
  );
}
function DiscordSVG({ size = 20, title, Props }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      fill: "#7289DA",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...Props?.SVGProps,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" })
      ]
    }
  );
}
function SlackSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...getA11yProps(title),
      ...Props?.SVGProps,
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
function PasskeySVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ jsxs5(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      ...getA11yProps(title),
      ...Props?.SVGProps,
      children: [
        title ? /* @__PURE__ */ jsx5("title", { children: title }) : null,
        /* @__PURE__ */ jsx5("path", { d: "M120-160v-112q0-34 17.5-62.5T184-378q62-31 126-46.5T440-440q20 0 40 1.5t40 4.5q-4 58 21 109.5t73 84.5v80H120ZM760-40l-60-60v-186q-44-13-72-49.5T600-420q0-58 41-99t99-41q58 0 99 41t41 99q0 45-25.5 80T790-290l50 50-60 60 60 60-80 80ZM440-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm328.5 68.5Q780-423 780-440t-11.5-28.5Q757-480 740-480t-28.5 11.5Q700-457 700-440t11.5 28.5Q723-400 740-400t28.5-11.5Z" })
      ]
    }
  );
}

// src/components/ui/fields/Sozial-Signin/Providerconfigs.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
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
  slack: { label: "Slack", svg: /* @__PURE__ */ jsx6(SlackSVG, {}) },
  passkey: { label: "Passkey", svg: /* @__PURE__ */ jsx6(PasskeySVG, {}) }
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
function getProviderButtonStyles(provider, isDark = false) {
  const providerName = typeof provider === "object" ? provider.name.toLowerCase() : provider.toLowerCase();
  const styles = {
    google: isDark ? {
      button: {
        backgroundColor: "#131314",
        color: "#E3E3E3",
        border: "1px solid #8E918F",
        hoverBgColor: "#FFFFFF",
        hoverBorder: "rgba(0, 0, 0, 0.1)"
      },
      circle: {
        backgroundColor: "#131314",
        color: "#E3E3E3",
        border: "1px solid #8E918F",
        hoverBgColor: "#FFFFFF",
        hoverBorder: "rgba(0, 0, 0, 0.1)"
      }
    } : {
      button: {
        backgroundColor: "#E3E3E3",
        color: "#131314",
        border: "1px solid #131314",
        hoverBgColor: "#8E918F",
        hoverBorder: "1px solid rgba(17, 16, 16, 0.09)"
      },
      circle: {
        backgroundColor: "#E3E3E3",
        color: "#131314",
        border: "1px solid #E3E3E3",
        hoverBgColor: "rgb(64, 64, 70)",
        hoverBorder: "1px solid rgb(227, 227, 227)"
      }
    },
    apple: isDark ? {
      button: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        border: "1px solid #ffffff",
        hoverBgColor: "#F0F0F0",
        hoverBorder: "#F0F0F0",
        logoColor: "#000000",
        loadingcolor: "#000000"
      },
      circle: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        border: "1px solid #ffffff",
        hoverBgColor: "#F0F0F0",
        hoverBorder: "#F0F0F0",
        logoColor: "#000000",
        loadingcolor: "#000000"
      }
    } : {
      button: {
        backgroundColor: "#000000",
        color: "#FFFFFF",
        border: "1px solid #000000",
        hoverBgColor: "#1C1C1C",
        hoverBorder: "#1C1C1C",
        logoColor: "#FFFFFF",
        loadingcolor: "#FFFFFF"
      },
      circle: {
        backgroundColor: "#000000",
        color: "#FFFFFF",
        border: "1px solid #000000",
        hoverBgColor: "#1C1C1C",
        hoverBorder: "#1C1C1C",
        logoColor: "#FFFFFF",
        loadingcolor: "#FFFFFF"
      }
    },
    github: isDark ? {
      button: {
        backgroundColor: "rgb(43,45,49)",
        color: "#F2F5F3",
        border: "1px solid rgba(35, 41, 37, 0.24)",
        hoverBgColor: "rgb(25, 27, 25)",
        hoverBorder: "rgba(25, 27, 25, 0.32)",
        logoColor: "#FFFFFF"
      },
      circle: {
        backgroundColor: "rgb(43,45,49)",
        color: "#F2F5F3",
        border: "1px solid rgba(35, 41, 37, 0.24)",
        hoverBgColor: "rgb(25, 27, 25)",
        hoverBorder: "rgba(25, 27, 25, 0.32)",
        logoColor: "#FFFFFF"
      }
    } : {
      button: {
        backgroundColor: "#F2F5F3",
        color: "#232925",
        border: "1px solid rgba(240, 246, 252, 0.24)",
        hoverBgColor: "#cae4d3",
        hoverBorder: "rgba(240, 246, 252, 0.32)",
        logoColor: "#000000"
      },
      circle: {
        backgroundColor: "#F2F5F3",
        color: "#232925",
        border: "1px solid rgba(240, 246, 252, 0.24)",
        hoverBgColor: "#cae4d3",
        hoverBorder: "rgba(240, 246, 252, 0.32)",
        logoColor: "#000000"
      }
    },
    microsoft: isDark ? {
      button: {
        backgroundColor: "#2f2f2f",
        color: "#FFFFFF",
        border: "1px solid #8c8c8c",
        hoverBgColor: "#3B3B3B",
        hoverBorder: "#A0A0A0"
      },
      circle: {
        backgroundColor: "#2f2f2f",
        color: "#FFFFFF",
        border: "1px solid #8c8c8c",
        hoverBgColor: "#3B3B3B",
        hoverBorder: "#A0A0A0"
      }
    } : {
      button: {
        backgroundColor: "#FFFFFF",
        color: "#1F1F1F",
        border: "1px solid #F5F5F5",
        hoverBgColor: "#f7f1f1",
        hoverBorder: "#f3e3e3"
      },
      circle: {
        backgroundColor: "#FFFFFF",
        color: "#1F1F1F",
        border: "1px solid #F5F5F5",
        hoverBgColor: "#f7f1f1",
        hoverBorder: "#f3e3e3"
      }
    },
    facebook: {
      button: {
        backgroundColor: "#1877F2",
        color: "#FFFFFF",
        border: "1px solid #1877F2",
        hoverBgColor: "#4287e2",
        hoverBorder: "#4287e2",
        logoColor: "#FFFFFF"
      },
      circle: {
        backgroundColor: "#1877F2",
        color: "#FFFFFF",
        border: "1px solid #1877F2",
        hoverBgColor: "#4287e2",
        hoverBorder: "#4287e2",
        logoColor: "#ffffff"
      }
    },
    linkedin: {
      button: {
        backgroundColor: "#0A66C2",
        color: "#FFFFFF",
        border: "1px solid #0A66C2",
        hoverBgColor: "#004182",
        hoverBorder: "#004182",
        logoColor: "#FFFFFF",
        loadingcolor: "#FFFFFF"
      },
      circle: {
        backgroundColor: "#0A66C2",
        color: "#FFFFFF",
        border: "1px solid #0A66C2",
        hoverBgColor: "#004182",
        hoverBorder: "#004182",
        logoColor: "#FFFFFF",
        loadingcolor: "#FFFFFF"
      }
    },
    x: isDark ? {
      button: {
        backgroundColor: "#000000",
        color: "#FFFFFF",
        border: "1px solid rgba(255, 255, 255, 0.22)",
        hoverBgColor: "#272727",
        hoverBorder: "rgba(255, 255, 255, 0.3)",
        logoColor: "#FFFFFF"
      },
      circle: {
        backgroundColor: "#000000",
        color: "#FFFFFF",
        border: "1px solid rgba(255, 255, 255, 0.22)",
        hoverBgColor: "#272727",
        hoverBorder: "rgba(255, 255, 255, 0.3)",
        logoColor: "#FFFFFF"
      }
    } : {
      button: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        border: "1px solid rgba(0, 0, 0, 0.18)",
        hoverBgColor: "#F2F2F2",
        hoverBorder: "rgba(0, 0, 0, 0.26)",
        logoColor: "#000000"
      },
      circle: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        border: "1px solid rgba(0, 0, 0, 0.18)",
        hoverBgColor: "#F2F2F2",
        hoverBorder: "rgba(0, 0, 0, 0.26)",
        logoColor: "#000000"
      }
    },
    gitlab: isDark ? {
      button: {
        backgroundColor: "#171321",
        color: "#FFFFFF",
        border: "1px solid #FC6D26",
        hoverBgColor: "rgb(26, 23, 23)",
        hoverBorder: "rgba(226, 67, 41, 0.8)",
        loadingcolor: "#FC6D26"
      },
      circle: {
        backgroundColor: "#171321",
        color: "#FFFFFF",
        border: "1px solid #FC6D26",
        hoverBgColor: "rgb(26, 23, 23)",
        hoverBorder: "rgba(226, 67, 41, 0.8)",
        loadingcolor: "#FC6D26"
      }
    } : {
      button: {
        backgroundColor: "#FFFFFF",
        color: "#FC6D26",
        border: "1px solid #FC6D26",
        hoverBgColor: "#F5F5F5",
        hoverBorder: "#FC6D26",
        loadingcolor: "#FC6D26"
      },
      circle: {
        backgroundColor: "#FFFFFF",
        color: "#FC6D26",
        border: "1px solid #FC6D26",
        hoverBgColor: "#F5F5F5",
        hoverBorder: "#FC6D26",
        loadingcolor: "#FC6D26"
      }
    },
    discord: isDark ? {
      button: {
        backgroundColor: "#1c1d23",
        color: "#FFFFFF",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        hoverBgColor: "#23252e",
        hoverBorder: "rgba(255, 255, 255, 0.16)"
      },
      circle: {
        backgroundColor: "#1c1d23",
        color: "#FFFFFF",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        hoverBgColor: "#23252e",
        hoverBorder: "rgba(255, 255, 255, 0.16)"
      }
    } : {
      button: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        hoverBgColor: "#F4F5F7",
        hoverBorder: "rgba(17, 18, 19, 0.16)"
      },
      circle: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        hoverBgColor: "#F4F5F7",
        hoverBorder: "rgba(17, 18, 19, 0.16)"
      }
    },
    slack: isDark ? {
      button: {
        backgroundColor: "#1c1d23",
        color: "#FFFFFF",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        hoverBgColor: "#23252e",
        hoverBorder: "rgba(255, 255, 255, 0.16)"
      },
      circle: {
        backgroundColor: "#1c1d23",
        color: "#FFFFFF",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        hoverBgColor: "#23252e",
        hoverBorder: "rgba(255, 255, 255, 0.16)"
      }
    } : {
      button: {
        backgroundColor: "#FFFFFF",
        color: "#1F1F1F",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        hoverBgColor: "#F8F8F8",
        hoverBorder: "rgba(0, 0, 0, 0.18)"
      },
      circle: {
        backgroundColor: "#FFFFFF",
        color: "#1F1F1F",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        hoverBgColor: "#F8F8F8",
        hoverBorder: "rgba(0, 0, 0, 0.18)"
      }
    },
    passkey: isDark ? {
      button: {
        backgroundColor: "#1F222B",
        color: "#F8F5F1",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        hoverBgColor: "#2A2F3A",
        hoverBorder: "rgba(255, 255, 255, 0.24)",
        loadingcolor: "#F8F5F1",
        logoColor: "#F8F5F1"
      },
      circle: {
        backgroundColor: "#1F222B",
        color: "#F8F5F1",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        hoverBgColor: "#2A2F3A",
        hoverBorder: "rgba(255, 255, 255, 0.24)",
        loadingcolor: "#F8F5F1",
        logoColor: "#F8F5F1"
      }
    } : {
      button: {
        backgroundColor: "#F4ECE4",
        color: "#2D1C12",
        border: "1px solid rgba(157, 112, 82, 0.32)",
        hoverBgColor: "#EDE1D5",
        hoverBorder: "rgba(157, 112, 82, 0.48)",
        loadingcolor: "#2D1C12",
        logoColor: "#2D1C12"
      },
      circle: {
        backgroundColor: "#F4ECE4",
        color: "#2D1C12",
        border: "1px solid rgba(157, 112, 82, 0.32)",
        hoverBgColor: "#EDE1D5",
        hoverBorder: "rgba(157, 112, 82, 0.48)",
        loadingcolor: "#2D1C12",
        logoColor: "#2D1C12"
      }
    }
  };
  return styles[providerName] || styles.google;
}

// src/components/ui/fields/Sozial-Signin/Sozial-Button.tsx
import { Fragment as Fragment3, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var BASE_BUTTON_WIDTH = 183;
function resolveButtonWidth(extrawidth, maxWidth) {
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
  size
}) {
  const providerPresentation = resolveProviderPresentation(Provider);
  const providerName = typeof Provider === "string" ? Provider : Provider;
  const isPasskeyProvider = providerName === "passkey";
  const theme = Mui.useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const providerStyles = getProviderButtonStyles(Provider, isDarkMode);
  const variantStyles = variant === "circle" ? providerStyles.circle : providerStyles.button;
  const logoColor = typeof Provider === "object" ? Provider.logoColor ?? Provider.color.logoColor ?? variantStyles.logoColor : variantStyles.logoColor;
  const buttonWidth = resolveButtonWidth(maxWidth);
  const iconSize = isPasskeyProvider ? 24 : 20;
  const iconNode = React4.isValidElement(providerPresentation.svg) ? React4.cloneElement(providerPresentation.svg, {
    Props: {
      SVGProps: {
        ...Props?.SVGProps?.Props?.SVGProps ?? {},
        ...logoColor ? { color: logoColor } : {}
      }
    }
  }) : providerPresentation.svg;
  if (variant == "circle") {
    return /* @__PURE__ */ jsx7(Fragment3, { children: /* @__PURE__ */ jsx7(
      Mui.IconButton,
      {
        sx: {
          backgroundColor: providerStyles.circle.backgroundColor,
          border: providerStyles.circle.border,
          color: providerStyles.circle.color,
          "&:hover": {
            backgroundColor: providerStyles.circle.hoverBgColor,
            borderColor: providerStyles.circle.hoverBorder
          },
          "&.Mui-disabled": {
            backgroundColor: providerStyles.circle.backgroundColor,
            border: providerStyles.circle.border,
            color: providerStyles.circle.color,
            opacity: 0.75
          },
          padding: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        },
        size,
        ...Props?.ButtonProps,
        onClick: OnClick,
        disabled: disabled || loading,
        children: loading ? /* @__PURE__ */ jsx7(
          Mui.Box,
          {
            sx: {
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: /* @__PURE__ */ jsx7(
              Mui.CircularProgress,
              {
                size: `${iconSize}px`,
                sx: {
                  color: `${providerStyles.circle.loadingcolor || providerStyles.circle.color} !important`
                }
              }
            )
          }
        ) : /* @__PURE__ */ jsx7(
          Mui.Box,
          {
            sx: {
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& > svg": {
                width: "100%",
                height: "100%",
                display: "block"
              }
            },
            children: iconNode
          }
        )
      }
    ) });
  } else {
    return /* @__PURE__ */ jsx7(Fragment3, { children: /* @__PURE__ */ jsxs6(
      Mui.Button,
      {
        ...Props?.ButtonProps,
        loadingIndicator: /* @__PURE__ */ jsx7(
          Mui.Box,
          {
            sx: {
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: /* @__PURE__ */ jsx7(Mui.CircularProgress, { sx: { color: providerStyles.button.loadingcolor || providerStyles.button.color }, size: `${iconSize}px` })
          }
        ),
        loadingPosition: "end",
        variant: "outlined",
        startIcon: /* @__PURE__ */ jsx7(
          Mui.Box,
          {
            sx: {
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& > svg": {
                width: "100%",
                height: "100%",
                display: "block"
              }
            },
            children: iconNode
          }
        ),
        sx: {
          border: providerStyles.button.border,
          borderRadius: "20px",
          backgroundColor: providerStyles.button.backgroundColor,
          height: "40px",
          width: buttonWidth,
          minWidth: "183px",
          maxWidth: "400px",
          justifyContent: "flex-start",
          color: providerStyles.button.color,
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: "0.25px",
          padding: 0,
          "&:hover": {
            backgroundColor: providerStyles.button.hoverBgColor,
            borderColor: providerStyles.button.hoverBorder
          },
          "&.Mui-disabled": {
            backgroundColor: providerStyles.button.backgroundColor,
            border: providerStyles.button.border,
            color: providerStyles.button.color,
            opacity: 0.75
          },
          "&.Mui-disabled .MuiCircularProgress-root": {
            color: `${providerStyles.button.loadingcolor || providerStyles.button.color} !important`
          },
          "& .MuiButton-startIcon": {
            marginLeft: "11px",
            marginRight: "11px",
            display: "flex",
            alignItems: "center"
          },
          "& .MuiButton-endIcon": {
            marginLeft: "11px",
            marginRight: "11px",
            display: "flex",
            alignItems: "center"
          }
        },
        loading,
        onClick: OnClick,
        disabled: disabled || loading,
        children: [
          " ",
          /* @__PURE__ */ jsx7(Mui.Box, { sx: {
            paddingRight: "12px"
          }, children: children ?? `Sign in with ${providerPresentation.label}` })
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
  resolveButtonWidth,
  useNotification
};
