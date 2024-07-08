import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig(({ mode }) => {
	Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

	return {
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
			include: ["**/*.e2e-spec.ts"],
		},
		root: ".",
	};
});
