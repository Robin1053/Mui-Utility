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
  SVGs: () => SVGs_exports,
  SocialButton: () => SocialButton,
  resolveButtonWidth: () => resolveButtonWidth,
  useNotification: () => useNotification
});
module.exports = __toCommonJS(index_exports);

// src/components/ui/fields/ActionButton/ActionButton.tsx
var import_material2 = require("@mui/material");
var React2 = __toESM(require("react"));

// src/components/ui/Notefication/Notifications.tsx
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

// src/components/ui/fields/ActionButton/ActionButton.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.ClickAwayListener, { onClickAway: handleClickAway, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_material2.Button,
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
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Dialogfunction, {}),
    error && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { id: "action-error-desc", style: { display: "none" }, children: "Aktion fehlgeschlagen" })
  ] }) }) });
  function Dialogfunction() {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      import_material2.Dialog,
      {
        ...Props.DialogProps,
        open: Open,
        onClose: () => setOpen(false),
        sx: Props.DialogProps.sx,
        "aria-labelledby": "dialog-title",
        "aria-describedby": "dialog-description",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.DialogTitle, { id: "dialog-title", children: Dialog.dialogTitle || "Confirm Action" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.DialogContentText, { id: "dialog-description", children: Dialog.dialogContent || "Are you sure you want to do this?" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_material2.DialogActions, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.Button, { onClick: () => setOpen(false), color: "error", children: "Cancel" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              import_material2.Button,
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
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_material3.FormControl, { sx: { m: 1, width: "25ch" }, variant: "outlined", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material3.InputLabel, { htmlFor: "Passwordfield", children }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_material3.Input,
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
    !showstrength ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material3.Divider, {}) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_material3.LinearProgress,
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
var import_material4 = require("@mui/material");
var import_PhotoCamera = __toESM(require("@mui/icons-material/PhotoCamera"));
var import_jsx_runtime4 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    import_material4.IconButton,
    {
      component: "label",
      "aria-label": buttonAriaLabel,
      ...Props.IconButtonProps,
      sx: Props.IconButtonProps?.sx,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          import_material4.Badge,
          {
            ...Props.BadgeProps,
            sx: Props.BadgeProps?.sx,
            overlap: "circular",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
            badgeContent: icon || /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_PhotoCamera.default, { sx: { fontSize: 18 } }),
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              import_material4.Avatar,
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
var Mui = __toESM(require("@mui/material"));
var React4 = __toESM(require("react"));

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
var import_jsx_runtime5 = require("react/jsx-runtime");
function getA11yProps(title) {
  return title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
}
function GoogleSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
        title ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("title", { children: title }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { fill: "#EA4335", d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { fill: "#4285F4", d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { fill: "#FBBC05", d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { fill: "#34A853", d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { fill: "none", d: "M0 0h48v48H0z" })
      ]
    }
  );
}
function MicrosoftSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
        title ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("title", { children: title }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "1", y: "1", width: "9", height: "9", fill: "#f25022" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "1", y: "11", width: "9", height: "9", fill: "#00a4ef" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "11", y: "1", width: "9", height: "9", fill: "#7fba00" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "11", y: "11", width: "9", height: "9", fill: "#ffb900" })
      ]
    }
  );
}
function AppleSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "-1.5 0 20 20",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "currentColor",
      ...getA11yProps(title),
      ...Props?.SVGProps,
      children: [
        title ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("title", { children: title }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { id: "Dribbble-Light-Preview", transform: "translate(-102.000000, -7439.000000)", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { id: "icons", transform: "translate(56.000000, 160.000000)", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485" }) }) }) })
      ]
    }
  );
}
function GitHubSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
        title ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("title", { children: title }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" })
      ]
    }
  );
}
function FacebookSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
        title ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("title", { children: title }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { transform: "translate(0.000000,2084.000000) scale(0.100000,-0.100000)", fill: "currentColor", stroke: "none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M9920 20820 c-1333 -71 -2554 -361 -3730 -885 -2855 -1272 -4991\r\n-3759 -5815 -6770 -259 -946 -378 -1902 -362 -2910 8 -467 28 -753 83 -1185\r\n161 -1266 567 -2515 1180 -3638 1018 -1860 2569 -3362 4459 -4317 621 -313\r\n1278 -566 1930 -743 99 -27 192 -52 208 -56 l27 -6 0 3460 0 3460 -1072 2\r\n-1073 3 0 1590 0 1590 1071 3 1072 2 5 928 c5 900 9 1030 43 1392 170 1832\r\n900 3055 2205 3695 587 288 1283 457 2159 525 228 18 824 24 1060 11 571 -32\r\n1204 -106 1630 -191 107 -22 209 -43 225 -48 l30 -8 3 -1449 2 -1448 -62 6\r\nc-293 30 -1331 42 -1583 19 -656 -60 -1086 -223 -1390 -527 -229 -229 -378\r\n-530 -459 -928 -64 -311 -76 -528 -76 -1329 l0 -648 1700 0 c935 0 1700 -4\r\n1700 -8 0 -5 -130 -719 -290 -1587 -159 -868 -290 -1582 -290 -1587 0 -4 -634\r\n-8 -1410 -8 l-1410 0 0 -3575 c0 -2853 3 -3575 13 -3575 33 0 447 64 616 95\r\n1630 299 3167 988 4491 2014 558 432 1139 991 1596 1537 413 491 805 1062\r\n1128 1639 197 352 470 936 617 1323 706 1848 872 3861 478 5815 -457 2266\r\n-1694 4356 -3469 5858 -1445 1222 -3164 2020 -5015 2329 -313 52 -664 92\r\n-1040 120 -183 14 -987 21 -1185 10z" }) }),
        "        "
      ]
    }
  );
}
function LinkedInSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
        title ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("title", { children: title }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z", fill: "currentColor" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z", fill: "currentColor" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z", fill: "currentColor" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
        title ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("title", { children: title }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" })
      ]
    }
  );
}
function GitLabSVG({ size = 20, title, Props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
        title ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("title", { children: title }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M22.6496 14.39L20.6027 8.06336L18.5734 1.78474C18.4582 1.4291 17.9557 1.4291 17.8405 1.78474L15.8112 8.06336H8.18879L6.15948 1.78474C6.04431 1.4291 5.54184 1.4291 5.42667 1.78474L3.39737 8.06336L1.35042 14.39C1.24795 14.7067 1.36067 15.0541 1.63196 15.2538L11.8715 22.7972C11.9476 22.8532 12.0524 22.8532 12.1285 22.7972L22.368 15.2538C22.6393 15.0541 22.752 14.7067 22.6496 14.39Z", fill: "#E24329" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M22.6496 14.39L20.6027 8.06336H15.8112L18.5734 16.58L22.368 15.2538C22.6393 15.0541 22.752 14.7067 22.6496 14.39Z", fill: "#FC6D26" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M12 16.58L15.8112 8.06336H8.1888L12 16.58Z", fill: "#FCA326" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M1.35042 14.39L3.39737 8.06336H8.18879L5.42667 16.58L1.63196 15.2538C1.36067 15.0541 1.24795 14.7067 1.35042 14.39Z", fill: "#FC6D26" })
      ]
    }
  );
}
function DiscordSVG({ size = 20, title, Props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
        title ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("title", { children: title }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" })
      ]
    }
  );
}
function SlackSVG({ size = 20, title, Props = { SVGProps: {} } }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
        title ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("title", { children: title }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M26.5002 14.9996C27.8808 14.9996 29 13.8804 29 12.4998C29 11.1192 27.8807 10 26.5001 10C25.1194 10 24 11.1193 24 12.5V14.9996H26.5002ZM19.5 14.9996C20.8807 14.9996 22 13.8803 22 12.4996V5.5C22 4.11929 20.8807 3 19.5 3C18.1193 3 17 4.11929 17 5.5V12.4996C17 13.8803 18.1193 14.9996 19.5 14.9996Z", fill: "#2EB67D" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M5.49979 17.0004C4.11919 17.0004 3 18.1196 3 19.5002C3 20.8808 4.1193 22 5.49989 22C6.8806 22 8 20.8807 8 19.5V17.0004H5.49979ZM12.5 17.0004C11.1193 17.0004 10 18.1197 10 19.5004V26.5C10 27.8807 11.1193 29 12.5 29C13.8807 29 15 27.8807 15 26.5V19.5004C15 18.1197 13.8807 17.0004 12.5 17.0004Z", fill: "#E01E5A" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M17.0004 26.5002C17.0004 27.8808 18.1196 29 19.5002 29C20.8808 29 22 27.8807 22 26.5001C22 25.1194 20.8807 24 19.5 24L17.0004 24L17.0004 26.5002ZM17.0004 19.5C17.0004 20.8807 18.1197 22 19.5004 22L26.5 22C27.8807 22 29 20.8807 29 19.5C29 18.1193 27.8807 17 26.5 17L19.5004 17C18.1197 17 17.0004 18.1193 17.0004 19.5Z", fill: "#ECB22E" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M14.9996 5.49979C14.9996 4.11919 13.8804 3 12.4998 3C11.1192 3 10 4.1193 10 5.49989C10 6.88061 11.1193 8 12.5 8L14.9996 8L14.9996 5.49979ZM14.9996 12.5C14.9996 11.1193 13.8803 10 12.4996 10L5.5 10C4.11929 10 3 11.1193 3 12.5C3 13.8807 4.11929 15 5.5 15L12.4996 15C13.8803 15 14.9996 13.8807 14.9996 12.5Z", fill: "#36C5F0" })
      ]
    }
  );
}

