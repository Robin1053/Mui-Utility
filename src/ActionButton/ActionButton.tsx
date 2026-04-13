import {
  Button,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ClickAwayListener,
} from "@mui/material";
import * as React from "react";
import { useNotification, ActionButtonProps } from "@robineb/mui-utility";


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
  fullWidth = false,
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
    } catch (error) {
      setError(error);
      if (Notification.useNotification === true) {
        const errorMessage = error.message || Notification.errormessage;
        notify({ type: "error", message: errorMessage });
      }
    } finally {
    }
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Button
            {...Props.ButtonProps}
            fullWidth={fullWidth}
            onClick={Clicked}
            loading={Loading}
            color={destructive || error ? "error" : "primary"}
            startIcon={icon}
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
