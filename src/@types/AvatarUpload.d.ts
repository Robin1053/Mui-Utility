import { BadgeProps, IconButtonProps } from "@mui/material";
import type { ThemedStyleOverrides, ThemedVariants } from './Theming';

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

/** Wird als `ownerState` an alle Slots gereicht (styleOverrides-Callbacks, Theme-variants) */
type AvatarUploadOwnerState = AvataruploadProps & {
    hasImage: boolean;
};

declare module '@mui/material/styles' {
    interface ComponentNameToClassKey {
        MuiAvatarUpload: 'root' | 'badge' | 'avatar';
    }

    interface ComponentsPropsList {
        MuiAvatarUpload: Partial<AvataruploadProps>;
    }

    interface Components {
        MuiAvatarUpload?: {
            defaultProps?: ComponentsPropsList['MuiAvatarUpload'];
            styleOverrides?: ThemedStyleOverrides<ComponentNameToClassKey['MuiAvatarUpload'], AvatarUploadOwnerState>;
            variants?: ThemedVariants<AvatarUploadOwnerState>;
        };
    }
}

export type { AvataruploadProps, AvatarUploadOwnerState };
