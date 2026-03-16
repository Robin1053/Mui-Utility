import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { ActionButton } from "./ActionButton";
import { NotificationProvider } from "../Notifications";

function renderWithNotifications(ui: ReactElement) {
    return render(<NotificationProvider>{ui}</NotificationProvider>);
}

describe("ActionButton", () => {
    it("führt action bei Klick direkt aus", async () => {
        const user = userEvent.setup();
        const action = jest.fn().mockResolvedValue(undefined);

        renderWithNotifications(<ActionButton action={action}>Run</ActionButton>);

        await user.click(screen.getByRole("button", { name: "Run" }));

        await waitFor(() => {
            expect(action).toHaveBeenCalledTimes(1);
        });
    });

    it("öffnet Confirm-Dialog wenn requireAreYouSure aktiv ist", async () => {
        const user = userEvent.setup();
        const action = jest.fn().mockResolvedValue(undefined);

        renderWithNotifications(
            <ActionButton action={action} requireAreYouSure>
                Delete
            </ActionButton>,
        );

        await user.click(screen.getByRole("button", { name: "Delete" }));

        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(action).not.toHaveBeenCalled();

        await user.click(screen.getByRole("button", { name: "Yes" }));

        await waitFor(() => {
            expect(action).toHaveBeenCalledTimes(1);
        });
    });

    it("schließt Dialog über Cancel ohne action auszuführen", async () => {
        const user = userEvent.setup();
        const action = jest.fn().mockResolvedValue(undefined);

        renderWithNotifications(
            <ActionButton action={action} requireAreYouSure>
                Delete
            </ActionButton>,
        );

        await user.click(screen.getByRole("button", { name: "Delete" }));
        await user.click(screen.getByRole("button", { name: "Cancel" }));

        await waitFor(() => {
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });
        expect(action).not.toHaveBeenCalled();
    });

    it("setzt aria-invalid bei fehlgeschlagener action", async () => {
        const user = userEvent.setup();
        const action = jest.fn().mockRejectedValue(new Error("Boom"));

        renderWithNotifications(<ActionButton action={action}>Run</ActionButton>);
        const button = screen.getByRole("button", { name: "Run" });

        await user.click(button);

        await waitFor(() => {
            expect(button).toHaveAttribute("aria-invalid", "true");
        });
    });

    it("zeigt Success-Notification wenn aktiviert", async () => {
        const user = userEvent.setup();
        const action = jest.fn().mockResolvedValue(undefined);

        renderWithNotifications(
            <ActionButton
                action={action}
                Notification={{
                    useNotification: true,
                    successmessage: "Gespeichert",
                    errormessage: "Fehler",
                }}
            >
                Save
            </ActionButton>,
        );

        await user.click(screen.getByRole("button", { name: "Save" }));

        expect(await screen.findByText("Gespeichert")).toBeInTheDocument();
    });
});
