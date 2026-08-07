import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OtpInput from "./OtpInput";
import * as React from "react";

describe("OtpInput basic", () => {
    it("calls onComplete when full value entered", async () => {
        const onComplete = jest.fn();
        const onChange = jest.fn();
        const user = userEvent.setup();

        render(
            <OtpInput length={4} value="" onChange={onChange} onComplete={onComplete} />,
        );

        // find inputs and type 4 digits into the first one (component supports paste/multi-char)
        const inputs = screen.getAllByRole("textbox");
        expect(inputs.length).toBeGreaterThanOrEqual(4);

        await user.type(inputs[0], "1234");

        // onChange should have been called and onComplete called at least once
        expect(onChange).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalled();
    });
});
