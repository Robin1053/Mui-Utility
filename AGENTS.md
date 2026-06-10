High-signal notes for automated agents working on this repo

Keep this file minimal — include only facts an agent would likely miss.

Commands
- Build library (produces dist and types):
  npm run build

- Run unit tests (Jest):
  npm test
  - Single-test/filter: npm test -- -t "nameOrPattern"

- Run the provided integration/dev flow (build + pack + install into the Test app + start Vite):
  npm run test:vite
  - This script runs: build -> npm pack -> npm i ../<tarball> (inside Test) -> npm run dev (in Test)
  - Tarball naming: scoped names are normalized. Example: @scope/name -> scope-name-<version>.tgz

- Local watch build (root only):
  npm run dev
  - This starts tsup in watch mode and updates dist, but it does NOT automatically reinstall into Test.

Packaging / publishing gotchas
- package.json.files = ["dist"] — only dist is published/packed. Always run npm run build before npm pack or publish.
- Exports map expects the dist layout (dist/*/index.*). tsup is invoked as: tsup "src/**/index.ts" --dts --clean.
  Changing source layout or exports requires adjusting build inputs and the exports map together.

Testing and module resolution
- jest runs against source via ts-jest. The Jest config maps @robineb/mui-utility and @robineb/mui-utility/* -> src/ so tests import the package name and run without a prior build (see jest.config.ts).
- Jest environment: jsdom. Setup: src/jest.setup.ts imports @testing-library/jest-dom.

Integration app (Test/)
- Test is a small Vite app used to validate the packaged library. The repo provides scripts/test-vite.mjs to pack + install into Test and start it.
- test:vite expects the tarball at ../<normalized-name>-<version>.tgz relative to Test when it runs npm i.

Developer flow notes an agent would miss
- Don't assume tests require a build — Jest is configured to run against src via moduleNameMapper.
- Do assume publishing/packing requires a fresh build because files only include dist.
- test:vite automates an install into Test once; it does not watch and re-install on subsequent source changes.

Where to look (quick)
- package.json (scripts, exports, files)
- jest.config.ts (test mapping)
- scripts/test-vite.mjs (integration flow)
- src/index.ts (root exports and subpath layout)

If something here looks wrong, verify by reading the exact file referenced above — prefer these executable configs over prose.
