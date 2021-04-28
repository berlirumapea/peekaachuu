const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    mode: "production",
    runtimeCaching,
  },
  images: {
    domains: ["raw.githubusercontent.com"],
  },
});
