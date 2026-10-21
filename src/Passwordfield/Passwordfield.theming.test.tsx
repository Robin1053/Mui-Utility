import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createTheme, ThemeProvider, type Theme } from "@mui/material/styles";
import { Passwordfield } from "@robineb/mui-utility";

function renderWithTheme(theme: Theme, ui: React.ReactElement) {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("Passwordfield Theming", () => {
    it("uebernimmt defaultProps aus dem Theme", () => {
        const theme = createTheme({
            components: { MuiPasswordfield: { defaultProps: { showstrength: true } } },
        });
        renderWithTheme(theme, <Passwordfield>Passwort</Passwordfield>);
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("wendet Theme-variants anhand des ownerState an und leitet ref weiter", () => {
        const theme = createTheme({
            components: {
                MuiPasswordfield: { variants: [{ props: { error: true }, style: { paddingTop: 19 } }] },
            },
        });
        const ref = React.createRef<HTMLDivElement>();
        renderWithTheme(theme, <Passwordfield ref={ref} error>Passwort</Passwordfield>);
        expect(ref.current).toHaveClass("MuiFormControl-root");
        expect(getComputedStyle(ref.current as HTMLDivElement).paddingTop).toBe("19px");
    });

    it("reicht die Passwortstaerke als ownerState an den strength-Slot", async () => {
        const user = userEvent.setup();
        const theme = createTheme({
            components: {
                MuiPasswordfield: {
                    styleOverrides: {
                        strength: ({ ownerState }) => ({ height: ownerState.strength > 50 ? 6 : 2 }),
                    },
                },
            },
        });
        renderWithTheme(theme, <Passwordfield showstrength>Passwort</Passwordfield>);
        const progressbar = screen.getByRole("progressbar");
        expect(getComputedStyle(progressbar).height).toBe("2px");

        await user.type(screen.getByLabelText("Passwort"), "Sehr$icher123456");
        expect(getComputedStyle(progressbar).height).toBe("6px");
    });

    it("verknuepft Label und Input auch bei mehreren Instanzen korrekt", () => {
        renderWithTheme(
            createTheme(),
            <>
                <Passwordfield>Erstes</Passwordfield>
                <Passwordfield>Zweites</Passwordfield>
            </>,
        );
        expect(screen.getByLabelText("Erstes")).not.toBe(screen.getByLabelText("Zweites"));
    });

    it("uebernimmt eine eigene id aus Props.TextfieldProps", () => {
        renderWithTheme(
            createTheme(),
            <Passwordfield Props={{ TextfieldProps: { id: "mein-passwort" } }}>Passwort</Passwordfield>,
        );
        expect(screen.getByLabelText("Passwort")).toHaveAttribute("id", "mein-passwort");
    });
});
