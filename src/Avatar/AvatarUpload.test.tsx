import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AvatarUpload } from "@/index";

describe("AvatarUpload", () => {
    it("hat standard aria-label auf dem Button", () => {
        render(<AvatarUpload onUpload={() => { }} />);
        expect(
            screen.getByRole("button", { name: /profilbild hochladen/i }),
        ).toBeInTheDocument();
    });

    it("übernimmt custom aria-label vom InputProps für den Button", () => {
        render(
            <AvatarUpload
                onUpload={() => { }}
                Props={{ InputProps: { "aria-label": "Neues Profilbild wählen" } }}
            />,
        );

        expect(
            screen.getByRole("button", { name: /neues profilbild wählen/i }),
        ).toBeInTheDocument();
    });

    it("ruft onUpload mit ausgewählter Datei auf", async () => {
        const onUpload = jest.fn();
        const user = userEvent.setup();
        render(<AvatarUpload onUpload={onUpload} />);

        const input = screen.getByLabelText(/select image file for avatar upload/i);
        const file = new File(["avatar"], "avatar.png", { type: "image/png" });

        await user.upload(input, file);

        expect(onUpload).toHaveBeenCalledTimes(1);
        expect(onUpload).toHaveBeenCalledWith(file);
    });
});
