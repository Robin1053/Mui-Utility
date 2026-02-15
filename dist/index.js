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

// src/components/index.js
var index_exports = {};
__export(index_exports, {
  ActionButton: () => ActionButton
});
module.exports = __toCommonJS(index_exports);

// src/components/ActionButton/ActionButton.tsx
var React = __toESM(require("react"));
var import_material = require("@mui/material");
function ActionButton({
  label,
  action,
  requireAreYouSure = false,
  icon,
  DialogProps = {},
  destructive = false
}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleClick = async () => {
    if (requireAreYouSure) {
      setOpen(true);
      return;
    }
    await executeAction();
  };
  const executeAction = async () => {
    if (!action) return;
    try {
      setLoading(true);
      await action();
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    import_material.Button,
    {
      onClick: handleClick,
      disabled: loading,
      startIcon: icon
    },
    label
  ), /* @__PURE__ */ React.createElement(import_material.Dialog, { open, onClose: () => setOpen(false), ...DialogProps }, /* @__PURE__ */ React.createElement(import_material.DialogTitle, null, DialogProps.dialogTitle ?? "Are you sure?"), /* @__PURE__ */ React.createElement(import_material.DialogContent, null, /* @__PURE__ */ React.createElement(import_material.DialogContentText, null, DialogProps.dialogContent ?? "This action cannot be undone.")), /* @__PURE__ */ React.createElement(import_material.DialogActions, null, /* @__PURE__ */ React.createElement(import_material.Button, { onClick: () => setOpen(false) }, "Cancel"), /* @__PURE__ */ React.createElement(
    import_material.Button,
    {
      onClick: executeAction,
      disabled: loading,
      color: destructive ? "error" : "primary"
    },
    DialogProps.confirmText ?? `Yes, ${label.toLowerCase()}`
  ))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionButton
});
