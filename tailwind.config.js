/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: ['24px', { lineHeight: '28px', fontWeight: '900' }],
        h2: ['20px', { lineHeight: '24px', fontWeight: '700' }],
        h3: ['18px', { lineHeight: '24px', fontWeight: '600' }],
        body1: ['16px', { lineHeight: '24px', fontWeight: '500' }],
        body2: ['14px', { lineHeight: '24px', fontWeight: '500' }],
        body3: ['12px', { lineHeight: '24px', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}
