const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
