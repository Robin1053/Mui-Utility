import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
    moduleNameMapper: {
        // Path aliases
        "^@/(.*)$": "<rootDir>/src/$1",
        // CSS/Asset imports ignorieren
        "\\.(css|less|scss)$": "identity-obj-proxy",
    },
};

export default config;