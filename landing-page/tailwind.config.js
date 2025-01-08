module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors here if needed
      },
      backgroundImage: {
        'gradient-white': 'linear-gradient(to bottom, #ffffff, #f0f0f0)',
      },
    },
  },
  plugins: [],
};