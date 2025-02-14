import { c as create_ssr_component } from "../../chunks/ssr.js";
const css = {
  code: "*{box-sizing:border-box;margin:0;padding:0}html, body{height:100%}body{font-family:'Inter', -apple-system, BlinkMacSystemFont, sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script>\\r\\n  import { base } from '$app/paths';\\r\\n<\/script>\\r\\n\\r\\n<slot />\\r\\n\\r\\n<style>\\r\\n  :global(*) {\\r\\n    box-sizing: border-box;\\r\\n    margin: 0;\\r\\n    padding: 0;\\r\\n  }\\r\\n\\r\\n  :global(html, body) {\\r\\n    height: 100%;\\r\\n  }\\r\\n\\r\\n  :global(body) {\\r\\n    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;\\r\\n    -webkit-font-smoothing: antialiased;\\r\\n    -moz-osx-font-smoothing: grayscale;\\r\\n  }\\r\\n</style> "],"names":[],"mappings":"AAOU,CAAG,CACT,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CACX,CAEQ,UAAY,CAClB,MAAM,CAAE,IACV,CAEQ,IAAM,CACZ,WAAW,CAAE,OAAO,CAAC,CAAC,aAAa,CAAC,CAAC,kBAAkB,CAAC,CAAC,UAAU,CACnE,sBAAsB,CAAE,WAAW,CACnC,uBAAuB,CAAE,SAC3B"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
