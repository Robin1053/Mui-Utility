import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Passwordfield } from "./Passwordfield";

describe("Passwordfield", () => {
    it("rendert das Label korrekt", () => {
        render(<Passwordfield>Passwort</Passwordfield>);
        expect(screen.getByLabelText("Passwort")).toBeInTheDocument();
    });

    it("toggled die Passwortsichtbarkeit", async () => {
        render(<Passwordfield>Passwort</Passwordfield>);
        const input = screen.getByLabelText("Passwort");
        const toggle = screen.getByRole("button", {
            name: /display the password/i,
        });

        expect(input).toHaveAttribute("type", "password");
        await userEvent.click(toggle);
        expect(input).toHaveAttribute("type", "text");
    });

    it("ARIA: hat aria-describedby wenn showstrength aktiv", () => {
        render(<Passwordfield showstrength>Passwort</Passwordfield>);
        const input = screen.getByLabelText("Passwort");
        expect(input).toHaveAttribute("aria-describedby", "password-strength-indicator");
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("ARIA: hat kein aria-describedby wenn showstrength inaktiv", () => {
        render(<Passwordfield>Passwort</Passwordfield>);
        const input = screen.getByLabelText("Passwort");
        expect(input).not.toHaveAttribute("aria-describedby");
    });

    it("ruft onChange beim Eingeben auf", async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();

        render(<Passwordfield onChange={onChange}>Passwort</Passwordfield>);
        const input = screen.getByLabelText("Passwort");

        await user.type(input, "abc");

        expect(onChange).toHaveBeenCalled();
    });
});