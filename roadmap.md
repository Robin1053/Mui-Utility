# Mui-Utility Roadmap

Stand: 2026-03-21

## Vision
Leichtgewichtige MUI Utility-Bibliothek mit sofort nutzbaren, sauber typisierten UI-Bausteinen.

## Aktueller Stand

### Done

1. ActionButton
- Async action handling
- Optionaler Confirm-Dialog
- Optionales Notification-Feedback
- Basis-Accessibility (aria-busy, aria-invalid)

2. NotificationProvider + useNotification
- Globales Snackbar/Alert Handling
- Einheitliche Toast Types: success, error, info, warning

3. Passwordfield
- Show/Hide Passwort Toggle
- Optionale Strength-Anzeige ueber Progressbar

4. AvatarUpload
- Bildauswahl ueber File Input
- Callback mit ausgewaehlter Datei

5. SocialButton
- Varianten: large, circle
- Built-in Provider: google, microsoft, apple, github, facebook, linkedin, x, gitlab, discord, slack, passkey
- Custom Provider Konfiguration moeglich

6. Testbasis vorhanden
- Unit/Interaction Tests fuer alle Kernkomponenten
- Aktueller Stand: 23/25 Tests gruen

### In Progress / Offen

1. SocialButton Theme Edge Cases
- Offene TODOs bei Circle-Icon Farben fuer einzelne Provider in Dark/Light.

2. NotificationProvider Erweiterbarkeit
- Offenes TODO fuer konfigurierbare Provider-Defaults.



## Next Milestones

### Milestone 1: API Konsolidierung (kurzfristig)

1. Prop-Namen vereinheitlichen
- `OnClick` vs. `onClick`
- `Provider` vs. `provider`
- `Props` Wrapper ggf. aufbrechen oder klar dokumentieren

2. Action handling in SocialButton finalisieren
- Interner Loading/Disabled Flow ueber `action`
- Eindeutige Prioritaet zwischen externem und internem Loading

3. Notification API verbessern
- Optional sugar helpers wie `notify.success("...")`
- Queue/Stack Verhalten festlegen und dokumentieren

### Milestone 2: Komponenten-Ausbau (mittelfristig)

1. CopyButton
2. ConfirmIconButton
3. DebouncedTextField
4. SearchField mit Clear Action

### Milestone 3: DX und Release-Qualitaet

1. Dokumentation pro Komponente
- Props, Beispiele, Edge Cases

2. Testing
- Fehlerhafte Tests reparieren
- Coverage fuer offene Zweige erweitern

3. Theming
- Light/Dark Konsistenz ueber alle Provider und Varianten

## Definition of Done (pro Komponente)

1. Vollstaendige TypeScript Typisierung
2. MUI-konforme Accessibility
3. Mindestens ein getesteter Happy Path und ein Error Path
4. Dokumentiertes Beispiel in der README
5. Export ueber zentralen Einstiegspunkt

