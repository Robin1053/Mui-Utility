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
- `maxWidth?`: nur fuer `large`; legt die Mindestbreite fest, laengere Labels machen den Button breiter
- `size?`: nur fuer `circle` (`"small"` 32px, `"medium"` 40px (Default), `"large"` 48px)

## Farben und Masse

Die Farben folgen den offiziellen Vorgaben der Anbieter und wechseln automatisch mit `theme.palette.mode`:

| Provider | Hell | Dunkel | Quelle |
|---|---|---|---|
| Google | `#FFFFFF`, Rand `#747775`, Text `#1F1F1F` | `#131314`, Rand `#8E918F`, Text `#E3E3E3` | [Google Branding Guidelines](https://developers.google.com/identity/branding-guidelines) |
| Microsoft | `#FFFFFF`, Rand `#8C8C8C`, Text `#5E5E5E` | `#2F2F2F`, Text `#FFFFFF` | [Sign in with Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-branding-in-apps) |
| Slack | `#FFFFFF`, Rand `#DDDDDD`, Text `#000000` | `#4A154B`, Text `#FFFFFF` | [Sign in with Slack](https://docs.slack.dev/authentication/sign-in-with-slack/) |
| Facebook | `#1877F2`, Text `#FFFFFF` | wie hell | Facebook Brand-Blau |
| LinkedIn | `#0A66C2`, Text `#FFFFFF` | wie hell | LinkedIn Brand-Blau |
| Discord | `#5865F2`, Text `#FFFFFF` | wie hell | [Discord Branding](https://discord.com/branding) |
| GitHub | `#F6F8FA`, Rand `#D1D9E0` | `#212830`, Rand `#3D444D` | keine Sign-in-Vorgaben, Werte aus GitHubs Designsystem Primer |
| GitLab | `#FFFFFF`, Rand `#FC6D26`, Text `#171321` | `#171321`, Rand `#FC6D26` | Markenfarben; Text dunkel statt orange wegen Kontrast |

Hover-Farben, wo nicht vorgegeben, sind eine leichte Abdunklung bzw. Aufhellung (bei Google wie vorgegeben ein
8%-State-Layer). Masse nach Google: Hoehe 40px, 12px vor dem Logo, 10px zwischen Logo und Text, 12px nach dem
Text, Text in Satzschreibung ohne Umbruch.

Custom Provider verwenden die Farben aus `Provider.color`.

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
