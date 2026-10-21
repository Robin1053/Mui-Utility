import * as React from "react";
import { render, screen } from "@testing-library/react";
import { createTheme, ThemeProvider, type Theme } from "@mui/material/styles";
import { OtpInput } from "@robineb/mui-utility";

function renderWithTheme(theme: Theme, ui: React.ReactElement) {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("OtpInput Theming", () => {
    it("uebernimmt defaultProps aus dem Theme", () => {
        const theme = createTheme({ components: { MuiOtpInput: { defaultProps: { length: 6 } } } });
        renderWithTheme(theme, <OtpInput />);
        expect(screen.getAllByRole("textbox")).toHaveLength(6);
    });

    it("wendet Theme-variants anhand des ownerState an", () => {
        const theme = createTheme({
            components: {
                MuiOtpInput: { variants: [{ props: { error: true }, style: { rowGap: 21 } }] },
            },
        });
        const { rerender } = renderWithTheme(theme, <OtpInput error />);
        expect(getComputedStyle(screen.getByRole("group")).rowGap).toBe("21px");

        rerender(<ThemeProvider theme={theme}><OtpInput /></ThemeProvider>);
        expect(getComputedStyle(screen.getByRole("group")).rowGap).toBe("");
    });

    it("reicht index und filled als ownerState an den input-Slot", () => {
        const theme = createTheme({
            components: {
                MuiOtpInput: {
                    styleOverrides: {
                        input: ({ ownerState }) => ({
                            marginTop: ownerState.filled ? 7 : 3,
                            marginLeft: (ownerState.index ?? 0) * 10,
                        }),
                    },
                },
            },
        });
        const { container } = renderWithTheme(theme, <OtpInput length={2} value="1" />);
        const fields = container.querySelectorAll<HTMLElement>(".MuiTextField-root");
        expect(getComputedStyle(fields[0]).marginTop).toBe("7px");
        expect(getComputedStyle(fields[1]).marginTop).toBe("3px");
        expect(getComputedStyle(fields[1]).marginLeft).toBe("10px");
    });

    it("reicht ownerState an den separator-Slot", () => {
        const theme = createTheme({
            components: {
                MuiOtpInput: {
                    styleOverrides: {
                        separator: ({ ownerState }) => ({ fontSize: ownerState.error ? 30 : 10 }),
                    },
                },
            },
        });
        renderWithTheme(theme, <OtpInput length={2} groups={2} separator="#" error />);
        expect(getComputedStyle(screen.getByText("#")).fontSize).toBe("30px");
    });
});
