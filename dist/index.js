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
  Avatarupload: () => Avatarupload,
  NotificationProvider: () => NotificationProvider,
  Passwordfield: () => Passwordfield,
  useNotification: () => useNotification
});
module.exports = __toCommonJS(index_exports);

// src/components/ui/ActionButton/ActionButton.tsx
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

// src/components/ui/ActionButton/ActionButton.tsx
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
  const [Open, setOpen] = React2.useState(false);
  const [Loading, setLoading] = React2.useState(false);
  const [Error2, setError] = React2.useState(false);
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.ClickAwayListener, { onClickAway: handleClickAway, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_material2.Button,
      {
        onClick: Clicked,
        loading: Loading,
        disabled: Loading,
        color: destructive || Error2 ? "error" : "primary",
        startIcon: icon,
        sx: ButtonProps.sx,
        variant: "outlined",
        children
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Dialogfunction, {})
  ] }) }) });
  function Dialogfunction() {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_material2.Dialog, { open: Open, onClose: () => setOpen(false), sx: DialogProps.sx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.DialogTitle, { children: DialogProps.dialogTitle || "Confirm Action" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.DialogContentText, { children: DialogProps.dialogContent || "Are you sure you want to do this?" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_material2.DialogActions, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_material2.Button,
          {
            onClick: () => setOpen(false),
            color: "error",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_material2.Button,
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
var import_material3 = require("@mui/material");
var import_icons_material = require("@mui/icons-material");
var React3 = __toESM(require("react"));
var import_jsx_runtime3 = require("react/jsx-runtime");
function Passwordfield({
  loading = false,
  InputProps,
  ...props
}) {
  const [showPassword, setShowPassword] = React3.useState(false);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_material3.TextField,
    {
      ...props,
      type: showPassword ? "text" : "password",
      disabled: loading,
      slotProps: {
        input: {
          ...InputProps,
          endAdornment: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material3.InputAdornment, { position: "end", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            import_material3.IconButton,
            {
              onClick: () => setShowPassword((prev) => !prev),
              edge: "end",
              tabIndex: props.tabIndex,
              children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons_material.VisibilityOff, {}) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons_material.Visibility, {})
            }
          ) })
        }
      }
    }
  );
}

// src/components/ui/fields/Avatarupload.tsx
var import_material4 = require("@mui/material");
var import_PhotoCamera = __toESM(require("@mui/icons-material/PhotoCamera"));
var import_jsx_runtime4 = require("react/jsx-runtime");
function Avatarupload({ image, onUpload, icon }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_material4.IconButton, { component: "label", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_material4.Badge,
      {
        overlap: "circular",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        badgeContent: icon || /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_PhotoCamera.default, { sx: { fontSize: 18 } }),
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          import_material4.Avatar,
          {
            src: image,
            sx: { width: 128, height: 128 }
          }
        )
      }
    )
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionButton,
  Avatarupload,
  NotificationProvider,
  Passwordfield,
  useNotification
});
