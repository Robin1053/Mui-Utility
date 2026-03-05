var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ActionButton: () => ActionButton,
  NotificationProvider: () => NotificationProvider,
  useNotification: () => useNotification
});
module.exports = __toCommonJS(index_exports);

// src/components/ActionButton/ActionButton.tsx
var import_material2 = require("@mui/material");
var React2 = __toESM(require("react"));

// src/components/ui/Notifications.tsx
var import_react = require("react");
var import_material = require("@mui/material");
var import_jsx_runtime = require("react/jsx-runtime");
var NotificationContext = (0, import_react.createContext)({
  notify: () => {
  }
});
var useNotification = () => (0, import_react.useContext)(NotificationContext);
var NotificationProvider = ({ children }) => {
  const [open, setOpen] = (0, import_react.useState)(false);
  const [toast, setToast] = (0, import_react.useState)({
    message: "",
    type: "info"
  });
  const notify = ({ message, type }) => {
    setToast({ message, type });
    setOpen(true);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NotificationContext.Provider, { value: { notify }, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_material.Snackbar,
      {
        open,
        autoHideDuration: 4e3,
        onClose: () => setOpen(false),
        anchorOrigin: { vertical: "bottom", horizontal: "left" },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_material.Alert,
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

// src/components/ActionButton/ActionButton.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_material2.Button,
      {
        onClick: Clicked,
        loading,
        disabled: loading,
        color: destructive || error ? "error" : "primary",
        startIcon: loading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.CircularProgress, {}) : icon,
        sx: ButtonProps.sx,
        children
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Dialogfunction, {})
  ] });
  function Dialogfunction() {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_material2.Dialog, { open, onClose: () => setopen(false), sx: DialogProps.sx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.DialogTitle, { children: DialogProps.dialogTitle }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.DialogContentText, { children: DialogProps.dialogContent }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_material2.DialogActions, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_material2.Button,
          {
            onClick: () => setopen(false),
            color: "error",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_material2.Button,
          {
            onClick: () => executeAction(),
            color: destructive ? "error" : "primary",
            children: DialogProps.confirmText
          }
        )
      ] })
    ] }) });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionButton,
  NotificationProvider,
  useNotification
});
