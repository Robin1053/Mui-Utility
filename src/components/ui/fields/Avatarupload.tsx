import {
  Avatar,
  Badge,
  BadgeProps,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

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
  return (
    <IconButton
      component="label"
      {...Props.IconButtonProps}
      sx={Props.IconButtonProps?.sx}
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
        sx={Props.BadgeProps?.sx}
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

export { type AvataruploadProps, AvatarUpload };
