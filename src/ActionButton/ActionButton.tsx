import {
  Button,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ClickAwayListener,
  DialogProps,
  ButtonProps,
} from "@mui/material";
import * as React from "react";
import { useNotification } from "@/index";

type ActionButtonNotification =
  | {
    useNotification: true;
    errormessage: string;
    successmessage: string;
  }
  | {
    useNotification?: false;
    errormessage?: never;
    successmessage?: never;
  };

type ActionButtonProps = {
  action: () => void | Promise<void>;
  requireAreYouSure?: boolean;
  icon?: React.ReactNode;
  Dialog?: {
    dialogTitle?: React.ReactNode;
    dialogContent?: React.ReactNode;
    confirmText?: string;
  };
  Props?: {
    ButtonProps?: ButtonProps;
    DialogProps?: DialogProps;
  };
  destructive?: boolean;
  children: React.ReactNode;
  Notification?: ActionButtonNotification;
};

function ActionButton({
  action,
  requireAreYouSure = false,
  icon,
  Dialog = {},
  Props = {
    DialogProps: { open: false },
    ButtonProps: {},
  },
  destructive = false,
  children,
  Notification = {},
}: ActionButtonProps) {
  const [Open, setOpen] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
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
      const caughtError =
        e instanceof Error ? e : new Error("An unknown error has occurred.");
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

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Button
            {...Props.ButtonProps}
            onClick={Clicked}
            loading={Loading}
            color={destructive || error ? "error" : "primary"}
            startIcon={icon}
            sx={Props.ButtonProps.sx}
            variant="outlined"
            aria-busy={Loading}
            aria-invalid={!!error}
            aria-describedby={error ? "action-error-desc" : undefined}
          >
            {children}
          </Button>
          <Dialogfunction />
          {error && (
            <span id="action-error-desc" style={{ display: "none" }}>
              Aktion fehlgeschlagen
            </span>
          )}
        </div>
      </ClickAwayListener>
    </>
  );

  function Dialogfunction() {
    return (
      <>
        <MuiDialog
          {...Props.DialogProps}
          open={Open}
          onClose={() => setOpen(false)}
          sx={Props.DialogProps.sx}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogTitle id="dialog-title">
            {Dialog.dialogTitle || "Confirm Action"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="dialog-description">
              {Dialog.dialogContent || "Are you sure you want to do this?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color={"error"}>
              Cancel
            </Button>
            <Button
              onClick={() => executeAction()}
              color={destructive ? "error" : "primary"}
            >
              {Dialog.confirmText || "Yes"}
            </Button>
          </DialogActions>
        </MuiDialog>
      </>
    );
  }
}

export default ActionButton;
export type { ActionButtonProps, ActionButtonNotification };