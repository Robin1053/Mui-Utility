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


## Theming

Themebar ueber `theme.components.MuiAvatarUpload` mit den Slots `root` (`IconButton` als `<label>`), `badge`
und `avatar` (Default 128x128). `ownerState` enthaelt alle Props plus `hasImage`:

```tsx
const theme = createTheme({
  components: {
    MuiAvatarUpload: {
      styleOverrides: {
        avatar: { width: 96, height: 96 },
      },
      variants: [{ props: { hasImage: false }, style: { opacity: 0.8 } }],
    },
  },
});
```

`ref` zeigt auf das `<label>`.
