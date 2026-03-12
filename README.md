# @robineb/mui-utility

Utility components for MUI projects.

`@robineb/mui-utility` provides lightweight building blocks you can reuse across apps:

- `ActionButton` — Button with async action handling, optional confirmation dialog, error state, and optional toast notifications.
- `NotificationProvider` + `useNotification` — Global snackbar/alert notification context based on MUI.
- `Passwordfield` — MUI `TextField` wrapper with a show/hide password toggle.
- `AvatarUpload` — Circular avatar with a camera-icon badge that opens a file picker.

## Installation

```bash
npm install @robineb/mui-utility
```

Peer dependencies:

- `react` `^18 || ^19`
- `react-dom` `^18 || ^19`
- `@mui/material` `^5 || ^6 || ^7`
- `@emotion/react` `^11`
- `@emotion/styled` `^11`

## Exports

```ts
import {
  ActionButton,
  NotificationProvider,
  useNotification,
  Passwordfield,
  AvatarUpload,
} from "@robineb/mui-utility";
```

## Quick Start

Wrap your app once with `NotificationProvider`:

```tsx
import React from "react";
import { NotificationProvider } from "@robineb/mui-utility";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <NotificationProvider>{children}</NotificationProvider>;
}
```

Use `ActionButton` in your UI:

```tsx
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ActionButton } from "@robineb/mui-utility";

function DeleteUserButton() {
  return (
    <ActionButton
      action={async () => {
        // your API call
        await new Promise((resolve) => setTimeout(resolve, 800));
      }}
      requireAreYouSure
      destructive
      icon={<DeleteOutlineIcon />}
      DialogProps={{
        dialogTitle: "Delete user?",
        dialogContent: "This action cannot be undone.",
        sx: { "& .MuiPaper-root": { borderRadius: 3 } },
      }}
      ButtonProps={{
        sx: { minWidth: 180 },
      }}
      Notification={{
        useNotification: true,
        successmessage: "User deleted",
        errormessage: "Delete failed",
      }}
    >
      Delete
    </ActionButton>
  );
}
```

## ActionButton

A button that wraps an async action with loading state, optional confirmation dialog, error colour, and optional toast notifications.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `action` | `() => void \| Promise<void>` | **Yes** | — | The async function to execute |
| `children` | `React.ReactNode` | **Yes** | — | Button label |
| `requireAreYouSure` | `boolean` | No | `false` | Show a confirmation dialog before executing |
| `destructive` | `boolean` | No | `false` | Colours the button and confirm button red |
| `icon` | `React.ReactNode` | No | — | Icon rendered as `startIcon` |
| `DialogProps` | `object` | No | `{}` | Customise the confirmation dialog (see below) |
| `ButtonProps` | `MuiButtonProps` | No | `{}` | Passed directly to the underlying MUI `Button` |
| `Notification` | `object` | No | `{}` | Configure success/error toast notifications (see below) |

#### `DialogProps`

| Field | Type | Description |
|-------|------|-------------|
| `dialogTitle` | `React.ReactNode` | Dialog heading (default: `"Confirm Action"`) |
| `dialogContent` | `React.ReactNode` | Dialog body text (default: `"Are you sure you want to do this?"`) |
| `confirmText` | `string` | Confirm button label (default: `"Yes"`) |
| `sx` | `SxProps<Theme>` | Styles applied to the `Dialog` root |

#### `Notification`

Two mutually exclusive shapes:

```ts
// Notifications enabled
{ useNotification: true; successmessage: string; errormessage: string }

// Notifications disabled (default)
{ useNotification?: false }
```

## NotificationProvider & useNotification

Wrap your app once with `NotificationProvider` (renders an MUI `Snackbar`/`Alert` at the bottom-left).
Anywhere inside the tree, call `useNotification()` to trigger a toast.

### `notify` signature

```ts
notify({ message: string, type: "success" | "error" | "info" | "warning" }): void
```

### Example

```tsx
import { useNotification } from "@robineb/mui-utility";

function SaveButton() {
  const { notify } = useNotification();

  return (
    <button onClick={() => notify({ message: "Saved!", type: "success" })}>
      Save
    </button>
  );
}
```

---

## Passwordfield

A thin wrapper around MUI `TextField` that adds a show/hide password toggle. Accepts all standard `TextFieldProps` (except `type`, which is managed internally).

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `loading` | `boolean` | No | `false` | Disables the field while true |
| `...TextFieldProps` | — | No | — | All other MUI `TextField` props are forwarded |

### Example

```tsx
import React from "react";
import { Passwordfield } from "@robineb/mui-utility";

function LoginForm() {
  const [password, setPassword] = React.useState("");

  return (
    <Passwordfield
      label="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  );
}
```

## AvatarUpload

A circular avatar with a camera-icon badge that opens a file picker on click.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `image` | `string` | No | URL of the currently displayed avatar |
| `onUpload` | `(file: File) => void` | **Yes** | Called with the selected `File` when the user picks an image |
| `icon` | `React.ReactNode` | No | Custom badge icon (defaults to `PhotoCameraIcon`) |

### Example

```tsx
import React from "react";
import { AvatarUpload } from "@robineb/mui-utility";

function ProfileAvatar() {
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);

  const handleUpload = (file: File) => {
    // e.g. upload to your server, then set the returned URL:
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
  };

  return <AvatarUpload image={imageUrl} onUpload={handleUpload} />;
}
```

## Build (for contributors)

```bash
npm run build
```

## License

MIT
