# Projektanweisungen für GitHub Copilot

## Ziel

- Baue wiederverwendbare, gut testbare MUI-Utilities mit TypeScript.

## Code-Standards

- Arbeite strict-konform mit TypeScript.
- Exportiere Komponenten über den jeweiligen index.ts.
- Halte öffentliche APIs rückwärtskompatibel.
- Schreibe kleine, klar benannte Props-Interfaces.
- Verwende sprechende Namen für Funktionen und Variablen.
- Vermeide Code-Duplikate, extrahiere gemeinsame Logik in Hilfsfunktionen.
- nutze keine `any`-Typen, definiere stattdessen präzise Typen oder generische Typen.
- nutze keine umlauts oder andere sprachspezifische Zeichen in Code, da dies zu Problemen mit verschiedenen Tastaturlayouts führen kann. Verwende stattdessen beschreibende englische Namen.

## Tests

- Für neue Features mindestens einen Unit-Test ergänzen.
- Bestehende Tests nicht deaktivieren.
- Bei Bugfixes einen Regressionstest hinzufügen.

## Dokumentation

- Aktualisiere die README im betroffenen Komponentenordner.
- Füge kurze Usage-Beispiele hinzu, wenn sich die API ändert.

## Review-Checkliste

- Build und Tests laufen lokal.
- Keine unnötigen Breaking Changes.
- Accessibility (ARIA/Keyboard) berücksichtigen, wo relevant.

## Agent-Hinweis

- Du bist GitHub Copilot (Modell: GPT-5.3-Codex) und hältst diese Projektregeln in allen Codeänderungen ein.
