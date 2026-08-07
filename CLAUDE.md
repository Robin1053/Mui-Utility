# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@robineb/mui-utility` — a published npm library of React/MUI utility components (ActionButton, NotificationProvider, Passwordfield, AvatarUpload, SocialSigninButton, OtpInput) plus shared helpers and types. There is no app here; the only runnable UI is the `Test/` Vite sandbox used to smoke-test the *packaged* build.

## Commands

```bash
npm test                                    # Jest, runs against src (no build needed)
npm test -- -t "pattern"                    # single test by name
npm test -- src/OtpInput/OtpInput.test.tsx  # single test file
npm run test:coverage
npm run build                               # tsup -> dist/ + .d.ts
npm run dev                                 # tsup watch; updates dist only, does NOT reinstall into Test/
npm run test:vite                           # build -> npm pack -> npm i ../<tarball> in Test/ -> vite dev
```

There is no lint or typecheck script at the root. CI (`.github/workflows/ci.yml`) runs `npm ci && npm run build && npm test`.

`npm run test:vite` installs the tarball into `Test/` exactly once — it does not watch. Re-run it after source changes you want reflected there.

## Architecture

**Every directory containing an `index.ts` is a build entry and therefore a public subpath.** `build` runs `tsup "src/**/index.ts"`, and the `exports` map in package.json points at `dist/*/index.*` and `dist/*/*/index.*`. Changing the source folder layout silently changes the published API surface, so source layout, the exports map, and the build glob must be kept in sync.

**Source files import the package by its own name, not by relative path.** e.g. `import type { ActionButtonProps } from "@robineb/mui-utility"`. This self-reference resolves three different ways and all three must keep working:
- `tsconfig.json` → `paths` (editor + `tsc`)
- `jest.config.ts` → `moduleNameMapper` (this is why tests need no prior build)
- tsup/esbuild reads the same tsconfig `paths` at build time

**Types are separated from implementations.** Props/`*.d.ts` live in `src/@types/`, are barrelled through `src/@types/index.ts`, and are re-exported from the root `src/index.ts`. A new component's props type goes in `src/@types/<Component>.d.ts` and gets added to that barrel — not colocated with the component.

**`Notification/` is the one nested case.** `Notifications.tsx` holds both the provider and the hook; `Notification/NotificationProvider/index.ts` and `Notification/useNotification/index.ts` are thin re-export folders that exist purely to create the deep subpath exports. `ActionButton` consumes `useNotification` directly, so any component using notifications must be rendered inside a `NotificationProvider` (tests wrap with a `renderWithNotifications` helper).

**Publishing.** `files: ["dist"]` — only `dist` is packed. Always `npm run build` before `npm pack` or `npm publish`. Publishing is triggered by a GitHub release (`.github/workflows/npm-publish.yml`).

Note: MUI/React/emotion are declared under `dependencies`, not `peerDependencies`.

## Adding a component

1. `src/<Component>/<Component>.tsx` + `index.ts` (`export { default } from "./<Component>"`)
2. `src/@types/<Component>.d.ts`, added to `src/@types/index.ts`
3. Re-export from `src/index.ts`
4. `src/<Component>/<Component>.test.tsx`
5. `src/<Component>/README.md` — each component folder carries its own README; update it when the API changes

## Conventions

Binding project rules, duplicated verbatim in `.claude/instructions.md` and `.github/instructions/copilot-instructions.md`. Both files apply to any agent working here, Copilot or otherwise — only the closing "Agent-Hinweis" line is Copilot-specific.

**Code standards**
- Write strict-conformant TypeScript. Note that `tsconfig.json` does not currently set `"strict": true` and there is no root typecheck script, so nothing enforces this — hold the line manually.
- Export components through their folder's `index.ts`.
- Keep public APIs backwards compatible; avoid unnecessary breaking changes.
- Small, clearly named props interfaces. Descriptive names for functions and variables.
- Extract shared logic into `src/helpers/` rather than duplicating it.
- No `any` — use precise or generic types. The existing `any` usages in `src/helpers/react.ts` and `src/helpers/useEvent.ts` are annotated with eslint-disable comments.
- No umlauts or other language-specific characters in code; use descriptive English names. (Prose, comments, and test descriptions in this repo are German.)

**Tests**
- At least one unit test for every new feature; a regression test for every bugfix.
- Never disable an existing test.

**Documentation**
- Update the README in the affected component folder.
- Add short usage examples whenever the API changes.

**Before finishing a change**
- Build and tests pass locally (`npm run build && npm test`).
- No unnecessary breaking changes.
- Accessibility (ARIA/keyboard) considered where relevant — see the `aria-busy`/`aria-invalid` handling in `ActionButton` and `KEYBOARD_KEY` in `src/helpers/Keyboard.ts`.
