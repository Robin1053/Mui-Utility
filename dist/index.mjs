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
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import * as React3 from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
function Passwordfield({
  loading = false,
  InputProps,
  ...props
}) {
  const [showPassword, setShowPassword] = React3.useState(false);
  return /* @__PURE__ */ jsx3(
    TextField,
    {
      ...props,
      type: showPassword ? "text" : "password",
      disabled: loading,
      slotProps: {
        input: {
          ...InputProps,
          endAdornment: /* @__PURE__ */ jsx3(InputAdornment, { position: "end", children: /* @__PURE__ */ jsx3(
            IconButton,
            {
              onClick: () => setShowPassword((prev) => !prev),
              edge: "end",
              tabIndex: props.tabIndex,
              children: showPassword ? /* @__PURE__ */ jsx3(VisibilityOff, {}) : /* @__PURE__ */ jsx3(Visibility, {})
            }
          ) })
        }
      }
    }
  );
}

// src/components/ui/fields/Avatarupload.tsx
import { Avatar, Badge, IconButton as IconButton2 } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function Avatarupload({ image, onUpload, icon }) {
  return /* @__PURE__ */ jsxs3(IconButton2, { component: "label", children: [
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
  Avatarupload,
  NotificationProvider,
  Passwordfield,
  useNotification
};
