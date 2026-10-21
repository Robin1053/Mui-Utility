import * as React from "react";
import { render, screen } from "@testing-library/react";
import { createTheme, ThemeProvider, type Theme } from "@mui/material/styles";
import { AvatarUpload } from "@robineb/mui-utility";

function renderWithTheme(theme: Theme, ui: React.ReactElement) {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("AvatarUpload Theming", () => {
    it("uebernimmt defaultProps aus dem Theme", () => {
        const theme = createTheme({
            components: { MuiAvatarUpload: { defaultProps: { image: "theme.png" } } },
        });
        renderWithTheme(theme, <AvatarUpload onUpload={jest.fn()} />);
        expect(screen.getByRole("img")).toHaveAttribute("src", "theme.png");
    });

    it("wendet Theme-variants anhand des ownerState an", () => {
        const theme = createTheme({
            components: {
                MuiAvatarUpload: { variants: [{ props: { hasImage: true }, style: { marginTop: 17 } }] },
            },
        });
        const ref = React.createRef<HTMLLabelElement>();
        renderWithTheme(theme, <AvatarUpload ref={ref} image="a.png" onUpload={jest.fn()} />);
        expect(ref.current?.tagName).toBe("LABEL");
        expect(getComputedStyle(ref.current as HTMLLabelElement).marginTop).toBe("17px");
    });

    it("stylt den avatar-Slot ueber styleOverrides mit ownerState", () => {
        const theme = createTheme({
            components: {
                MuiAvatarUpload: {
                    styleOverrides: {
                        avatar: ({ ownerState }) => ({ width: ownerState.hasImage ? 64 : 32 }),
                    },
                },
            },
        });
        renderWithTheme(theme, <AvatarUpload image="a.png" onUpload={jest.fn()} />);
        const avatar = screen.getByRole("img").parentElement as HTMLElement;
        expect(getComputedStyle(avatar).width).toBe("64px");
    });
});
