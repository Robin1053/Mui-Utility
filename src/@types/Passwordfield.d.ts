import { OutlinedInputProps } from "@mui/material";

type PasswordfieldProps = {
    loading?: boolean;
    showstrength?: boolean;
    children: React.ReactNode;
    error?: boolean;
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    value?: string;
    Props?: {
        TextfieldProps?: OutlinedInputProps;
    };
};

export type { PasswordfieldProps };