import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createTheme, ThemeProvider, type Theme } from "@mui/material/styles";
import { NotificationProvider, useNotification, type ToastType } from "@robineb/mui-utility";

function Trigger({ type }: { type: ToastType }) {
    const { notify } = useNotification();
    return <button onClick={() => notify({ type, message: "Hallo" })}>notify</button>;
}

function renderWithTheme(theme: Theme, ui: React.ReactElement) {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("NotificationProvider Theming", () => {
    it("uebernimmt defaultProps aus dem Theme", async () => {
        const user = userEvent.setup();
        const theme = createTheme({
            components: {
                MuiNotificationProvider: {
                    defaultProps: { anchorOrigin: { vertical: "top", horizontal: "center" } },
                },
            },
        });
        renderWithTheme(theme, <NotificationProvider><Trigger type="info" /></NotificationProvider>);

        await user.click(screen.getByRole("button", { name: "notify" }));
        expect(document.querySelector(".MuiSnackbar-anchorOriginTopCenter")).toBeInTheDocument();
    });

    it("wendet Theme-variants anhand des Toast-Typs an", async () => {
        const user = userEvent.setup();
        const theme = createTheme({
            components: {
                MuiNotificationProvider: { variants: [{ props: { type: "error" }, style: { marginTop: 11 } }] },
            },
        });
        renderWithTheme(theme, <NotificationProvider><Trigger type="error" /></NotificationProvider>);

        await user.click(screen.getByRole("button", { name: "notify" }));
        const snackbar = document.querySelector(".MuiSnackbar-root") as HTMLElement;
        expect(getComputedStyle(snackbar).marginTop).toBe("11px");
    });

    it("reicht ownerState an den alert-Slot und uebernimmt Props.AlertProps", async () => {
        const user = userEvent.setup();
        const theme = createTheme({
            components: {
                MuiNotificationProvider: {
                    styleOverrides: {
                        alert: ({ ownerState }) => ({ marginLeft: ownerState.type === "warning" ? 5 : 0 }),
                    },
                },
            },
        });
        renderWithTheme(
            theme,
            <NotificationProvider Props={{ AlertProps: { variant: "filled" } }}>
                <Trigger type="warning" />
            </NotificationProvider>,
        );

        await user.click(screen.getByRole("button", { name: "notify" }));
        const alert = screen.getByRole("alert");
        expect(getComputedStyle(alert).marginLeft).toBe("5px");
        expect(alert).toHaveClass("MuiAlert-filled");
    });
});