// src/components/ui/fields/Sozial-Signin/Providerconfigs.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var BUILT_IN_PROVIDER_PRESENTATION = {
  google: { label: "Google", svg: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(GoogleSVG, {}) },
  microsoft: { label: "Microsoft", svg: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(MicrosoftSVG, {}) },
  apple: { label: "Apple", svg: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(AppleSVG, {}) },
  github: { label: "GitHub", svg: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(GitHubSVG, {}) },
  facebook: { label: "Facebook", svg: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FacebookSVG, {}) },
  linkedin: { label: "LinkedIn", svg: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(LinkedInSVG, {}) },
  x: { label: "X", svg: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(XSVG, {}) },
  gitlab: { label: "GitLab", svg: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(GitLabSVG, {}) },
  discord: { label: "Discord", svg: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(DiscordSVG, {}) },
  slack: { label: "Slack", svg: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SlackSVG, {}) }
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
      backgroundColor: "#FFFFFF",
      color: "#1F1F1F",
      border: "1px solid #747775",
      hoverBgColor: "#FFFFFF",
      hoverBorder: "rgba(0, 0, 0, 0.1)"
    } : {
      backgroundColor: "#131314",
      color: "#E3E3E3",
      border: "1px solid #8E918F",
      hoverBgColor: "#FFFFFF",
      hoverBorder: "rgba(0, 0, 0, 0.1)"
    },
    apple: isDark ? {
      backgroundColor: "#000000",
      color: "#FFFFFF",
      border: "1px solid #000000",
      hoverBgColor: "#1C1C1C",
      hoverBorder: "#1C1C1C",
      logoColor: "#FFFFFF"
    } : {
      backgroundColor: "#FFFFFF",
      color: "#000000",
      border: "1px solid #FFFFFF",
      hoverBgColor: "#F0F0F0",
      hoverBorder: "#F0F0F0",
      logoColor: "#000000"
    },
    github: isDark ? {
      backgroundColor: "#F2F5F3",
      color: "#232925",
      border: "1px solid rgba(240, 246, 252, 0.16)",
      hoverBgColor: "#161B22",
      hoverBorder: "rgba(240, 246, 252, 0.24)",
      logoColor: "#000000"
    } : {
      backgroundColor: "rgb(43,45,49)",
      color: "#F2F5F3",
      border: "1px solid rgba(35, 41, 37, 0.16)",
      hoverBgColor: "#F2F5F3",
      hoverBorder: "rgba(16, 20, 17, 0.24)",
      logoColor: "#FFFFFF"
    },
    microsoft: isDark ? {
      backgroundColor: "#FFFFFF",
      color: "#1F1F1F",
      border: "1px solid #8c8c8c",
      hoverBgColor: "#F5F5F5",
      hoverBorder: "#8c8c8c"
    } : {
      backgroundColor: "#2f2f2f",
      color: "#FFFFFF",
      border: "1px solid #8c8c8c",
      hoverBgColor: "#3B3B3B",
      hoverBorder: "#A0A0A0"
    },
    facebook: {
      backgroundColor: "#1877F2",
      color: "#FFFFFF",
      border: "1px solid #1877F2",
      hoverBgColor: "#166FE5",
      hoverBorder: "#166FE5",
      logoColor: "#5890FF"
    },
    linkedin: {
      backgroundColor: "#0A66C2",
      color: "#FFFFFF",
      border: "1px solid #0A66C2",
      hoverBgColor: "#004182",
      hoverBorder: "#004182",
      logoColor: "#FFFFFF"
    },
    x: isDark ? {
      backgroundColor: "#FFFFFF",
      color: "#000000",
      border: "1px solid rgba(0, 0, 0, 0.18)",
      hoverBgColor: "#F2F2F2",
      hoverBorder: "rgba(0, 0, 0, 0.26)",
      logoColor: "#000000"
    } : {
      backgroundColor: "#000000",
      color: "#FFFFFF",
      border: "1px solid rgba(255, 255, 255, 0.22)",
      hoverBgColor: "#272727",
      hoverBorder: "rgba(255, 255, 255, 0.3)",
      logoColor: "#FFFFFF"
    },
    gitlab: {
      backgroundColor: "#FFFFFF",
      color: "#FC6D26",
      border: "1px solid #FC6D26",
      hoverBgColor: "#F5F5F5",
      hoverBorder: "#FC6D26"
    },
    discord: isDark ? {
      backgroundColor: "#FFFFFF",
      color: "#000000",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      hoverBgColor: "#F4F5F7",
      hoverBorder: "rgba(17, 18, 19, 0.16)"
    } : {
      backgroundColor: "#1c1d23",
      color: "#FFFFFF",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      hoverBgColor: "#23252e",
      hoverBorder: "rgba(255, 255, 255, 0.16)"
    },
    slack: {
      backgroundColor: "#FFFFFF",
      color: "#1F1F1F",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      hoverBgColor: "#F8F8F8",
      hoverBorder: "rgba(0, 0, 0, 0.18)"
    }
  };
  return styles[providerName] || styles.google;
}

