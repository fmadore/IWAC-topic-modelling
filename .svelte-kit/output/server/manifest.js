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
		client: {start:"_app/immutable/entry/start.C2Mm7blN.js",app:"_app/immutable/entry/app.Db4cBEeX.js",imports:["_app/immutable/entry/start.C2Mm7blN.js","_app/immutable/chunks/CfLMgcaO.js","_app/immutable/chunks/C0I3Lh4A.js","_app/immutable/chunks/HUnkaoEJ.js","_app/immutable/entry/app.Db4cBEeX.js","_app/immutable/chunks/C0I3Lh4A.js","_app/immutable/chunks/BiknXCUn.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
