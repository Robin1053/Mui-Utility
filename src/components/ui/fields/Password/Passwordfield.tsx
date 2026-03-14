"use client";

import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInputProps,
  Input,
  Divider,
  LinearProgress,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import * as React from "react";
import { getPasswordStrength } from "./Passwordstrenght";


export type PasswordfieldProps = {
  loading?: boolean;
  showstrength?: boolean;
  children: React.ReactNode;
  error?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value?: string;
  Muiprops?: Omit<OutlinedInputProps, "type">;
};

export function Passwordfield({
  loading = false,
  children,
  showstrength = false,
  error = false,
  onChange,
  value,
  Muiprops,
}: PasswordfieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [internalPassword, setInternalPassword] = React.useState("");

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

  return (
    <>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="Passwordfield">{children}</InputLabel>
        <Input
          aria-label="Password field"
          {...Muiprops}
          disableUnderline
          inputComponent={"input"}
          id="Passwordfield"
          type={showPassword ? "text" : "password"}
          value={passwordValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          <Divider />
        ) : (
          <LinearProgress variant="determinate" value={strength} />
        )}
      </FormControl>
    </>
  );
}
