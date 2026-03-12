// src/components/ui/ActionButton/ActionButton.tsx
import {
  Button,
  Dialog,
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
  DialogProps = {},
  ButtonProps = {},
  destructive = false,
  children,
  Notification = {}
}) {
  const [Open, setOpen] = React2.useState(false);
  const [Loading, setLoading] = React2.useState(false);
  const [Error, setError] = React2.useState(false);
  const { notify } = useNotification();
  async function Clicked() {
    if (requireAreYouSure) {
      setOpen(true);
    } else {
      await executeAction();
    }
  }
  async function executeAction() {
    setLoading(true);
    setError(false);
    try {
      await action();
      if (Notification.useNotification === true) {
        notify({ message: Notification.successmessage, type: "success" });
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      setOpen(false);
      if (Notification.useNotification === true) {
        notify({ type: "error", message: Notification.errormessage });
      }
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }
  const handleClickAway = () => {
    setOpen(false);
  };
  return /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsx2(ClickAwayListener, { onClickAway: handleClickAway, children: /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx2(
      Button,
      {
        onClick: Clicked,
        loading: Loading,
        disabled: Loading,
        color: destructive || Error ? "error" : "primary",
        startIcon: icon,
        sx: ButtonProps.sx,
        variant: "outlined",
        children
      }
    ),
    /* @__PURE__ */ jsx2(Dialogfunction, {})
  ] }) }) });
  function Dialogfunction() {
    return /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsxs2(Dialog, { open: Open, onClose: () => setOpen(false), sx: DialogProps.sx, children: [
      /* @__PURE__ */ jsx2(DialogTitle, { children: DialogProps.dialogTitle || "Confirm Action" }),
      /* @__PURE__ */ jsx2(DialogContent, { children: /* @__PURE__ */ jsx2(DialogContentText, { children: DialogProps.dialogContent || "Are you sure you want to do this?" }) }),
      /* @__PURE__ */ jsxs2(DialogActions, { children: [
        /* @__PURE__ */ jsx2(
          Button,
          {
            onClick: () => setOpen(false),
            color: "error",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx2(
          Button,
          {
            onClick: () => executeAction(),
            color: destructive ? "error" : "primary",
            children: DialogProps.confirmText || "Yes"
          }
        )
      ] })
    ] }) });
  }
}

// src/components/ui/fields/Passwordfield.tsx
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
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function Passwordfield({
  loading = false,
  children,
  showstrength = false,
  error = false,
  onChange,
  value,
  ...props
}) {
  const [showPassword, setShowPassword] = React3.useState(false);
  const [internalPassword, setInternalPassword] = React3.useState("");
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  function getPasswordStrength(password) {
    if (!password) return 0;
    let score = 0;
    const len = password.length;
    if (len > 12) score += 40;
    else if (len > 8) score += 25;
    else if (len > 5) score += 10;
    else score += 5;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    if (hasUpper) score += 15;
    if (hasLower) score += 15;
    if (hasNumber) score += 15;
    if (hasSpecial) score += 15;
    const variationCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    if (variationCount <= 1 && len > 5) {
      score -= 20;
    }
    return Math.max(0, Math.min(100, score));
  }
  const passwordValue = typeof value === "string" ? value : internalPassword;
  const strength = getPasswordStrength(passwordValue);
  return /* @__PURE__ */ jsx3(Fragment2, { children: /* @__PURE__ */ jsxs3(FormControl, { sx: { m: 1, width: "25ch" }, variant: "outlined", children: [
    /* @__PURE__ */ jsx3(InputLabel, { htmlFor: "Passwordfield", children }),
    /* @__PURE__ */ jsx3(
      Input,
      {
        ...props,
        disableUnderline: true,
        inputComponent: "input",
        id: "Passwordfield",
        type: showPassword ? "text" : "password",
        value,
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
    !showstrength ? /* @__PURE__ */ jsx3(Divider, {}) : /* @__PURE__ */ jsx3(LinearProgress, { variant: "determinate", value: strength })
  ] }) });
}

// src/components/ui/fields/Avatarupload.tsx
import { Avatar, Badge, IconButton as IconButton2 } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function AvatarUpload({ image, onUpload, icon }) {
  return /* @__PURE__ */ jsxs4(IconButton2, { component: "label", children: [
    /* @__PURE__ */ jsx4(
      "input",
      {
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
        overlap: "circular",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        badgeContent: icon || /* @__PURE__ */ jsx4(PhotoCameraIcon, { sx: { fontSize: 18 } }),
        children: /* @__PURE__ */ jsx4(
          Avatar,
          {
            src: image,
            sx: { width: 128, height: 128 }
          }
        )
      }
    )
  ] });
}
export {
  ActionButton,
  AvatarUpload,
  NotificationProvider,
  Passwordfield,
  useNotification
};
