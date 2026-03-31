# ActionButton

`ActionButton` kapselt synchrone/asynchrone Aktionen in einem MUI-Button.
Optional kann vor der Ausfuehrung ein Bestaetigungsdialog erscheinen.
Zusaetzlich kann bei Erfolg/Fehler eine Notification aus dem Notification-Kontext angezeigt werden.

## Import

```tsx
import { ActionButton } from "@robineb/mui-utility";
```

## Beispiel

```tsx
<ActionButton
	action={async () => {
		await saveUser();
	}}
	requireAreYouSure
	Dialog={{
		dialogTitle: "Nutzer speichern",
		dialogContent: "Willst du die Aenderungen wirklich speichern?",
		confirmText: "Speichern",
	}}
	Notification={{
		useNotification: true,
		successmessage: "Erfolgreich gespeichert",
		errormessage: "Speichern fehlgeschlagen",
	}}
>
	Speichern
</ActionButton>
```

## Props

- `action`: `() => void | Promise<void>`
- `children`: `React.ReactNode`
- `requireAreYouSure?`: `boolean`
- `icon?`: `React.ReactNode`
- `destructive?`: `boolean`
- `fullWidth?`: `boolean`
- `Dialog?`: `{ dialogTitle?: React.ReactNode; dialogContent?: React.ReactNode; confirmText?: string }`
- `Props?`: `{ ButtonProps?: ButtonProps; DialogProps?: DialogProps }`
- `Notification?`:
	- `{ useNotification: true; successmessage: string; errormessage: string }`
	- oder `{ useNotification?: false }`

## Hinweise

- Fuer `Notification` muss `NotificationProvider` im React-Tree vorhanden sein.
- Bei `destructive={true}` wird eine Error-Farbwelt fuer Button/Dialog-Action genutzt.

