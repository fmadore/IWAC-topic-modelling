import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/IWAC-topic-modelling' : '',
			relative: false
		},
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore missing favicon
				if (path === '/favicon.png') {
					return;
				}
				
				// otherwise fail the build
				throw new Error(message);
			}
		}
	}
};

export default config; 