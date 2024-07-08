import { defineConfig } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
	plugins: [],
	test: {
		deps: {
			interopDefault: true,
		},
		environment: "node",
		coverage: {
			provider: "v8",
			reporter: ["text", "html"],
		},
		reporters: "default",
		include: ["**/*.spec.ts"],
	},
	root: ".",
});
