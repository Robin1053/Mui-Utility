# @robineb/mui-utility

Utility components for MUI projects.

`@robineb/mui-utility` provides lightweight building blocks you can reuse across apps:

- `ActionButton`: Button with async action handling, optional confirmation dialog, error state, and optional toast notifications.
- `NotificationProvider` + `useNotification`: Global snackbar/alert notification context based on MUI.

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
import { ActionButton, NotificationProvider, useNotification } from "@robineb/mui-utility";
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
				sx: { "& .MuiPaper-root": { borderRadius: 3 } }
			}}
			ButtonProps={{
				sx: { minWidth: 180 }
			}}
			Notification={{
				useNotification: true,
				successmessage: "User deleted",
				errormessage: "Delete failed"
			}}
		>
			Delete
		</ActionButton>
	);
}
```

## `ActionButton` API

Prop `action`: `() => void | Promise<void>`
Prop `requireAreYouSure`: `boolean` (default `false`)
Prop `icon`: `React.ReactNode`
Prop `destructive`: `boolean` (default `false`)
Prop `children`: `React.ReactNode`
Prop `DialogProps`: object
Prop `ButtonProps`: object
Prop `Notification`: notification config

`DialogProps` fields:

- `dialogTitle?: React.ReactNode`
- `dialogContent?: React.ReactNode`
- `confirmText?: string`
- `sx?: SxProps<Theme>`

`ButtonProps` fields:

- `sx?: SxProps<Theme>`

`Notification` supports two modes:

- Enabled mode: `{ useNotification: true, successmessage: string, errormessage: string }`
- Disabled mode: `{ useNotification?: false }`

## Notification Context

`useNotification()` gives access to:

```ts
notify({ message: string, type: "success" | "error" | "info" | "warning" })
```

Example:

```tsx
import { useNotification } from "@robineb/mui-utility";

function SaveButton() {
	const { notify } = useNotification();

	return (
		<button
			onClick={() => notify({ message: "Saved", type: "success" })}
		>
			Save
		</button>
	);
}
```

## Build (for contributors)

```bash
npm run build
```

## License

MIT