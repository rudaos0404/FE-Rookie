/** @type {import('tailwindcss').Config} */
module.exports = {
  // 시스템 다크모드(prefers-color-scheme) 기준으로 다크 테마 적용
  darkMode: "media",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
