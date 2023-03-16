import { defineConfig } from "@vue/cli-service";

export default defineConfig({
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    node: {
      global: true,
      process: true,
      NODE_TLS_REJECT_UNAUTHORIZED: 0,
    },
  },
});
