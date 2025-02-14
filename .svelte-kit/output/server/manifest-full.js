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
		client: {start:"_app/immutable/entry/start.C0GeiOtm.js",app:"_app/immutable/entry/app.BPViF_GL.js",imports:["_app/immutable/entry/start.C0GeiOtm.js","_app/immutable/chunks/G52bpJUt.js","_app/immutable/chunks/BtFD_2jD.js","_app/immutable/chunks/CCafDVmf.js","_app/immutable/entry/app.BPViF_GL.js","_app/immutable/chunks/BtFD_2jD.js","_app/immutable/chunks/BaDKqCuF.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
