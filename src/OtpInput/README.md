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
- `TextFieldsProps?: TextFieldProps | ((index: number) => TextFieldProps)` Props je Textfeld

## Verhalten

- Unterstuetzt Tasten-Navigation mit Pfeilen, `Home`, `End` und `Backspace`
- Unterstuetzt Paste ueber mehrere Felder
- Selektiert den Inhalt beim Fokus, um Eingabe zu beschleunigen

