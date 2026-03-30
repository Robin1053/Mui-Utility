import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const testAppDir = join(root, "Test");

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const normalizedName = pkg.name.startsWith("@")
  ? pkg.name.slice(1).replace("/", "-")
  : pkg.name;
const tarballName = `${normalizedName}-${pkg.version}.tgz`;

const run = (command, cwd = root) => {
  execSync(command, {
    cwd,
    stdio: "inherit",
  });
};

run("npm run build");
run("npm pack");
run(`npm i ../${tarballName}`, testAppDir);
run("npm run dev", testAppDir);
