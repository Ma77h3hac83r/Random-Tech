import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [],

	darkMode: 'class' // This enables dark mode based on a class
} as Config;
