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
  AvatarUpload: () => AvatarUpload,
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
  const [error, setError] = React2.useState(null);
  const { notify } = useNotification();
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
  const handleClickAway = () => {
    setOpen(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.ClickAwayListener, { onClickAway: handleClickAway, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_material2.Button,
      {
        onClick: Clicked,
        loading: Loading,
        color: destructive || error ? "error" : "primary",
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

// src/components/ui/fields/Password/Passwordfield.tsx
var import_material3 = require("@mui/material");
var import_icons_material = require("@mui/icons-material");
var React3 = __toESM(require("react"));

// src/components/ui/fields/Password/Passwordstrenght.tsx
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
  const variationCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
    Boolean
  ).length;
  if (variationCount <= 1 && len > 5) {
    score -= 20;
  }
  return Math.max(0, Math.min(100, score));
}

// src/components/ui/fields/Password/Passwordfield.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function Passwordfield({
  loading = false,
  children,
  showstrength = false,
  error = false,
  onChange,
  value,
  Muiprops,
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
  const passwordValue = typeof value === "string" ? value : internalPassword;
  const strength = getPasswordStrength(passwordValue);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_material3.FormControl, { sx: { m: 1, width: "25ch" }, variant: "outlined", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material3.InputLabel, { htmlFor: "Passwordfield", children }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_material3.Input,
      {
        "aria-label": "Password field",
        ...Muiprops,
        disableUnderline: true,
        inputComponent: "input",
        id: "Passwordfield",
        type: showPassword ? "text" : "password",
        value: passwordValue,
        onChange: (event) => {
          setInternalPassword(event.target.value);
          onChange?.(event);
        },
        endAdornment: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material3.InputAdornment, { position: "end", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_material3.IconButton,
          {
            "aria-label": showPassword ? "hide the password" : "display the password",
            onClick: () => setShowPassword((prev) => !prev),
            onMouseDown: handleMouseDownPassword,
            onMouseUp: handleMouseUpPassword,
            edge: "end",
            children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons_material.VisibilityOff, {}) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons_material.Visibility, {})
          }
        ) }),
        name: "Password",
        error
      }
    ),
    !showstrength ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material3.Divider, {}) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material3.LinearProgress, { variant: "determinate", value: strength })
  ] }) });
}

// src/components/ui/fields/Avatarupload.tsx
var import_material4 = require("@mui/material");
var import_PhotoCamera = __toESM(require("@mui/icons-material/PhotoCamera"));
var import_jsx_runtime4 = require("react/jsx-runtime");
function AvatarUpload({ image, onUpload, icon }) {
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
  AvatarUpload,
  NotificationProvider,
  Passwordfield,
  useNotification
});
