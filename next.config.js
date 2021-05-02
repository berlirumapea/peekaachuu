const withPWA = require("next-pwa");
const prod = process.env.NODE_ENV === "production";

module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: prod ? false : true,
  },
  images: {
    domains: ["raw.githubusercontent.com", "media.giphy.com"],
  },
});
