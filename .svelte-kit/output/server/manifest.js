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
		client: {start:"_app/immutable/entry/start.gNWKHEdr.js",app:"_app/immutable/entry/app.BgMmoy7N.js",imports:["_app/immutable/entry/start.gNWKHEdr.js","_app/immutable/chunks/DAAs-P4G.js","_app/immutable/chunks/C0I3Lh4A.js","_app/immutable/chunks/DWh2R7JZ.js","_app/immutable/entry/app.BgMmoy7N.js","_app/immutable/chunks/C0I3Lh4A.js","_app/immutable/chunks/BiknXCUn.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
