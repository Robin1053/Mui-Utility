import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createTheme, ThemeProvider, type Theme } from "@mui/material/styles";
import { ActionButton, NotificationProvider } from "@robineb/mui-utility";

function renderWithTheme(theme: Theme, ui: React.ReactElement) {
    return render(
        <ThemeProvider theme={theme}>
            <NotificationProvider>{ui}</NotificationProvider>
        </ThemeProvider>,
    );
}

describe("ActionButton Theming", () => {
    it("uebernimmt defaultProps aus dem Theme", async () => {
        const user = userEvent.setup();
        const theme = createTheme({
            components: { MuiActionButton: { defaultProps: { requireAreYouSure: true } } },
        });
        renderWithTheme(theme, <ActionButton action={jest.fn()}>Run</ActionButton>);

        await user.click(screen.getByRole("button", { name: "Run" }));
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("wendet Theme-variants anhand des ownerState an", () => {
        const theme = createTheme({
            components: {
                MuiActionButton: { variants: [{ props: { destructive: true }, style: { paddingTop: 13 } }] },
            },
        });
        const ref = React.createRef<HTMLDivElement>();
        renderWithTheme(theme, <ActionButton ref={ref} action={jest.fn()} destructive>Run</ActionButton>);
        expect(getComputedStyle(ref.current as HTMLDivElement).paddingTop).toBe("13px");
    });

    it("reicht ownerState an den button-Slot", () => {
        const theme = createTheme({
            components: {
                MuiActionButton: {
                    styleOverrides: {
                        button: ({ ownerState }) => ({ marginTop: ownerState.fullWidth ? 9 : 1 }),
                    },
                },
            },
        });
        renderWithTheme(theme, <ActionButton action={jest.fn()} fullWidth>Run</ActionButton>);
        expect(getComputedStyle(screen.getByRole("button", { name: "Run" })).marginTop).toBe("9px");
    });

    it("leitet ref an das Root-Element weiter", () => {
        const ref = React.createRef<HTMLDivElement>();
        renderWithTheme(createTheme(), <ActionButton ref={ref} action={jest.fn()}>Run</ActionButton>);
        expect(ref.current).toContainElement(screen.getByRole("button", { name: "Run" }));
    });

    it("erzeugt eindeutige Dialog-IDs fuer mehrere Instanzen", async () => {
        const user = userEvent.setup();
        renderWithTheme(
            createTheme(),
            <>
                <ActionButton action={jest.fn()} requireAreYouSure>A</ActionButton>
                <ActionButton action={jest.fn()} requireAreYouSure>B</ActionButton>
            </>,
        );
        await user.click(screen.getByRole("button", { name: "A" }));
        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveAccessibleName("Confirm Action");
        expect(document.querySelectorAll(`[id="${dialog.getAttribute("aria-labelledby")}"]`)).toHaveLength(1);
    });
});
