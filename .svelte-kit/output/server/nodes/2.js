

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.Cg5CnNZg.js","_app/immutable/chunks/C0I3Lh4A.js","_app/immutable/chunks/BiknXCUn.js","_app/immutable/chunks/C9j4-AxM.js"];
export const stylesheets = ["_app/immutable/assets/2.B0OixwC9.css"];
export const fonts = [];
