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
		return { error: false };
	}}
	onSuccess={() => {
		console.log("saved");
	}}
	onError={(error) => {
		console.error(error);
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

- `action`: `() => ActionButtonResult | void | Promise<ActionButtonResult | void>`
- `onSuccess?`: `(result: ActionButtonResult | void) => void`
- `onError?`: `(error: Error, result?: ActionButtonResult) => void`
- `onSettled?`: `() => void`
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

`ActionButtonResult`:
- `{ error: boolean; message?: string }`

## Hinweise

- Fuer `Notification` muss `NotificationProvider` im React-Tree vorhanden sein.
- Bei `destructive={true}` wird eine Error-Farbwelt fuer Button/Dialog-Action genutzt.


## Theming

Themebar ueber `theme.components.MuiActionButton` mit den Slots `root` (Wrapper-`div`), `button` und `dialog`.
`ownerState` enthaelt alle Props plus `loading`, `hasError` und `dialogOpen`:

```tsx
const theme = createTheme({
  components: {
    MuiActionButton: {
      defaultProps: { requireAreYouSure: true },
      styleOverrides: {
        button: ({ ownerState }) => ({ borderStyle: ownerState.loading ? "dashed" : "solid" }),
      },
      variants: [{ props: { destructive: true }, style: { fontWeight: 700 } }],
    },
  },
});
```

`ref` zeigt auf den Wrapper-`div`.
