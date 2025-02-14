<script lang="ts">
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import * as d3 from 'd3';
  import { TopicNode, DocumentNode, Link, VisualizationData, VisualizationConfig, ZoomConfig } from '$lib/models';
  import type { ITopicNode, IDocumentNode } from '$lib/types';
  import { createSimulation } from '$lib/utils/simulation';
  import { renderVisualization, setupZoom, createDragBehavior } from '$lib/utils/visualization';

  export let data: VisualizationData;
  export let config: VisualizationConfig;
  export let zoomConfig: ZoomConfig;
  export let filteredLinks: Link[];
  export let onNodeHover: (event: MouseEvent, node: ITopicNode | IDocumentNode | null) => void;
  export let svg: SVGSVGElement | undefined = undefined;

  let simulation: d3.Simulation<TopicNode | DocumentNode, Link>;

  function createVisualization() {
    if (!svg || !data) return;

    // Stop any existing simulation
    if (simulation) simulation.stop();

    // Clear previous visualization
    d3.select(svg).selectAll('*').remove();

    // Create container group
    const g = d3.select(svg).append('g');

    // Setup zoom
    setupZoom(svg, g.node()!, zoomConfig);

    // Create force simulation
    simulation = createSimulation(data.nodes, filteredLinks, config);

    // Render visualization
    const { node, link } = renderVisualization(
      g.node()!,
      data.nodes,
      filteredLinks,
      config,
      {
        onNodeMouseOver: (event: MouseEvent, d: TopicNode | DocumentNode) => onNodeHover(event, d),
        onNodeMouseMove: (event: MouseEvent, d: TopicNode | DocumentNode) => onNodeHover(event, d),
        onNodeMouseOut: (event, _d) => onNodeHover(event, null)
      }
    );

    // Add drag behavior
    node.call(createDragBehavior(simulation) as any);

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as TopicNode | DocumentNode).x ?? 0)
        .attr('y1', d => (d.source as TopicNode | DocumentNode).y ?? 0)
        .attr('x2', d => (d.target as TopicNode | DocumentNode).x ?? 0)
        .attr('y2', d => (d.target as TopicNode | DocumentNode).y ?? 0);

      node
        .attr('cx', d => d.x ?? 0)
        .attr('cy', d => d.y ?? 0);
    });

    // Stop simulation after a while to prevent continuous updates
    simulation.alphaDecay(0.02);
    simulation.alphaMin(0.001);
  }

  onMount(() => {
    createVisualization();
  });

  afterUpdate(() => {
    createVisualization();
  });

  onDestroy(() => {
    if (simulation) simulation.stop();
  });
</script>

<div class="svg-container">
  <svg 
    bind:this={svg}
    width={config.width}
    height={config.height}
    viewBox="0 0 {config.width} {config.height}"
    preserveAspectRatio="xMidYMid meet"
  />
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