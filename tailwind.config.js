/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    './projects/chat-bot-widget/src/**/*.{html,ts,css,scss,sass,less,styl}',
    './projects/showcase/src/**/*.{html,ts,css,scss,sass,less,styl}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00120B",
        secondary: "#35605A",
        accent: "#31E981",
        textPrimary: "#FFFFFF",
        textSecondary: "#D8E4FF",
        receivedMessage: "#6B818C",
        inputMessage: "#222222",
        btnSendMessage: "#31E981",
      },
      opacity: {
        98: "0.98",
      },
      fontFamily: {
        sans: ["Open Sans", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
