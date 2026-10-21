"use client";

import {
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  Divider,
  LinearProgress,
} from "@mui/material";
import { styled, useThemeProps } from "@mui/material/styles";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import * as React from "react";
import { getPasswordStrength } from "@robineb/mui-utility/Passwordfield/Passwordstrength";
import type { PasswordfieldOwnerState, PasswordfieldProps } from "@robineb/mui-utility";
import { shouldForwardSlotProp } from "@robineb/mui-utility";

type OwnerStateProps = { ownerState: PasswordfieldOwnerState };

const PasswordfieldRoot = styled(FormControl, {
  name: "MuiPasswordfield",
  slot: "root",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>(({ theme }) => ({
  margin: theme.spacing(1),
  width: "25ch",
}));

const PasswordfieldLabel = styled(InputLabel, {
  name: "MuiPasswordfield",
  slot: "label",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>({});

const PasswordfieldInput = styled(Input, {
  name: "MuiPasswordfield",
  slot: "input",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>({});

const PasswordfieldStrength = styled(LinearProgress, {
  name: "MuiPasswordfield",
  slot: "strength",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>({
  height: 2,
});

const PasswordfieldDivider = styled(Divider, {
  name: "MuiPasswordfield",
  slot: "divider",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>({});

const MUIPasswordfield = React.forwardRef<HTMLDivElement, PasswordfieldProps>(
  function MUIPasswordfield(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: "MuiPasswordfield" });
    const {
      loading = false,
      children,
      showstrength = false,
      error = false,
      onChange,
      Props = {
        TextfieldProps: {},
      },
      value,
    } = props;
    const [showPassword, setShowPassword] = React.useState(false);
    const [internalPassword, setInternalPassword] = React.useState("");

    // eindeutige IDs, damit mehrere Passwordfields auf einer Seite nicht kollidieren
    const idPrefix = React.useId();
    const inputId = Props.TextfieldProps?.id ?? `${idPrefix}-input`;
    const strengthDescriptionId = `${idPrefix}-strength`;

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      event.preventDefault();
    };

    const handleMouseUpPassword = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      event.preventDefault();
    };

    const passwordValue = typeof value === "string" ? value : internalPassword;
    const strength = getPasswordStrength(passwordValue);

    const ownerState: PasswordfieldOwnerState = {
      ...props,
      loading,
      showstrength,
      error,
      strength,
      showPassword,
    };

    return (
      <PasswordfieldRoot ref={ref} ownerState={ownerState} variant="outlined">
        <PasswordfieldLabel ownerState={ownerState} htmlFor={inputId}>
          {children}
        </PasswordfieldLabel>
        <PasswordfieldInput
          aria-label="Password field"
          {...Props?.TextfieldProps}
          ownerState={ownerState}
          inputProps={{
            ...(Props.TextfieldProps?.inputProps || {}),
            "aria-describedby": showstrength
              ? strengthDescriptionId
              : undefined,
          }}
          disableUnderline
          inputComponent={"input"}
          id={inputId}
          type={showPassword ? "text" : "password"}
          value={passwordValue}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
            setInternalPassword(event.target.value);
            onChange?.(event);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={() => setShowPassword((prev) => !prev)}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          name="Password"
          error={error}
        />
        {!showstrength ? (
          <PasswordfieldDivider ownerState={ownerState} />
        ) : (
          <PasswordfieldStrength
            ownerState={ownerState}
            id={strengthDescriptionId}
            variant="determinate"
            value={strength}
          />
        )}
      </PasswordfieldRoot>
    );
  },
);

export default MUIPasswordfield;
