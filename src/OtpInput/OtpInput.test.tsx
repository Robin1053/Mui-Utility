import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OtpInput } from "@robineb/mui-utility";

describe("OtpInput", () => {
    it("rendert genau so viele Felder wie length angibt", () => {
        render(<OtpInput length={6} />);
        expect(screen.getAllByRole("textbox")).toHaveLength(6);
    });

    it("verteilt getippte Zeichen automatisch auf die Felder und meldet onComplete bei Vollstaendigkeit", async () => {
        const onComplete = jest.fn();
        const onChange = jest.fn();
        const user = userEvent.setup();

        render(<OtpInput length={4} onChange={onChange} onComplete={onComplete} />);

        const inputs = screen.getAllByRole("textbox");
        await user.type(inputs[0], "1234");

        expect(onChange).toHaveBeenLastCalledWith("1234");
        expect(onComplete).toHaveBeenCalledWith("1234");
    });

    it("unterstuetzt Paste eines kompletten Codes in das erste Feld", async () => {
        const onComplete = jest.fn();
        const user = userEvent.setup();

        render(<OtpInput length={4} onComplete={onComplete} />);

        const inputs = screen.getAllByRole("textbox");
        await user.click(inputs[0]);
        await user.paste("5678");

        expect(onComplete).toHaveBeenCalledWith("5678");
        inputs.forEach((input, index) => {
            expect(input).toHaveValue("5678"[index]);
        });
    });

    it("loescht bei Backspace in einem leeren Feld das vorherige Feld und springt dorthin zurueck", async () => {
        const onChange = jest.fn();
        const user = userEvent.setup();

        render(<OtpInput length={4} onChange={onChange} />);
        const inputs = screen.getAllByRole("textbox");

        await user.type(inputs[0], "1");
        expect(inputs[1]).toHaveFocus();

        await user.keyboard("{Backspace}");

        expect(onChange).toHaveBeenLastCalledWith("");
        expect(inputs[0]).toHaveFocus();
    });

    it("navigiert mit den Pfeiltasten zwischen den Feldern", async () => {
        const user = userEvent.setup();

        render(<OtpInput length={4} />);
        const inputs = screen.getAllByRole("textbox");

        await user.click(inputs[1]);
        await user.keyboard("{ArrowLeft}");
        expect(inputs[0]).toHaveFocus();

        await user.keyboard("{ArrowRight}{ArrowRight}");
        expect(inputs[2]).toHaveFocus();
    });

    it("springt mit Home/End zum ersten bzw. letzten Feld", async () => {
        const user = userEvent.setup();

        render(<OtpInput length={4} />);
        const inputs = screen.getAllByRole("textbox");

        await user.click(inputs[1]);
        await user.keyboard("{End}");
        expect(inputs[3]).toHaveFocus();

        await user.keyboard("{Home}");
        expect(inputs[0]).toHaveFocus();
    });

    it("blockiert Zeichen, die validateChar ablehnt", async () => {
        const onChange = jest.fn();
        const user = userEvent.setup();

        render(
            <OtpInput
                length={4}
                onChange={onChange}
                validateChar={(char) => /[0-9]/.test(char)}
            />,
        );

        const inputs = screen.getAllByRole("textbox");
        await user.type(inputs[0], "a");

        expect(onChange).not.toHaveBeenCalled();
        expect(inputs[0]).toHaveValue("");
    });

    it("deaktiviert alle Felder wenn loading aktiv ist", () => {
        render(<OtpInput length={4} loading />);
        screen.getAllByRole("textbox").forEach((input) => {
            expect(input).toBeDisabled();
        });
    });

    it("markiert die Gruppe als aria-invalid wenn error aktiv ist", () => {
        render(<OtpInput length={4} error />);
        expect(screen.getByRole("group")).toHaveAttribute("aria-invalid", "true");
    });

    it("fokussiert das erste Feld wenn autoFocus aktiv ist", () => {
        render(<OtpInput length={4} autoFocus />);
        expect(screen.getAllByRole("textbox")[0]).toHaveFocus();
    });

    it("rendert einen Separator zwischen den Gruppen", () => {
        render(<OtpInput length={6} groups={2} separator="*" />);
        expect(screen.getAllByRole("textbox")).toHaveLength(6);
        expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("ruft onBlur erst auf, wenn der Fokus die gesamte Komponente verlaesst", async () => {
        const onBlur = jest.fn();
        const user = userEvent.setup();

        render(
            <div>
                <OtpInput length={4} onBlur={onBlur} />
                <button type="button">Ausserhalb</button>
            </div>,
        );

        const inputs = screen.getAllByRole("textbox");
        await user.click(inputs[0]);
        await user.click(inputs[1]);
        expect(onBlur).not.toHaveBeenCalled();

        await user.click(screen.getByRole("button", { name: "Ausserhalb" }));
        expect(onBlur).toHaveBeenCalledWith("", false);
    });

    it("wendet TextFieldsProps pro Index an", () => {
        render(
            <OtpInput
                length={2}
                TextFieldsProps={(index) => ({ placeholder: `Feld-${index}` })}
            />,
        );

        expect(screen.getByPlaceholderText("Feld-0")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Feld-1")).toBeInTheDocument();
    });
});
