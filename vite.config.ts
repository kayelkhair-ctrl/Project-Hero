import { defineConfig } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "glob";

const root = dirname(fileURLToPath(import.meta.url));

// Auto-discover every .html page (home + sub-pages + generated blog posts)
// so adding a new page = adding a new .html file, no config changes needed.
const pages = globSync("**/*.html", {
  cwd: root,
  ignore: ["dist/**", "node_modules/**"],
}).map((file) => resolve(root, file));

export default defineConfig({
  root,
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: pages,
    },
  },
  server: {
    host: true,
    open: true,
  },
});
