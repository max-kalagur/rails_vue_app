const path = require('path');
const vuePlugin = require("esbuild-plugin-vue3");

require("esbuild").build({
  entryPoints: ["application.js", "invoice_form.js"],
  bundle: true,
  minify: true,
  outdir: path.join(process.cwd(), "app/assets/builds"),
  absWorkingDir: path.join(process.cwd(), "app/javascript"),
  watch: false,
  plugins: [vuePlugin()],
}).catch(() => process.exit(1));
