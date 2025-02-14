export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "IWAC-topic-modelling/_app",
	assets: new Set([".nojekyll","topic_modeling_results.json"]),
	mimeTypes: {".json":"application/json"},
	_: {
		client: {start:"_app/immutable/entry/start.DWo8gmYD.js",app:"_app/immutable/entry/app.CVCS2Irr.js",imports:["_app/immutable/entry/start.DWo8gmYD.js","_app/immutable/chunks/BfBIia8S.js","_app/immutable/chunks/C0I3Lh4A.js","_app/immutable/chunks/C9j4-AxM.js","_app/immutable/entry/app.CVCS2Irr.js","_app/immutable/chunks/C0I3Lh4A.js","_app/immutable/chunks/BiknXCUn.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
