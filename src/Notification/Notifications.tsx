"use client";

import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { styled, useThemeProps } from "@mui/material/styles";
import type {
  NotificationContextValue,
  NotificationProviderOwnerState,
  NotificationProviderProps,
  ToastMessage,
} from "@robineb/mui-utility";
import { shouldForwardSlotProp } from "@robineb/mui-utility";

type OwnerStateProps = { ownerState: NotificationProviderOwnerState };

const NotificationSnackbar = styled(Snackbar, {
  name: "MuiNotificationProvider",
  slot: "root",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>({});

const NotificationAlert = styled(Alert, {
  name: "MuiNotificationProvider",
  slot: "alert",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>({
  width: "100%",
});

const NotificationContext = createContext<NotificationContextValue>({
  notify: () => { }
});

const useNotification = () => useContext(NotificationContext);

function NotificationProvider(inProps: NotificationProviderProps) {
  const props = useThemeProps({ props: inProps, name: "MuiNotificationProvider" });
  const {
    children,
    autoHideDuration = 4000,
    anchorOrigin = { vertical: "bottom", horizontal: "left" },
    Props = {},
  } = props;
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage>({
    message: "",
    type: "info"
  });

  const ownerState: NotificationProviderOwnerState = {
    ...props,
    autoHideDuration,
    anchorOrigin,
    open,
    type: toast.type,
  };

  const notify = ({ message, type }: ToastMessage) => {
    setToast({ message, type });
    setOpen(true);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <NotificationSnackbar
        {...Props.SnackbarProps}
        ownerState={ownerState}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={() => setOpen(false)}
        anchorOrigin={anchorOrigin}
      >
        <NotificationAlert
          {...Props.AlertProps}
          ownerState={ownerState}
          onClose={() => setOpen(false)}
          severity={toast.type}
        >
          {toast.message}
        </NotificationAlert>
      </NotificationSnackbar>
    </NotificationContext.Provider>
  );
};

export { useNotification, NotificationProvider };
