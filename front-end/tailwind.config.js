module.exports = {
  purge: [
    // Specify the paths to all of your template files here
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // Extend Tailwind's default theme here
      colors: {
        primary: '#1DA1F2', // Example of adding a custom color
      },
      spacing: {
        '128': '32rem', // Example of adding a custom spacing value
      },
    },
  },
  variants: {
    extend: {
      // Extend default variants here
      backgroundColor: ['active'], // Example of extending variants
    },
  },
  plugins: [
    // Add any Tailwind CSS plugins here
    require('@tailwindcss/forms'), // Example plugin for better form styles
  ],
}
