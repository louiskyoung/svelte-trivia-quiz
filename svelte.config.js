import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { sass } from 'svelte-preprocess-sass';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: {
		...preprocess(),
		style: sass()
	},

	kit: {
		adapter: adapter()
	}
};

export default config;
