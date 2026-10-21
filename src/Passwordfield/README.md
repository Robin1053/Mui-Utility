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

- IDs werden per `useId` erzeugt, mehrere Instanzen auf einer Seite kollidieren nicht. Eine eigene id
  kann ueber `Props.TextfieldProps.id` gesetzt werden.

## Theming

Themebar ueber `theme.components.MuiPasswordfield` mit den Slots `root` (`FormControl`, Default
`margin: 1`, `width: 25ch`), `label`, `input`, `strength` (Staerkeanzeige) und `divider`.
`ownerState` enthaelt alle Props plus `strength` (0-100) und `showPassword`:

```tsx
const theme = createTheme({
  components: {
    MuiPasswordfield: {
      defaultProps: { showstrength: true },
      styleOverrides: {
        root: { width: "100%" },
        strength: ({ ownerState, theme }) => ({
          height: 4,
          "& .MuiLinearProgress-bar": {
            backgroundColor: ownerState.strength < 50 ? theme.palette.error.main : theme.palette.success.main,
          },
        }),
      },
    },
  },
});
```

`ref` zeigt auf das `FormControl`.
