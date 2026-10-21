import {
  Avatar,
  Badge,
  IconButton,
} from "@mui/material";
import { styled, useThemeProps } from "@mui/material/styles";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import * as React from "react";
import type { AvatarUploadOwnerState, AvataruploadProps } from "@robineb/mui-utility";
import { shouldForwardSlotProp } from "@robineb/mui-utility";

type OwnerStateProps = { ownerState: AvatarUploadOwnerState };

const AvatarUploadRoot = styled(IconButton, {
  name: "MuiAvatarUpload",
  slot: "root",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>({});

const AvatarUploadBadge = styled(Badge, {
  name: "MuiAvatarUpload",
  slot: "badge",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>({});

const AvatarUploadAvatar = styled(Avatar, {
  name: "MuiAvatarUpload",
  slot: "avatar",
  shouldForwardProp: shouldForwardSlotProp,
})<OwnerStateProps>({
  width: 128,
  height: 128,
});

const MUIAvatarUpload = React.forwardRef<HTMLLabelElement, AvataruploadProps>(
  function MUIAvatarUpload(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: "MuiAvatarUpload" });
    const {
      image,
      onUpload,
      icon,
      Props = {
        BadgeProps: {},
        IconButtonProps: {},
        InputProps: {},
      },
    } = props;
    const ownerState: AvatarUploadOwnerState = { ...props, hasImage: !!image };

    const buttonAriaLabel =
      Props.InputProps?.["aria-label"] || "Profilbild hochladen";

    return (
      <AvatarUploadRoot
        ref={ref as React.Ref<HTMLButtonElement>}
        ownerState={ownerState}
        component="label"
        aria-label={buttonAriaLabel}
        {...Props.IconButtonProps}
      >
        <input
          {...Props.InputProps}
          aria-label="Select image file for avatar upload"
          hidden
          accept="image/*"
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onUpload(file);
            }
          }}
        />
        <AvatarUploadBadge
          {...Props.BadgeProps}
          ownerState={ownerState}
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={icon || <PhotoCameraIcon sx={{ fontSize: 18 }} />}
        >
          <AvatarUploadAvatar
            ownerState={ownerState}
            src={image}
            alt={image || "No profile picture set"}
          />
        </AvatarUploadBadge>
      </AvatarUploadRoot>
    );
  },
);

export default MUIAvatarUpload;
