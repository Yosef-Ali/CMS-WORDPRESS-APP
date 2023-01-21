const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Roboto Condensed', 'sans-serif'],
			//mono: ['var(--noto_Sans_Ethiopic)', ...fontFamily.mono],
		},
		extend: {
			colors: {
				primary: '#F58A07',
				secondary: '#052844',
				light: '#E3EEF7',
				lighter: '#E3EEF7',
			},
			borderWidth: {
				16: '16px',
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
