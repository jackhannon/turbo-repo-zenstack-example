module.exports = {
  extends: ["next", "turbo", "prettier"],
  plugins: ["@typescript-eslint", "unused-imports"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",

    // allow "my-string" and `my-string`
    quotes: ["error", "double", { allowTemplateLiterals: true }],

    // "@next/next/no-html-link-for-pages": "off",

    // Don't enforce using <Image /> as it's next specific
    "@next/next/no-img-element": "off",
    "jsx-a11y/role-supports-aria-props": "off", // @see https://github.com/vercel/next.js/issues/27989#issuecomment-897638654
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
};
