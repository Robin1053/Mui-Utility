# Notification

Die Notification-Komponente stellt einen globalen Toast-Mechanismus bereit.
Verfuegbar sind `NotificationProvider` und der Hook `useNotification`.

## Import

```tsx
import { NotificationProvider, useNotification } from "@robineb/mui-utility";
```

## Beispiel

```tsx
function SaveButton() {
	const { notify } = useNotification();

	return (
		<button
			onClick={() =>
				notify({
					type: "success",
					message: "Aenderungen gespeichert",
				})
			}
		>
			Save
		</button>
	);
}

function App() {
	return (
		<NotificationProvider>
			<SaveButton />
		</NotificationProvider>
	);
}
```

## API

- `NotificationProvider`: Wrapper fuer den React-Baum
- `useNotification`: Hook mit Rueckgabe `{ notify }`
- `notify(toast)` akzeptiert:
	- `message: string`
	- `type: "success" | "error" | "info" | "warning"`

## Verhalten

- Anzeige als MUI `Snackbar` + `Alert`
- `autoHideDuration` ist aktuell auf `4000ms` gesetzt
- Position ist unten links (`bottom-left`)

