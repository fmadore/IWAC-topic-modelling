import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Bc3cmAFS.js","_app/immutable/chunks/BtFD_2jD.js","_app/immutable/chunks/BaDKqCuF.js","_app/immutable/chunks/CCafDVmf.js"];
export const stylesheets = ["_app/immutable/assets/0.DupAn2pW.css"];
export const fonts = [];
