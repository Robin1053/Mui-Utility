import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    NotificationProvider,
    useNotification,
    type ToastType,
} from "@/Notefication/Notifications";

function Trigger({ type = "success" as ToastType, message = "Saved" }) {
    const { notify } = useNotification();

    return (
        <button onClick={() => notify({ type, message })}>
            notify
        </button>
    );
}

describe("NotificationProvider", () => {
    it("zeigt Nachricht nach notify-Aufruf", async () => {
        const user = userEvent.setup();

        render(
            <NotificationProvider>
                <Trigger message="Gespeichert" type="success" />
            </NotificationProvider>,
        );

        await user.click(screen.getByRole("button", { name: "notify" }));

        expect(await screen.findByText("Gespeichert")).toBeInTheDocument();
        expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("schließt Alert über Close-Button", async () => {
        const user = userEvent.setup();

        render(
            <NotificationProvider>
                <Trigger message="Fehler" type="error" />
            </NotificationProvider>,
        );

        await user.click(screen.getByRole("button", { name: "notify" }));
        expect(await screen.findByText("Fehler")).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: /close/i }));

        await waitFor(() => {
            expect(screen.queryByText("Fehler")).not.toBeInTheDocument();
        });
    });
});
