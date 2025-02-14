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
		client: {start:"_app/immutable/entry/start.CTtr55Kv.js",app:"_app/immutable/entry/app.BI-sYAN8.js",imports:["_app/immutable/entry/start.CTtr55Kv.js","_app/immutable/chunks/BsSQnAob.js","_app/immutable/chunks/C0I3Lh4A.js","_app/immutable/chunks/B_3lYi8U.js","_app/immutable/entry/app.BI-sYAN8.js","_app/immutable/chunks/C0I3Lh4A.js","_app/immutable/chunks/BiknXCUn.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
