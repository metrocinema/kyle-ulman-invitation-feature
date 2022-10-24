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
				'light/background': '#FFFFFF',
				'dark/text': '#F5F4F3', // light
				'light/text': '#1E1F21', // dark
				'light/background-strong': '#F5F3F3', // grey
				'light/icon': '#6D6E6F', // grey
				'light/primary-line': '#3F6AC4', // blue
				'light/line': '#EDEAE9', // grey
				'light/line-strong': '#CFCBCB',
				'light/primary-text': '#3F6AC4', // blue
				'light/text-weak': '#6D6E6F', // grey
				'dark/background': '#1E1F21', // dark
				'active-clr': '#3F6AC4' // blue
			},
			screens: {
				370: '370px'
			},
			boxShadow: {
				hero: '0 -0.25rem 1rem #fde68a'
			}
		}
	},
	plugins: []
};
