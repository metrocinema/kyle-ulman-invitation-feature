const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['"National 2"', ...defaultTheme.fontFamily.sans],
			serif: ['"Kepler Std"', ...defaultTheme.fontFamily.serif]
		},
		extend: {
			colors: {
				'light/text': '#1E1F21',
				'light/text-weak': '#6D6E6F',
				'light/primary-text': '#3F6AC4',
				'light/background-strong': '#F5F3F3',
				'light/background': '#FFF',
				'light/line': '#EDEAE9',
				'light-primary-line': '#3F6AC4'
			}
		}
	},
	plugins: []
};
