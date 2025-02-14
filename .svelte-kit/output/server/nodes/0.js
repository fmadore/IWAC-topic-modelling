import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DyRqgjRr.js","_app/immutable/chunks/C0I3Lh4A.js","_app/immutable/chunks/BiknXCUn.js","_app/immutable/chunks/HUnkaoEJ.js"];
export const stylesheets = ["_app/immutable/assets/0.DupAn2pW.css"];
export const fonts = [];
