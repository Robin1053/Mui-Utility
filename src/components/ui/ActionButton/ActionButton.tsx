import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material"
import type { ButtonProps as MuiButtonProps } from "@mui/material"
import type { SxProps, Theme } from "@mui/material/styles"
import * as React from "react"
import { useNotification } from "../Notifications";

export type ActionButtonNotification =
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

export type ActionButtonProps = {
  action: () => void | Promise<void>;
  requireAreYouSure?: boolean;
  icon?: React.ReactNode;
  DialogProps?: {
    dialogTitle?: React.ReactNode;
    dialogContent?: React.ReactNode;
    confirmText?: string;
    sx?: SxProps<Theme>;
  };
  ButtonProps?: MuiButtonProps;
  destructive?: boolean;
  children: React.ReactNode;
  Notification?: ActionButtonNotification;
};


function ActionButton({
  action,
  requireAreYouSure = false,
  icon,
  DialogProps = {},
  ButtonProps = {},
  destructive = false,
  children,
  Notification = {}
}: ActionButtonProps) {

  const [open, setopen] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [error, seterror] = React.useState(false);

  const { notify } = useNotification();



  async function Clicked() {
    if (requireAreYouSure) {
      setopen(true)
    } else {
      await executeAction()
    }
  }

  async function executeAction() {
    setloading(true)
    seterror(false)
    try {
      await action();
      if (Notification.useNotification === true) {
        notify({ message: Notification.successmessage, type: "success" })
      }
    } catch (error) {
      seterror(true)
      setloading(false)
      setopen(false)
      if (Notification.useNotification === true) {
        notify({ type: "error", message: Notification.errormessage })
      }
    } finally {
      setopen(false)
      setloading(false)

    }
  }
  return (
    <>
      <Button
        onClick={Clicked}
        loading={loading}
        disabled={loading}
        color={destructive ? "error" : "primary"}
        startIcon={icon}
        sx={ButtonProps.sx}
        variant="outlined"
      >
        {children}
      </Button>
      <Dialogfunction />
    </>
  );



  function Dialogfunction() {
    return (
      <>
        <Dialog open={open} onClose={() => setopen(false)} sx={DialogProps.sx}>
          <DialogTitle>
            {DialogProps.dialogTitle || "Confirm Action"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {DialogProps.dialogContent || "Are you sure you want to do this?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setopen(false)}
              color={"error"}
            >
              Cancel
            </Button>
            <Button
              onClick={() => executeAction()}
              color={destructive ? "error" : "primary"}
            >
              {DialogProps.confirmText || "Yes"}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}




export { ActionButton };