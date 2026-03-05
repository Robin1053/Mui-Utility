// src/components/ui/ActionButton/ActionButton.tsx
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
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
  const [open, setopen] = React2.useState(false);
  const [loading, setloading] = React2.useState(false);
  const [error, seterror] = React2.useState(false);
  const { notify } = useNotification();
  async function Clicked() {
    if (requireAreYouSure) {
      setopen(true);
    } else {
      await executeAction();
    }
  }
  async function executeAction() {
    setloading(true);
    seterror(false);
    try {
      await action();
      if (Notification.useNotification === true) {
        notify({ message: Notification.successmessage, type: "success" });
      }
    } catch (error2) {
      seterror(true);
      if (Notification.useNotification === true) {
        notify({ type: "error", message: Notification.errormessage });
      }
    } finally {
      setopen(false);
      setloading(false);
    }
  }
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx2(
      Button,
      {
        onClick: Clicked,
        loading,
        disabled: loading,
        color: destructive || error ? "error" : "primary",
        startIcon: loading ? /* @__PURE__ */ jsx2(CircularProgress, {}) : icon,
        sx: ButtonProps.sx,
        variant: "outlined",
        children
      }
    ),
    /* @__PURE__ */ jsx2(Dialogfunction, {})
  ] });
  function Dialogfunction() {
    return /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsxs2(Dialog, { open, onClose: () => setopen(false), sx: DialogProps.sx, children: [
      /* @__PURE__ */ jsx2(DialogTitle, { children: DialogProps.dialogTitle || "Confirm Action" }),
      /* @__PURE__ */ jsx2(DialogContent, { children: /* @__PURE__ */ jsx2(DialogContentText, { children: DialogProps.dialogContent || "Are you sure you want to do this?" }) }),
      /* @__PURE__ */ jsxs2(DialogActions, { children: [
        /* @__PURE__ */ jsx2(
          Button,
          {
            onClick: () => setopen(false),
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
export {
  ActionButton,
  NotificationProvider,
  useNotification
};
