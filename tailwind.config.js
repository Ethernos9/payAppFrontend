/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',                      // Include the root HTML file
    './src/**/*.{html,js,jsx}',          // Include all files in src folder and subfolders
    './components/**/*.{html,js,jsx}',   // Include the components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
