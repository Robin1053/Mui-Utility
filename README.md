![License](https://img.shields.io/github/license/Robin1053/Mui-Utility)
![last commit](https://img.shields.io/github/last-commit/Robin1053/Mui-Utility)
[![Repo Size](https://img.shields.io/github/repo-size/Robin1053/Mui-Utility)](https://github.com/Robin1053/Mui-Utility)
[![Top Language](https://img.shields.io/github/languages/top/Robin1053/Mui-Utility)](https://github.com/Robin1053/Mui-Utility)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)


# @robineb/mui-utility

Utility-Komponenten fuer MUI-Projekte.

## Projektstatus (Stand: 2026-03-21)

Version: `1.0.2`

Aktuell implementiert und exportiert:

- `ActionButton`
- `NotificationProvider` + `useNotification`
- `Passwordfield`
- `AvatarUpload`
- `SocialButton` (+ Provider-Typen)
- `SVGs` Namespace-Export fuer Social Icons

Teststatus (Jest):

- 5 Test-Suites gesamt
- 4 bestanden
- 1 fehlgeschlagen (`Social-Button.test.tsx`)
- 25 Tests gesamt, 23 bestanden, 2 fehlgeschlagen

Bekannte offene Punkte im Code:

- `SocialButton`: `action` Prop ist vorgesehen, aber noch nicht umgesetzt.
- `SocialButton`: TODO fuer bestimmte Circle-Icon Farbfaelle (Facebook/LinkedIn in Dark/Light).
- `NotificationProvider`: TODO fuer erweiterte Provider-Props.

## Installation

```bash
npm install @robineb/mui-utility
```

Peer Dependencies:

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
  SocialButton,
  SVGs,
} from "@robineb/mui-utility";
```

## Quick Start

```tsx
import React from "react";
import { NotificationProvider, ActionButton } from "@robineb/mui-utility";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <NotificationProvider>{children}</NotificationProvider>;
}

export function ExampleAction() {
  return (
    <ActionButton action={async () => {}}>
      Run Action
    </ActionButton>
  );
}
```

## Komponenten

### ActionButton

Button fuer Async-Aktionen mit optionalem Confirm-Dialog und optionalen Notifications.

Wichtige Props:

- `action: () => void | Promise<void>` (required)
- `children: React.ReactNode` (required)
- `requireAreYouSure?: boolean`
- `destructive?: boolean`
- `icon?: React.ReactNode`
- `Dialog?: { dialogTitle?: React.ReactNode; dialogContent?: React.ReactNode; confirmText?: string }`
- `Props?: { ButtonProps?: ButtonProps; DialogProps?: DialogProps }`
- `Notification?: { useNotification: true; successmessage: string; errormessage: string } | { useNotification?: false }`

Hinweis: Die API nutzt aktuell `Dialog` und `Props` (nicht `DialogProps`/`ButtonProps` auf Top-Level).

### NotificationProvider + useNotification

Globales Snackbar/Alert-Handling ueber Context.

`notify` Signatur:

```ts
notify({ message: string, type: "success" | "error" | "info" | "warning" });
```

### Passwordfield

Password-Input mit Show/Hide-Toggle und optionaler Strength-Bar.

Wichtige Props:

- `children: React.ReactNode` (Label)
- `showstrength?: boolean`
- `loading?: boolean`
- `error?: boolean`
- `value?: string`
- `onChange?: (...) => void`
- `Props?: { TextfieldProps?: OutlinedInputProps }`

### AvatarUpload

Avatar mit Upload-Trigger und optional anpassbarem Badge/Icon.

Wichtige Props:

- `onUpload: (file: File) => void` (required)
- `image?: string`
- `icon?: React.ReactNode`
- `Props?: { IconButtonProps?: IconButtonProps; BadgeProps?: BadgeProps; InputProps?: React.InputHTMLAttributes<HTMLInputElement> }`

### SocialButton

Social Sign-In Button mit `large` und `circle` Varianten.

Built-in Provider:

- `google`
- `microsoft`
- `apple`
- `github`
- `facebook`
- `linkedin`
- `x`
- `gitlab`
- `discord`
- `slack`
- `passkey`

Zusatz:

- Custom Provider ueber Objekt-Config moeglich.
- `loading`/`disabled` werden unterstuetzt.
- `maxWidth` fuer `large`, `size` fuer `circle`.

## Entwicklung

```bash
npm run build
npm test
```

## License

MIT
