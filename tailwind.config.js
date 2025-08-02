/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'anuphan': 'Anuphan',
      'nunito': 'Nunito',
      'raleway': 'Raleway',
      'alegreya': 'Alegreya',
      'roboto': 'Roboto',
      'lexend': 'Lexend'
    },
    extend: {
      colors: {
        'primary': '#04102B',
        'secondary': '#5F5CFF',
        'tertiary': '#F6F5FA',
        'quaternary': '#FFFFFF',
        'quinary': '#3B82F6',
        'opaque': 'rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
}

