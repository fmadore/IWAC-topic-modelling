

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CXpVXuF7.js","_app/immutable/chunks/BtFD_2jD.js","_app/immutable/chunks/BaDKqCuF.js","_app/immutable/chunks/CCafDVmf.js"];
export const stylesheets = ["_app/immutable/assets/2.T9HZfh7C.css"];
export const fonts = [];
