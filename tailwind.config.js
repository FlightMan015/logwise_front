const colors = require("tailwindcss/colors");
const { toRGB, withOpacityValue } = require("@left4code/tw-starter/dist/js/tailwind-config-helper");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {},
  plugins: [require("@tailwindcss/forms")],
  variants: {
    extend: {
      boxShadow: ["dark"],
    },
  },
};
