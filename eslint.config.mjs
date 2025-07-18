import typescriptParser from "@typescript-eslint/parser";
import astroParser from "astro-eslint-parser";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import astroPlugin from "eslint-plugin-astro";

export default [
	{
		ignores: ["dist", "node_modules", ".github", "tmp", ".changeset"],
	},
	js.configs.recommended,
	{
		files: ["**/*.js", "**/*.ts", "**/*.astro"], 
		languageOptions: {
			parser: typescriptParser,
			ecmaVersion: 2022,
			sourceType: "module",
			globals: {
				URL: "readonly",
				process: "readonly",
				console: "readonly",
				fetch: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
			prettier: prettierPlugin,
			astro: astroPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			...tsPlugin.configs.recommended.rules,
			...prettierPlugin.configs.recommended.rules,
			...astroPlugin.configs.recommended.rules,
			"@typescript-eslint/no-var-requires": "warn",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ varsIgnorePattern: "Props", ignoreRestSiblings: true },
			],
			indent: "off",
		},
	},
	{
		files: ["**/*.astro"], 
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				parser: typescriptParser,
				extraFileExtensions: [".astro"],
			},
		},
		rules: {
			"prettier/prettier": "off",
		},
	},
];
