type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessage {
    message: string;
    type: ToastType;
}

interface NotificationContextValue {
    notify: (toast: ToastMessage) => void;
}

export type { ToastMessage, ToastType, NotificationContextValue };