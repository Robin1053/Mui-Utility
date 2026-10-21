# NotificationProvider + useNotification

`NotificationProvider` stellt per Context eine `notify`-Funktion bereit und zeigt die Meldung als MUI-`Snackbar`
mit `Alert` an. Komponenten wie `ActionButton` und `SocialSigninButton` nutzen sie und muessen daher innerhalb
eines `NotificationProvider` gerendert werden.

## Import

```tsx
import { NotificationProvider, useNotification } from "@robineb/mui-utility";
```

## Beispiel

```tsx
function SaveButton() {
  const { notify } = useNotification();
  return <button onClick={() => notify({ type: "success", message: "Gespeichert" })}>Speichern</button>;
}

<NotificationProvider autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
  <SaveButton />
</NotificationProvider>;
```

## Props

- `children`: `React.ReactNode`
- `autoHideDuration?`: `number | null` (Default `4000`)
- `anchorOrigin?`: `SnackbarOrigin` (Default `{ vertical: "bottom", horizontal: "left" }`)
- `Props?`: `{ SnackbarProps?: Partial<SnackbarProps>; AlertProps?: Partial<AlertProps> }`

## Theming

Themebar ueber `theme.components.MuiNotificationProvider` mit den Slots `root` (`Snackbar`) und `alert`.
`ownerState` enthaelt alle Props plus `open` und `type` (Typ der aktuellen Meldung):

```tsx
const theme = createTheme({
  components: {
    MuiNotificationProvider: {
      defaultProps: { autoHideDuration: 6000 },
      styleOverrides: {
        alert: ({ ownerState }) => ({ fontWeight: ownerState.type === "error" ? 700 : 400 }),
      },
    },
  },
});
```
