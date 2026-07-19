import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import importX from "eslint-plugin-import-x";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, "import-x": importX },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-case-declarations": "off",
      "no-var": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "import-x/extensions": ["error", "ignorePackages", { js: "always" }],
    },
  },
]);
