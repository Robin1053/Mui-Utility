import {
  Avatar,
  Badge,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { AvataruploadProps } from "@/@types/";


function AvatarUpload({
  image,
  onUpload,
  icon,
  Props = {
    BadgeProps: {},
    IconButtonProps: {},
    InputProps: {},
  },
}: AvataruploadProps) {
  const buttonAriaLabel =
    Props.InputProps?.["aria-label"] || "Profilbild hochladen";

  return (
    <IconButton
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
      <Badge
        {...Props.BadgeProps}
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={icon || <PhotoCameraIcon sx={{ fontSize: 18 }} />}
      >
        <Avatar
          src={image}
          sx={{ width: 128, height: 128 }}
          alt={image || "No profile picture set"}
        />
      </Badge>
    </IconButton>
  );
}
export default AvatarUpload