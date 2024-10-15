import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // Use Node.js globals
      },
      parserOptions: {
        ecmaVersion: 2021, // Specify ECMAScript version
        sourceType: "module", // Enable ES module syntax
      },
    },
  },
  pluginJs.configs.recommended, // Use recommended rules from ESLint
  {
    rules: {
      quotes: ["error", "double"], // Enforce single quotes
      semi: ["error", "always"], // Require semicolons
      indent: ["error", 2], // Use 2 spaces for indentation
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Warn on unused variables
    },
  },
];
