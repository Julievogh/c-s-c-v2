// postcss.config.mjs
const config = {
  plugins: {
    // Tailwind CSS v4’s PostCSS plugin
    "@tailwindcss/postcss": {},
    // Add vendor prefixes for cross-browser support
    autoprefixer: {},
  },
};

export default config;
