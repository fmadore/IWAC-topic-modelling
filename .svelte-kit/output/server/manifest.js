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
		client: {start:"_app/immutable/entry/start.DzhQZNS9.js",app:"_app/immutable/entry/app.BNM2UMwi.js",imports:["_app/immutable/entry/start.DzhQZNS9.js","_app/immutable/chunks/XgbcOojc.js","_app/immutable/chunks/C0I3Lh4A.js","_app/immutable/chunks/pWUYzHru.js","_app/immutable/entry/app.BNM2UMwi.js","_app/immutable/chunks/C0I3Lh4A.js","_app/immutable/chunks/BiknXCUn.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/IWAC-topic-modelling/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
