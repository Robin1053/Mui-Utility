import { Avatar, Badge, IconButton } from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

type AvataruploadProps = {
    image?: string;
    onUpload: (file: File) => void;
    icon?: React.ReactNode;

}
function Avatarupload({ image, onUpload, icon }: AvataruploadProps) {
    return (
        <IconButton component="label">
            <input
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
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={icon || <PhotoCameraIcon sx={{ fontSize: 18 }} /> }
            >
                <Avatar
                    src={image}
                    sx={{ width: 128, height: 128 }}
                />
            </Badge>
        </IconButton>
    )
}

export { type AvataruploadProps, Avatarupload }