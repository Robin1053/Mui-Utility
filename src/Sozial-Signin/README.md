# SocialSigninButton

`SocialSigninButton` stellt vordefinierte Social-Login-Buttons bereit.
Unterstuetzt werden `large` und `circle` Varianten sowie eigene Custom-Provider.

## Import

```tsx
import { SocialSigninButton } from "@robineb/mui-utility";
```

## Beispiel (Large)

```tsx
<SocialSigninButton
	Provider="google"
	action={async () => {
		await signInWithGoogle();
	}}
	Notification={{
		useNotification: true,
		successmessage: "Anmeldung erfolgreich",
		errormessage: "Anmeldung fehlgeschlagen",
	}}
/>
```

## Beispiel (Circle)

```tsx
<SocialSigninButton Provider="github" variant="circle" size="medium" />
```

## Built-in Provider

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

## Props (Auszug)

- `Provider`: built-in oder custom Provider-Konfiguration
- `variant?`: `"large" | "circle"`
- `OnClick?`: Mouse-Click-Handler
- `action?`: Async/Sync-Action
- `loading?`: `boolean`
- `disabled?`: `boolean`
- `Notification?`: wie bei `ActionButton`
- `maxWidth?`: nur fuer `large`
- `size?`: nur fuer `circle` (`"small" | "medium" | "large"`)

## Hinweise

- Fuer Notification-Ausgaben muss `NotificationProvider` gesetzt sein.
- Mit `resolveButtonWidth` kann die Breitenlogik separat genutzt werden.

