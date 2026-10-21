import { render, screen } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SocialSigninButton } from "@robineb/mui-utility";
import { getProviderButtonStyles } from "./Providerconfigs";

describe("Provider-Farben", () => {
    it("nutzt fuer Google die Farben aus den Google-Branding-Guidelines", () => {
        expect(getProviderButtonStyles("google", false).button).toMatchObject({
            backgroundColor: "#FFFFFF",
            color: "#1F1F1F",
            border: "1px solid #747775",
        });
        expect(getProviderButtonStyles("google", true).button).toMatchObject({
            backgroundColor: "#131314",
            color: "#E3E3E3",
            border: "1px solid #8E918F",
        });
    });

    it("behaelt im Dark Mode beim Hover die Randfarbe von Google bei", () => {
        const dark = getProviderButtonStyles("google", true).button;
        expect(dark.hoverBorder).toBe("#8E918F");
    });

    it("verwendet nur Farbwerte als hoverBorder (wird als borderColor gesetzt)", () => {
        const providers = ["google", "microsoft", "apple", "github", "facebook", "linkedin", "x", "gitlab", "discord", "slack", "passkey"] as const;
        for (const provider of providers) {
            for (const isDark of [false, true]) {
                const { button, circle } = getProviderButtonStyles(provider, isDark);
                expect(button.hoverBorder).not.toMatch(/solid/);
                expect(circle.hoverBorder).not.toMatch(/solid/);
            }
        }
    });

    it("verwendet die Farben eines Custom Providers statt der Google-Farben", () => {
        const color = {
            backgroundColor: "#123456",
            color: "#FFFFFF",
            border: "1px solid #123456",
            hoverBgColor: "#234567",
            hoverBorder: "#234567",
        };
        expect(
            getProviderButtonStyles({ type: "custom", name: "MyID", svg: null, color }).button,
        ).toEqual(color);
    });
});

describe("SocialSigninButton Darstellung", () => {
    it("rendert den runden Button in voller Groesse statt auf Logo-Groesse geschrumpft", () => {
        render(
            <ThemeProvider theme={createTheme()}>
                <SocialSigninButton Provider="google" variant="circle" />
            </ThemeProvider>,
        );
        const style = getComputedStyle(screen.getByRole("button"));
        expect(style.width).toBe("40px");
        expect(style.height).toBe("40px");
    });

    it("skaliert den runden Button mit size", () => {
        render(<SocialSigninButton Provider="google" variant="circle" size="small" />);
        expect(getComputedStyle(screen.getByRole("button")).width).toBe("32px");
    });

    it("zeigt das Label in Satzschreibung ohne Umbruch", () => {
        render(<SocialSigninButton Provider="google" />);
        const style = getComputedStyle(screen.getByRole("button"));
        expect(style.textTransform).toBe("none");
        expect(style.whiteSpace).toBe("nowrap");
    });
});
