# OtpInput

Die OtpInput-Komponente rendert mehrere MUI-Textfelder fuer One-Time-Passwords.
Sie arbeitet als kontrollierte Komponente ueber `value` und `onChange`.

## Import

```tsx
import { OtpInput } from "@robineb/mui-utility";
```

## Beispiel

```tsx
import * as React from "react";
import { OtpInput } from "@robineb/mui-utility";

function Example() {
  const [otp, setOtp] = React.useState("");

  return (
    <OtpInput
      value={otp}
      length={6}
      autoFocus
      onChange={setOtp}
      onComplete={(finalValue) => {
        console.log("OTP complete:", finalValue);
      }}
      validateChar={(character) => {
        return /[0-9]/.test(character);
      }}
    />
  );
}
```

## API

- `value?: string` Aktueller OTP-Wert
- `onChange?: (value: string) => void` Wird bei jeder Aenderung aufgerufen
- `length?: number` Anzahl der OTP-Felder (Default `4`)
- `onComplete?: (value: string) => void` Wird bei vollstaendigem OTP aufgerufen
- `validateChar?: (character: string, index: number) => boolean` Zeichengueltigkeit pro Position
- `autoFocus?: boolean` Fokus auf erstes Feld beim Mount
- `loading?: boolean` Deaktiviert alle Felder
- `error?: boolean` Setzt Fehlerzustand auf allen Feldern
- `TextFieldsProps?: TextFieldProps | ((index: number) => TextFieldProps)` Props je Textfeld.
  Attribute fuer das `<input>` selbst gehoeren in `slotProps.htmlInput` (MUI 9 kennt `inputProps` nicht mehr;
  unter MUI 7/8 uebergebene `inputProps` werden weiterhin uebernommen):

  ```tsx
  <OtpInput
    length={6}
    TextFieldsProps={(index) => ({
      slotProps: { htmlInput: { "data-testid": `otp-${index}` } },
    })}
  />
  ```
- `groups?: number` Teilt die Felder in n gleich grosse Gruppen auf (z.B. `length={6} groups={2}` -> `XXX-XXX`).
  Restfelder gehen an die vorderen Gruppen (`length={7} groups={3}` -> `XXX-XX-XX`). Wird abgerundet und auf
  `length` begrenzt.
- `separator?: React.ReactNode` Trennzeichen zwischen den Gruppen (Default `-`). Wird **nur** bei `groups >= 2`
  angezeigt und ist per `aria-hidden` vor Screenreadern verborgen:

  ```tsx
  <OtpInput length={6} groups={2} separator={<RemoveIcon fontSize="small" />} />
  ```
- `onBlur?: (value: string, isCompleted: boolean) => void` Wird aufgerufen, wenn der Fokus die gesamte Komponente verlaesst

## Theming

`OtpInput` ist eine vollwertige MUI-Komponente mit den Slots `root`, `input` und `separator`
und liest `defaultProps`/`styleOverrides`/`variants` ueber `theme.components.MuiOtpInput`.
`ownerState` enthaelt alle Props (mit aufgeloesten Defaults fuer `length`, `loading`, `error`); im
`input`-Slot zusaetzlich `index` und `filled`:

```tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiOtpInput: {
      defaultProps: { length: 6 },
      styleOverrides: {
        input: ({ ownerState, theme }) => ({
          width: 40,
          "& input": { fontWeight: ownerState.filled ? 700 : 400 },
          ...(ownerState.index === 0 && { marginLeft: theme.spacing(1) }),
        }),
        // Palette-Kurzschreibweisen wie "primary.main" funktionieren nur in `sx`, nicht hier
        separator: ({ theme }) => ({ color: theme.palette.primary.main }),
      },
      variants: [{ props: { error: true }, style: { animation: "shake 0.3s" } }],
    },
  },
});

<ThemeProvider theme={theme}>
  <OtpInput />
</ThemeProvider>;
```

## Verhalten

- Unterstuetzt Tasten-Navigation mit Pfeilen, `Home`, `End` und `Backspace`
- Unterstuetzt Paste ueber mehrere Felder
- Selektiert den Inhalt beim Fokus, um Eingabe zu beschleunigen
- Ein getipptes Zeichen ersetzt immer den Inhalt des aktiven Feldes, unabhaengig von der Cursorposition
- Das erste Feld traegt `autoComplete="one-time-code"`, damit iOS/Android Codes aus SMS oder Mail
  vorschlagen; der eingefuegte Code wird auf alle Felder verteilt. Ueberschreibbar via `TextFieldsProps`.

