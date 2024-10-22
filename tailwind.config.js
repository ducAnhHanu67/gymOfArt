// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust paths to your source files
  theme: {
    extend: {
      backgroundColor: {
        primary: '#171728',
        secondary: '#16223D',
      },
    }, // Extend the default Tailwind theme here
  },
  plugins: [], // Add any Tailwind CSS plugins if needed
};
