import {
  Button,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ClickAwayListener,
} from "@mui/material";
import { styled, useThemeProps } from "@mui/material/styles";
import * as React from "react";
import type {
  ActionButtonOwnerState,
  ActionButtonProps,
  ActionButtonResult,
} from "@robineb/mui-utility";
import { shouldForwardSlotProp } from "@robineb/mui-utility";
import { useNotification } from "../Notification/Notifications";

type OwnerStateProps = { ownerState: ActionButtonOwnerState };

const ActionButtonRoot = styled("div", {
  name: "MuiActionButton",
  slot: "root",
})<OwnerStateProps>({});

const ActionButtonButton = styled(Button, {
  name: "MuiActionButton",
  slot: "button",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>({});

const ActionButtonDialog = styled(MuiDialog, {
  name: "MuiActionButton",
  slot: "dialog",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>({});

const MUIActionButton = React.forwardRef<HTMLDivElement, ActionButtonProps>(
  function MUIActionButton(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: "MuiActionButton" });
    const {
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
    } = props;
    const [Open, setOpen] = React.useState(false);
    const [Loading, startTransition] = React.useTransition();
    const [error, setError] = React.useState<Error | null>(null);
    const { notify } = useNotification();

    // eindeutige IDs, damit mehrere ActionButtons auf einer Seite nicht kollidieren
    const idPrefix = React.useId();
    const errorDescriptionId = `${idPrefix}-error`;
    const dialogTitleId = `${idPrefix}-dialog-title`;
    const dialogDescriptionId = `${idPrefix}-dialog-description`;

    const ownerState: ActionButtonOwnerState = {
      ...props,
      requireAreYouSure,
      destructive,
      fullWidth,
      loading: Loading,
      hasError: !!error,
      dialogOpen: Open,
    };

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
            // `void` explizit auf `undefined` abbilden, sonst scheitert die Flussanalyse unter strict (TS2454)
            const actionResult = (await action()) as ActionButtonResult | undefined;

            if (actionResult?.error) {
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
      <ClickAwayListener onClickAway={handleClickAway}>
        <ActionButtonRoot ref={ref} ownerState={ownerState}>
          <ActionButtonButton
            {...Props.ButtonProps}
            ownerState={ownerState}
            fullWidth={fullWidth}
            onClick={Clicked}
            loading={Loading}
            color={destructive || error ? "error" : "primary"}
            startIcon={icon}
            variant="outlined"
            aria-busy={Loading}
            aria-invalid={!!error}
            aria-describedby={error ? errorDescriptionId : undefined}
          >
            {children}
          </ActionButtonButton>
          <ActionButtonDialog
            {...Props.DialogProps}
            ownerState={ownerState}
            open={Open}
            onClose={() => setOpen(false)}
            aria-labelledby={dialogTitleId}
            aria-describedby={dialogDescriptionId}
          >
            <DialogTitle id={dialogTitleId}>
              {Dialog.dialogTitle || "Confirm Action"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id={dialogDescriptionId}>
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
          </ActionButtonDialog>
          {error && (
            <span id={errorDescriptionId} style={{ display: "none" }}>
              Aktion fehlgeschlagen
            </span>
          )}
        </ActionButtonRoot>
      </ClickAwayListener>
    );
  },
);

export default MUIActionButton;
