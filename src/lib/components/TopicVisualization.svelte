<script lang="ts">
  import * as d3 from 'd3';
  import { TopicNode, DocumentNode, Link, VisualizationData, VisualizationConfig, ZoomConfig } from '$lib/models';
  import type { ITopicNode, IDocumentNode } from '$lib/types';
  import { defaultConfig } from '$lib/utils/simulation';
  import Tooltip from './Tooltip.svelte';
  import VisualizationControls from './VisualizationControls.svelte';
  import VisualizationGraph from './VisualizationGraph.svelte';

  export let data: VisualizationData;
  
  let threshold = 0.2;
  let svg: SVGSVGElement;
  
  // Tooltip state
  let tooltipData: ITopicNode | IDocumentNode | null = null;
  let tooltipX = 0;
  let tooltipY = 0;
  let tooltipVisible = false;
  
  const config = new VisualizationConfig({
    width: 1100,
    height: 800
  });

  const zoomConfig = new ZoomConfig();

  $: filteredLinks = data.links.filter(l => l.weight > threshold);

  // Declare a variable to bind the VisualizationGraph instance
  let vizGraph: any;

  function handleThresholdChange(value: number) {
    threshold = value;
  }

  function handleNodeHover(event: MouseEvent, node: ITopicNode | IDocumentNode | null) {
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
    if (vizGraph) {
      vizGraph.zoomBy(1.3);
    }
  }

  function handleZoomOut() {
    if (vizGraph) {
      vizGraph.zoomBy(1/1.3);
    }
  }

  function handleZoomReset() {
    if (vizGraph) {
      vizGraph.zoomReset();
    }
  }

  // Add the following reactive statement at the end of the <script> block (after all functions):

  $: if (vizGraph && filteredLinks) {
    vizGraph.updateLinks(filteredLinks);
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
    bind:this={vizGraph}
    bind:svg
    {data}
    {config}
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