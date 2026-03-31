# Passwordfield

`Passwordfield` ist ein passwortspezifisches Input mit Toggle fuer Sichtbarkeit.
Optional wird die Passwortstaerke als Progress-Leiste angezeigt.

## Import

```tsx
import { Passwordfield } from "@robineb/mui-utility";
```

## Beispiel

```tsx
const [password, setPassword] = useState("");

<Passwordfield
	value={password}
	onChange={(event) => setPassword(event.target.value)}
	showstrength
>
	Passwort
</Passwordfield>;
```

## Props

- `children`: `React.ReactNode` (Label-Text)
- `value?`: `string`
- `onChange?`: `(event) => void`
- `showstrength?`: `boolean`
- `error?`: `boolean`
- `loading?`: `boolean`
- `Props?`: `{ TextfieldProps?: OutlinedInputProps }`

## Hinweise

- Ohne `value` arbeitet die Komponente intern uncontrolled.
- Mit `value` + `onChange` controlled nutzen.
- Die Staerkeanzeige basiert auf `getPasswordStrength`.

