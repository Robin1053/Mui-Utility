import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ClickAwayListener
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

  const [Open, setOpen] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState(false);

  const { notify } = useNotification();



  async function Clicked() {
    if (requireAreYouSure) {
      setOpen(true)
    } else {
      await executeAction()
    }
  }

  async function executeAction() {
    setLoading(true)
    setError(false)
    try {
      await action();
      if (Notification.useNotification === true) {
        notify({ message: Notification.successmessage, type: "success" })
      }
    } catch (error) {
      setError(true)
      setLoading(false)
      setOpen(false)
      if (Notification.useNotification === true) {
        notify({ type: "error", message: Notification.errormessage })
      }
    } finally {
      setOpen(false)
      setLoading(false)

    }
  }

const handleClickAway = () => {
    setOpen(false);
  };


  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <>
          <Button
            onClick={Clicked}
            loading={Loading}
            disabled={Loading}
            color={destructive || Error? "error" : "primary"}
            startIcon={icon}
            sx={ButtonProps.sx}
            variant="outlined"
          >
            {children}
          </Button>
          <Dialogfunction />
        </>
      </ClickAwayListener>
    </>
  );



  function Dialogfunction() {
    return (
      <>
        <Dialog open={Open} onClose={() => setOpen(false)} sx={DialogProps.sx}>
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
              onClick={() => setOpen(false)}
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