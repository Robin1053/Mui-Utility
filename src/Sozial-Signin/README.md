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

- `sx` aus `Props.ButtonProps` wird mit den Standard-Styles gemergt und gewinnt bei Konflikten.

## Theming

Themebar ueber `theme.components.MuiSocialSigninButton` mit den Slots `root` (`Button` bzw. `IconButton`
bei `variant="circle"`), `icon`, `label` und `progress`. `ownerState` enthaelt alle Props plus
`variant` (`"large"`/`"circle"`), `providerStyles`, `iconSize`, `buttonWidth`, `isLoading` und `hasError`:

```tsx
const theme = createTheme({
  components: {
    MuiSocialSigninButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: ownerState.variant === "circle" ? "50%" : 8,
        }),
      },
      variants: [{ props: { Provider: "github" }, style: { fontWeight: 600 } }],
    },
  },
});
```

`ref` zeigt auf den Button.
