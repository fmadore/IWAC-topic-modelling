<script lang="ts">
  import * as d3 from 'd3';
  import { Node, Link, IVisualizationData } from '$lib/types';
  import { defaultConfig, type SimulationConfig } from '$lib/utils/simulation';
  import Tooltip from './Tooltip.svelte';
  import VisualizationControls from './VisualizationControls.svelte';
  import VisualizationGraph from './VisualizationGraph.svelte';

  export let data: IVisualizationData;
  
  let threshold = 0.2;
  let svg: SVGSVGElement;
  
  // Tooltip state
  let tooltipData: Node | null = null;
  let tooltipX = 0;
  let tooltipY = 0;
  let tooltipVisible = false;
  
  const config: SimulationConfig = {
    ...defaultConfig,
    width: 1100,
    height: 800
  };

  const zoomConfig = {
    minZoom: 0.1,
    maxZoom: 4
  };

  $: filteredLinks = data.links.filter(l => l.weight > threshold);

  function handleThresholdChange(value: number) {
    threshold = value;
  }

  function handleNodeHover(event: MouseEvent, node: Node | null) {
    if (node) {
      tooltipData = node;
      tooltipX = event.pageX;
      tooltipY = event.pageY;
      tooltipVisible = true;
    } else {
      tooltipVisible = false;
    }
  }

  function handleZoomIn() {
    if (svg) {
      d3.select(svg).transition()
        .duration(750)
        .call(
          d3.zoom<SVGSVGElement, unknown>().transform,
          d3.zoomIdentity.scale(1.3)
        );
    }
  }

  function handleZoomOut() {
    if (svg) {
      d3.select(svg).transition()
        .duration(750)
        .call(
          d3.zoom<SVGSVGElement, unknown>().transform,
          d3.zoomIdentity.scale(1/1.3)
        );
    }
  }

  function handleZoomReset() {
    if (svg) {
      d3.select(svg).transition()
        .duration(750)
        .call(
          d3.zoom<SVGSVGElement, unknown>().transform,
          d3.zoomIdentity
        );
    }
  }
</script>

<div class="visualization-container">
  <VisualizationControls
    {threshold}
    onThresholdChange={handleThresholdChange}
    onZoomIn={handleZoomIn}
    onZoomOut={handleZoomOut}
    onZoomReset={handleZoomReset}
  />

  <VisualizationGraph
    bind:svg
    {data}
    {config}
    {zoomConfig}
    {filteredLinks}
    onNodeHover={handleNodeHover}
  />

  <div class="legend">
    <p>🟢 Topics: Main themes identified in the corpus</p>
    <p>🔵 Documents: Individual articles</p>
    <p>Lines: Connections between topics and documents (thickness indicates strength)</p>
  </div>

  <Tooltip 
    data={tooltipData}
    x={tooltipX}
    y={tooltipY}
    visible={tooltipVisible}
  />
</div>

<style>
  .visualization-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .legend {
    margin-top: 24px;
    background: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
  }

  .legend p {
    margin: 8px 0;
    font-size: 14px;
  }
</style> 