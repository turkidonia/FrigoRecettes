
 /** @type {import('tailwindcss').Config} */
 module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Ajoute cette ligne pour scanner tous les fichiers React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}