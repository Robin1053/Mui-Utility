#!/usr/bin/env node
// Kleine SemVer-Helfer fuer die Release-Actions, ohne Abhaengigkeiten.
//
//   node semver.mjs latest [prefix]      -> hoechste Tag-Version, z.B. 1.1.6 (Standard-Prefix "V")
//   node semver.mjs bump <version> <part> -> naechste Version (part: major | minor | patch)
//   node semver.mjs gt <a> <b>            -> "true", wenn a > b
//   node semver.mjs stamp <version> <datei...> -> ersetzt "Version: x.y.z" in den Dateien
//
// Nur reine major.minor.patch-Versionen werden akzeptiert. Tags, die nicht
// passen (z.B. "V.1.1.3"), werden bei "latest" ignoriert.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const VERSION_PATTERN = /^(\d+)\.(\d+)\.(\d+)$/;

function parse(version) {
  const match = VERSION_PATTERN.exec(version);
  if (!match) {
    throw new Error(`Ungueltige Version: "${version}" (erwartet major.minor.patch)`);
  }
  return match.slice(1).map(Number);
}

function compare(a, b) {
  const left = parse(a);
  const right = parse(b);
  for (let i = 0; i < 3; i++) {
    if (left[i] !== right[i]) return left[i] - right[i];
  }
  return 0;
}

function latest(prefix) {
  const versions = execFileSync("git", ["tag", "--list", `${prefix}*`], { encoding: "utf8" })
    .split("\n")
    .map((tag) => tag.trim().slice(prefix.length))
    .filter((version) => VERSION_PATTERN.test(version));
  return versions.sort(compare).at(-1) ?? "0.0.0";
}

function bump(version, part) {
  const [major, minor, patch] = parse(version);
  switch (part) {
    case "major":
      return `${major + 1}.0.0`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "patch":
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`Unbekannter Bump-Typ: "${part}" (erwartet major | minor | patch)`);
  }
}

// Ersetzt jede Zeile der Form "Version: 1.2.3" (auch "- Version: 1.2.3 (...)")
// durch die neue Version. Fehlende Dateien werden mit Warnung uebersprungen.
function stamp(version, files) {
  parse(version);
  const pattern = /(\bVersion:\s*)\d+\.\d+\.\d+/g;
  for (const file of files) {
    if (!existsSync(file)) {
      console.log(`::warning::${file} nicht gefunden, uebersprungen.`);
      continue;
    }
    const before = readFileSync(file, "utf8");
    const after = before.replace(pattern, `$1${version}`);
    if (after !== before) {
      writeFileSync(file, after);
      console.log(`${file}: Version auf ${version} gesetzt.`);
    }
  }
}

const [command, ...args] = process.argv.slice(2);

try {
  switch (command) {
    case "latest":
      console.log(latest(args[0] ?? "V"));
      break;
    case "bump":
      console.log(bump(args[0], args[1]));
      break;
    case "gt":
      console.log(String(compare(args[0], args[1]) > 0));
      break;
    case "stamp":
      stamp(args[0], args.slice(1));
      break;
    default:
      throw new Error(`Unbekannter Befehl: "${command}" (latest | bump | gt | stamp)`);
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