// src/components/ui/fields/Sozial-Signin/Sozial-Button.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
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
  extrawidth,
  maxWidth
}) {
  const providerPresentation = resolveProviderPresentation(Provider);
  const isDark = Mui.useMediaQuery("(prefers-color-scheme: dark)", { noSsr: true });
  const providerStyles = getProviderButtonStyles(Provider, isDark);
  const logoColor = typeof Provider === "object" ? Provider.logoColor : providerStyles.logoColor;
  const buttonWidth = resolveButtonWidth(extrawidth, maxWidth);
  const iconNode = React4.isValidElement(providerPresentation.svg) ? React4.cloneElement(providerPresentation.svg, {
    Props: {
      SVGProps: {
        ...Props?.SVGProps?.Props?.SVGProps ?? {},
        ...logoColor ? { color: logoColor, fill: logoColor, stroke: logoColor } : {}
      }
    }
  }) : providerPresentation.svg;
  if (variant == "circle") {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_jsx_runtime7.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      Mui.IconButton,
      {
        sx: {
          height: "40px",
          width: "40px"
        },
        ...Props?.ButtonProps,
        onClick: OnClick,
        disabled: disabled || loading,
        children: loading ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          Mui.CircularProgress,
          {
            size: 20,
            sx: {
              color: providerStyles.color
            }
          }
        ) : iconNode
      }
    ) });
  } else {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_jsx_runtime7.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      Mui.Button,
      {
        ...Props?.ButtonProps,
        variant: "outlined",
        startIcon: iconNode,
        sx: {
          border: providerStyles.border,
          borderRadius: "20px",
          backgroundColor: providerStyles.backgroundColor,
          height: "40px",
          width: buttonWidth,
          minWidth: "183px",
          justifyContent: "flex-start",
          textTransform: "none",
          color: providerStyles.color,
          "& .MuiButton-loading": {
            color: providerStyles.color
          },
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: "0.25px",
          padding: 0,
          "&:hover": {
            backgroundColor: providerStyles.hoverBgColor,
            borderColor: providerStyles.hoverBorder
          },
          "& .MuiButton-startIcon": {
            marginLeft: "11px",
            marginRight: "11px"
          },
          "& .MuiButton-startIcon svg": {
            height: "20px",
            width: "20px"
          }
        },
        loading,
        onClick: OnClick,
        disabled: disabled || loading,
        children: [
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Mui.Box, { sx: {
            paddingRight: "12px"
          }, children: children ?? `Sign in with ${providerPresentation.label}` })
        ]
      }
    ) });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionButton,
  AvatarUpload,
  NotificationProvider,
  Passwordfield,
  SVGs,
  SocialButton,
  resolveButtonWidth,
  useNotification
});
