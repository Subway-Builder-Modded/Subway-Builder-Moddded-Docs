const js = require("@eslint/js");
const globals = require("globals");
const markdown = require("eslint-plugin-markdown");

module.exports = [
  {
    ignores: ["build/**", "node_modules/**", ".docusaurus/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["src/**/*.js"],
    rules: {
      "no-unused-vars": "off",
    },
  },
  ...markdown.configs.recommended,
];
