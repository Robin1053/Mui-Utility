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
  const [error, setError] = React.useState<Error | null>(null);
  const { notify } = useNotification();



  async function Clicked() {
		if (error) setError(null); 
    if (requireAreYouSure) {
      setOpen(true)
    } else {
      await executeAction()
    }
  }

  async function executeAction() {
    setLoading(true)
    try {
      await action();
      if (Notification.useNotification === true) {
        notify({ message: Notification.successmessage, type: "success" })
      }
		} catch (e) {
      const caughtError = e instanceof Error ? e : new Error("An unknown error has occurred.");
      setError(caughtError);

      if (Notification.useNotification === true) {

				const errorMessage = caughtError.message || Notification.errormessage;
        notify({ type: "error", message: errorMessage });
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
            color={destructive || error ? "error" : "primary"}
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
