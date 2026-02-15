import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

type ActionButtonProps = {
  action?: () => void | Promise<void>;
  requireAreYouSure?: boolean;
  icon?: React.ReactNode;
  label: string;
  DialogProps?: {
    dialogTitle?: React.ReactNode;
    dialogContent?: React.ReactNode;
    confirmText?: string;
  },
  destructive?: boolean;
};

export function ActionButton({
  label,
  action,
  requireAreYouSure = false,
  icon,
  DialogProps = {},
  destructive = false,
}: ActionButtonProps) {
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

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={loading}
        startIcon={icon}
      >
        {label}
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} {...DialogProps}>
        <DialogTitle>{DialogProps.dialogTitle ?? "Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {DialogProps.dialogContent ?? "This action cannot be undone."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={executeAction}
            disabled={loading}
            color={destructive ? "error" : "primary"}
          >
            {DialogProps.confirmText ?? `Yes, ${label.toLowerCase()}`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
