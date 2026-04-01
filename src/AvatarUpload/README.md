# AvatarUpload

`AvatarUpload` rendert einen klickbaren Avatar mit Upload-Eingabe (`image/*`).
Bei Dateiauswahl wird die erste Datei an `onUpload` uebergeben.

## Import

```tsx
import { AvatarUpload } from "@robineb/mui-utility";
```

## Beispiel

```tsx
<AvatarUpload
	image={previewUrl}
	onUpload={(file) => {
		setSelectedFile(file);
	}}
/>
```

## Props

- `onUpload`: `(file: File) => void`
- `image?`: `string`
- `icon?`: `React.ReactNode`
- `Props?`:
	- `IconButtonProps?: IconButtonProps`
	- `BadgeProps?: BadgeProps`
	- `InputProps?: React.InputHTMLAttributes<HTMLInputElement>`

## Hinweise

- Standardmaesse des Avatars sind `128x128`.
- Ohne eigenes `icon` wird ein Kamera-Icon als Badge angezeigt.

