<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { VisualizationData, VisualizationConfig, ZoomConfig, Link, TopicNode, DocumentNode } from '$lib/models';
  import { GraphController } from '$lib/controllers/graphController';

  export let data: VisualizationData;
  export let config: VisualizationConfig;
  export let filteredLinks: Link[];
  export let onNodeHover: (event: MouseEvent, node: TopicNode | DocumentNode | null) => void;
  export let svg: SVGSVGElement | undefined = undefined;

  let graphController: GraphController;

  onMount(() => {
    if (svg) {
      // Initialize GraphController using data.nodes and initial filteredLinks
      graphController = new GraphController(svg, data.nodes, filteredLinks, config, onNodeHover);
    }
  });

  export function zoomBy(factor: number) {
    if (graphController) {
      graphController.zoomBy(factor);
    }
  }

  export function zoomReset() {
    if (graphController) {
      graphController.zoomReset();
    }
  }

  export function updateLinks(newLinks: Link[]) {
    if (graphController) {
      graphController.updateLinks(newLinks);
    }
  }

  // Reactive statement to update links when filteredLinks changes
  $: if (graphController && filteredLinks) {
    updateLinks(filteredLinks);
  }

  onDestroy(() => {
    if (graphController) {
      graphController.destroy();
    }
  });
</script>

<div class="svg-container">
  <svg 
    bind:this={svg}
    width={config.width}
    height={config.height}
    viewBox="0 0 {config.width} {config.height}"
    preserveAspectRatio="xMidYMid meet"
  ></svg>
</div>

<style>
  .svg-container {
    width: 100%;
    height: 800px;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  :global(.node-topic) {
    fill: #4CAF50;
    stroke: #2E7D32;
    stroke-width: 2px;
    cursor: pointer;
  }

  :global(.node-document) {
    fill: #2196F3;
    stroke: #1976D2;
    stroke-width: 1px;
    cursor: pointer;
  }

  :global(.link) {
    stroke: #9E9E9E;
    stroke-opacity: 0.4;
  }
</style> 