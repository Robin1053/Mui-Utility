# Mui-Utility Roadmap

## Vision
Eine leichtgewichtige MUI-Utility-Bibliothek mit sofort nutzbaren UI-Bausteinen:
- schnell integrierbar
- konsistente API
- wenig Boilerplate

---

## Phase 1 – MVP (kurzfristig)

### 1) Social Sign-In Button
**Ziel:** Ein einheitlicher Login-Button für verschiedene Anbieter mit minimalem Setup.

**Features:**
- Unterstützte Anbieter: Google, GitHub, Microsoft, Apple, Facebook (erweiterbar)
- Einheitliche Props: `provider`, `onClick`, `loading`, `disabled`, `variant`, `size`
- Vordefinierte Icons und Farben im MUI-Stil
- Optional: nur Icon / Icon + Label

**Abnahmekriterien:**
- Import + Nutzung in < 5 Zeilen
- Konsistentes Verhalten über alle Anbieter
- Vollständig typisiert (TypeScript)

### 2) Dialog Button
**Ziel:** Ein Button, der direkt einen Standard-Dialog öffnet (Confirm, Alert, Custom).

**Features:**
- Modi: `confirm`, `alert`, `custom`
- Props für Titel, Content, Confirm/Cancel Labels
- Callbacks: `onConfirm`, `onCancel`, `onClose`

**Abnahmekriterien:**
- Kein manuelles State-Handling im Consumer nötig
- Accessibility via MUI Dialog-Standards
- Klarer API-Vertrag für einfache und erweiterte Nutzung

### 3) Schnelle Notification (ohne Objekt-Konfiguration)
**Ziel:** Notification per einfachem Funktionsaufruf, z. B. `notify.success("Gespeichert")`.

**Features:**
- Globaler Provider + Hook/Utility (`notify`)
- Methoden: `success`, `error`, `warning`, `info`
- Optionale Defaults (Dauer, Position) zentral konfigurierbar
- Keine Pflicht für komplexe Options-Objekte

**Abnahmekriterien:**
- Nutzung per Import + Einzeiler
- Saubere Queue für mehrere Meldungen
- Einheitliches Styling über die Library

---

## Phase 2 – Sinnvolle Erweiterungen (mittelfristig)

### 4) CopyButton
Button mit integriertem Copy-to-Clipboard + optionaler Success-Notification.

### 5) AsyncActionButton
**Ausbau vom bestehenden `ActionButton` (kein neuer separater Kern nötig).**

**Ziel:** Deinen vorhandenen `ActionButton` gezielt erweitern, damit Async-Flows sauber und wiederverwendbar abgedeckt sind.

**Geplante Erweiterungen:**
- Statusmodell vereinheitlichen: `idle`, `loading`, `success`, `error`
- Optionales `onSuccess` / `onError` Callback für Side-Effects
- Konfigurierbares Verhalten nach Erfolg (`autoReset`, `closeOnSuccess`)
- Fehlerdarstellung optional inline + optional via Notification
- Bestehende API kompatibel halten (keine Breaking Changes im MVP)

**Abnahmekriterien:**
- Bestehende `ActionButton`-Verwendungen laufen unverändert weiter
- Async-Use-Case ohne zusätzlichen Boilerplate im Consumer
- Loading/Disabled/Aria-Verhalten konsistent dokumentiert

### 6) ConfirmIconButton
IconButton, der vor der Aktion optional eine Bestätigung verlangt.

### 7) Form Utilities
- `DebouncedTextField`
- `SearchField` (mit Clear-Button)
- Einheitliche Validierungs- und Fehlerdarstellung für häufige Form-Patterns

---

## Phase 3 – Developer Experience (DX)

### 8) Dokumentation & Beispiele
- Kompakte README pro Komponente
- Copy-Paste-Beispiele für Standardfälle
- Prop-Tabellen und Best Practices

### 9) Theming & Konsistenz
- Volle Theme-Kompatibilität mit MUI (`palette`, `shape`, `typography`)
- Einheitliche Größen, Spacing, States

### 10) Testabdeckung
- Unit-Tests für Kernlogik
- Interaktions-Tests für Dialog/Notification Flows

---

## Vorschlag für Reihenfolge (konkret)
1. Schnelle Notification
2. Dialog Button
3. Social Sign-In Button
4. AsyncActionButton
5. CopyButton + ConfirmIconButton
6. Form Utilities
7. Doku + Test-Finalisierung

## Definition of Done (für jede Komponente)
- TypeScript-Typen vollständig
- MUI-konforme Accessibility
- Mindestens 1 Nutzungsbeispiel in der Doku
- Export über zentralen Einstiegspunkt

