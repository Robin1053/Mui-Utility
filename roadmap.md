Roadmap — kurz und konkret

Ziel: kleines, wartbares UI-Utility-Paket für MUI-Projekte mit Fokus auf Wiederverwendbarkeit und Typ-Sicherheit.

Aktueller Stand (bestätigt):
- Version: 1.1.3 (siehe package.json)
- Komponenten: ActionButton, NotificationProvider/useNotification, Passwordfield, AvatarUpload, SocialSigninButton, OtpInput, Hilfsfunktionen, Typen
- Tests: Jest (ts-jest), laufen gegen src ohne vorherigen Build
- Paketlayout: tsup baut src/**/index.ts in dist/* — package.json export map erwartet dist/*/index.*

Kurzfristige Aufgaben (High priority)
1. Tests stabilisieren: mögliche fehlende Coverage- oder Mock-Fälle identifizieren und unit tests ergänzen.
2. CI hinzufügen/aktualisieren: falls kein CI vorhanden, mindestens GitHub Actions mit install -> build -> test -> pack prüfen.
3. Dokumentation: README und einzelne Komponenten-READMEs auffrischen (Props, Beispiele, Typ-Exporte).

Mittelfristig (Medium priority)
1. Type-Strictness: TypeScript-Compiler-Optionen überprüfen und ggf. strictere Regeln aktivieren (ggf. separate tsconfigs für build/test).
2. Release-Flow: Tagging / changelog-Politik (automatisiert via releases/semantic-release) hinzufügen.
3. Accessibility/A11y-Checks für interaktive Komponenten ergänzen.

Langfristig (Low priority)
1. Bereitstellung eines Playground/Test-App-Setups mit Live-Example-Links.
2. Mehr Beispiele und Storybook-Integration für visuelle Prüfungen.

Wo anfangen
- Lokaler Entwickler-Flow: npm install, npm run build, npm test, npm run test:vite
- Prüfe jest.config.ts und scripts/test-vite.mjs für das Verhalten von Tests und Integrations-Flow.

Wenn du möchtest, kann ich jetzt gezielt:
- fehlende Tests ergänzen (ein Komponententest als Beispiel), oder
- eine einfache GitHub Actions CI-Datei anlegen, die install/build/test ausführt.
