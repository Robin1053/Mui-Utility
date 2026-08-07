import { BadgeProps, IconButtonProps } from "@mui/material";

type AvataruploadProps = {
    image?: string;
    onUpload: (file: File) => void;
    icon?: React.ReactNode;
    Props?: {
        IconButtonProps?: IconButtonProps;
        BadgeProps?: BadgeProps;
        InputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    };
};

export type { AvataruploadProps };