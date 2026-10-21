import * as React from "react";
import { render, screen } from "@testing-library/react";
import { createTheme, ThemeProvider, type Theme } from "@mui/material/styles";
import { SocialSigninButton } from "@robineb/mui-utility";

function renderWithTheme(theme: Theme, ui: React.ReactElement) {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("SocialSigninButton Theming", () => {
    it("uebernimmt defaultProps aus dem Theme", () => {
        const theme = createTheme({
            components: { MuiSocialSigninButton: { defaultProps: { children: "Weiter" } } },
        });
        renderWithTheme(theme, <SocialSigninButton Provider="github" />);
        expect(screen.getByRole("button")).toHaveTextContent("Weiter");
    });

    it("wendet Theme-variants auf beide Varianten anhand des ownerState an", () => {
        const theme = createTheme({
            components: {
                MuiSocialSigninButton: {
                    variants: [{ props: { variant: "circle" }, style: { marginTop: 23 } }],
                },
            },
        });
        const { rerender } = renderWithTheme(theme, <SocialSigninButton Provider="google" variant="circle" />);
        expect(getComputedStyle(screen.getByRole("button")).marginTop).toBe("23px");

        rerender(<ThemeProvider theme={theme}><SocialSigninButton Provider="google" /></ThemeProvider>);
        expect(getComputedStyle(screen.getByRole("button")).marginTop).not.toBe("23px");
    });

    it("reicht Provider-Farben als ownerState an styleOverrides", () => {
        const theme = createTheme({
            components: {
                MuiSocialSigninButton: {
                    styleOverrides: {
                        label: ({ ownerState }) => ({
                            marginLeft: ownerState.Provider === "github" ? 4 : 0,
                        }),
                    },
                },
            },
        });
        renderWithTheme(theme, <SocialSigninButton Provider="github" />);
        expect(getComputedStyle(screen.getByText("Sign in with GitHub")).marginLeft).toBe("4px");
    });

    it("laesst sx aus Props.ButtonProps die Standard-Styles uebersteuern", () => {
        renderWithTheme(
            createTheme(),
            <SocialSigninButton Provider="google" Props={{ ButtonProps: { sx: { borderRadius: "4px" } } }} />,
        );
        expect(getComputedStyle(screen.getByRole("button")).borderRadius).toBe("4px");
    });

    it("leitet classes aus Props.ButtonProps weiter und ref an den Button", () => {
        const ref = React.createRef<HTMLButtonElement>();
        renderWithTheme(
            createTheme(),
            <SocialSigninButton
                ref={ref}
                Provider="google"
                Props={{ ButtonProps: { classes: { root: "eigene-klasse" } } }}
            />,
        );
        expect(screen.getByRole("button")).toHaveClass("eigene-klasse");
        expect(ref.current).toBe(screen.getByRole("button"));
    });
});
