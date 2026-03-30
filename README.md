# @robineb/mui-utility

Utility-Komponenten für MUI-Projekte.

## Status

- Version: 1.1.0

## Installation

```bash
npm install @robineb/mui-utility
```

Abhängigkeiten:

- react ^18 || ^19
- react-dom ^18 || ^19
- @mui/material ^5 || ^6 || ^7
- @emotion/react ^11
- @emotion/styled ^11

## Import-Anleitung

Der Root-Import ist für benannte Importe gedacht:

```ts
import {
  ActionButton,
  NotificationProvider,
  useNotification,
  Passwordfield,
  AvatarUpload,
  SocialSigninButton,
  resolveButtonWidth,
  SVGs,
} from "@robineb/mui-utility";
```

Subpath-Importe sind ebenfalls verfügbar:

```ts
import NotificationProvider from "@robineb/mui-utility/Notification/NotificationProvider";
import useNotification from "@robineb/mui-utility/Notification/useNotification";
import ActionButton from "@robineb/mui-utility/ActionButton";
import Passwordfield from "@robineb/mui-utility/Passwordfield";
```

Hinweis: Der Pfad lautet jetzt `Notification` (wie im Paket exportiert).

## Schnellstart

```tsx
import React from "react";
import { NotificationProvider, ActionButton } from "@robineb/mui-utility";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <NotificationProvider>{children}</NotificationProvider>;
}

export function ExampleAction() {
  return (
    <ActionButton action={async () => {}}>
      Aktion ausführen
    </ActionButton>
  );
}
```

## Exporte

Root-Exporte:

- ActionButton
- NotificationProvider
- useNotification
- Passwordfield
- AvatarUpload
- SocialSigninButton
- resolveButtonWidth
- SVGs

Wichtige Typ-Exporte:

- ToastType, ToastMessage, NotificationContextValue
- ActionButtonProps
- PasswordfieldProps
- AvataruploadProps
- Social-Signin- und Provider-Typ-Exporte

## Komponenten

### ActionButton

Button für Async-Aktionen mit optionalem Bestätigungsdialog und optionalen Benachrichtigungen.

Wichtige Eigenschaften (Props):

- action: () => void | Promise<void>
- children: React.ReactNode
- requireAreYouSure?: boolean
- destructive?: boolean
- icon?: React.ReactNode
- Dialog?: { dialogTitle?: React.ReactNode; dialogContent?: React.ReactNode; confirmText?: string }
- Props?: { ButtonProps?: ButtonProps; DialogProps?: DialogProps }
- Notification?: { useNotification: true; successmessage: string; errormessage: string } | { useNotification?: false }

### NotificationProvider + useNotification

Globales Snackbar/Alert-Handling über Kontext.

notify-Signatur:

```ts
notify({ message: string, type: "success" | "error" | "info" | "warning" });
```

### Passwordfield

Passwort-Eingabefeld mit Anzeigen/Verbergen-Umschalter und optionaler Stärkeanzeige.

Wichtige Eigenschaften (Props):

- children: React.ReactNode
- showstrength?: boolean
- loading?: boolean
- error?: boolean
- value?: string
- onChange?: (...) => void
- Props?: { TextfieldProps?: OutlinedInputProps }

### AvatarUpload

Avatar mit Upload-Trigger und optional anpassbarem Badge/Icon.

Wichtige Eigenschaften (Props):

- onUpload: (file: File) => void
- image?: string
- icon?: React.ReactNode
- Props?: { IconButtonProps?: IconButtonProps; BadgeProps?: BadgeProps; InputProps?: React.InputHTMLAttributes<HTMLInputElement> }

### SocialSigninButton

Social-Sign-In-Button mit `large`- und `circle`-Varianten.

Integrierte Provider:

- google
- microsoft
- apple
- github
- facebook
- linkedin
- x
- gitlab
- discord
- slack
- passkey

## Entwicklung

```bash
npm run build
npm test
```

## Lizenz

MIT