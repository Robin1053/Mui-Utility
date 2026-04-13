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
import type { ActionButtonProps, ActionButtonResult } from "@robineb/mui-utility";
import { useNotification } from "../Notification/Notifications";


function ActionButton({
  action,
  onSuccess,
  onError,
  onSettled,
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
  const [Loading, startTransition] = React.useTransition();
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
    if (error) setError(null);

    startTransition(
      async () => {
        try {
          const actionResult = await action();

          if (typeof actionResult !== "undefined" && actionResult.error) {
            const actionError = new Error(
              actionResult.message || Notification.errormessage || "Action failed"
            );
            setError(actionError);
            onError?.(actionError, actionResult);

            if (Notification.useNotification) {
              notify({
                message: actionResult.message || Notification.errormessage,
                type: "error"
              });
            }
            return;
          }

          onSuccess?.(actionResult);

          if (Notification.useNotification) {
            notify(
              {
                type: "success",
                message: Notification.successmessage
              }
            );
          }
        } catch (caught) {
          const actionError =
            caught instanceof Error ? caught : new Error("Action failed");
          setError(actionError);
          onError?.(actionError);

          if (Notification.useNotification) {
            notify({
              message: Notification.errormessage || actionError.message,
              type: "error"
            });
          }
        } finally {
          onSettled?.();
        }
      }
    );
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
              onClick={() => {
                setOpen(false);
                void executeAction();
              }}
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
