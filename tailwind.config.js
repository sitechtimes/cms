module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#d9b75e",
          light: "#fff3d2"
        },
        offWhite: "#fffaf4",
        midGray: "#636363"
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ["active"]
    }
  },
  plugins: [
    //require('@tailwindcss/forms'),
  ],
  important: true
};
