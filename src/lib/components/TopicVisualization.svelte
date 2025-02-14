<script>
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import * as d3 from 'd3';
  import Tooltip from './Tooltip.svelte';

  export let data;
  
  let svg;
  let container;
  let width = 1100;
  let height = 800;
  let threshold = 0.2;
  let simulation;
  
  // Tooltip state
  let tooltipData = null;
  let tooltipX = 0;
  let tooltipY = 0;
  let tooltipVisible = false;
  
  const config = {
    topicRadius: 20,
    documentRadius: 5,
    minZoom: 0.1,
    maxZoom: 4
  };

  $: filteredLinks = data.links.filter(l => l.weight > threshold);

  function createVisualization() {
    if (!svg || !data) return;

    // Stop any existing simulation
    if (simulation) simulation.stop();

    // Clear previous visualization
    d3.select(svg).selectAll('*').remove();

    const g = d3.select(svg)
      .append('g');

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([config.minZoom, config.maxZoom])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    // Enable zoom
    d3.select(svg).call(zoom);

    // Create force simulation
    simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(filteredLinks)
        .id(d => d.nodeId)
        .strength(d => d.weight))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => 
        d.type === 'topic' ? config.topicRadius : config.documentRadius));

    // Draw links
    const link = g.selectAll('.link')
      .data(filteredLinks)
      .join('line')
      .attr('class', 'link')
      .attr('stroke-width', d => d.weight * 2);

    // Draw nodes
    const node = g.selectAll('.node')
      .data(data.nodes)
      .join('circle')
      .attr('class', d => `node node-${d.type}`)
      .attr('r', d => d.type === 'topic' ? config.topicRadius : config.documentRadius)
      .on('mouseover', (event, d) => {
        tooltipData = d;
        tooltipX = event.pageX;
        tooltipY = event.pageY;
        tooltipVisible = true;
      })
      .on('mousemove', (event) => {
        tooltipX = event.pageX;
        tooltipY = event.pageY;
      })
      .on('mouseout', () => {
        tooltipVisible = false;
      });

    // Add drag behavior
    node.call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    // Stop simulation after a while to prevent continuous updates
    simulation.alphaDecay(0.02); // Faster decay
    simulation.alphaMin(0.001); // Stop at lower threshold

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
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

  function handleThresholdChange(event) {
    threshold = event.target.value / 100;
  }

  function handleZoom(factor) {
    const svgElement = d3.select(svg);
    svgElement.transition()
      .duration(750)
      .call(
        d3.zoom().transform,
        d3.zoomIdentity.scale(factor)
      );
  }

  function resetZoom() {
    const svgElement = d3.select(svg);
    svgElement.transition()
      .duration(750)
      .call(
        d3.zoom().transform,
        d3.zoomIdentity
      );
  }
</script>

<div class="visualization-container" bind:this={container}>
  <div class="controls">
    <div class="control-group">
      <label for="threshold">
        Link Threshold:
        <span class="info-icon" title="Higher values show stronger topic-document relationships only">?</span>
      </label>
      <input 
        type="range" 
        id="threshold" 
        min="0" 
        max="100" 
        value={threshold * 100}
        on:input={handleThresholdChange}
      >
      <span class="threshold-value">{threshold.toFixed(2)}</span>
      <div class="threshold-explanation">
        Adjust this slider to filter the strength of connections between topics and documents.
      </div>
    </div>
    
    <div class="zoom-controls">
      <button on:click={() => handleZoom(1.3)}>Zoom In</button>
      <button on:click={() => handleZoom(1/1.3)}>Zoom Out</button>
      <button on:click={resetZoom}>Reset</button>
    </div>
  </div>

  <div class="svg-container">
    <svg 
      bind:this={svg}
      {width}
      {height}
      viewBox="0 0 {width} {height}"
      preserveAspectRatio="xMidYMid meet"
    />
  </div>

  <div class="legend">
    <p>🟢 Topics: Main themes identified in the corpus</p>
    <p>🔵 Documents: Individual articles</p>
    <p>Lines: Connections between topics and documents (thickness indicates strength)</p>
  </div>
</div>

<Tooltip 
  data={tooltipData}
  x={tooltipX}
  y={tooltipY}
  visible={tooltipVisible}
/>

<style>
  .visualization-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

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

  .controls {
    margin-bottom: 24px;
  }

  .control-group {
    margin-bottom: 20px;
    background: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
  }

  .control-group label {
    font-weight: 500;
    display: block;
    margin-bottom: 8px;
  }

  .threshold-explanation {
    font-size: 14px;
    color: #666;
    margin-top: 8px;
  }

  .info-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    background: #666;
    color: white;
    border-radius: 50%;
    font-size: 12px;
    margin-left: 5px;
    cursor: help;
  }

  .zoom-controls {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .zoom-controls button {
    padding: 8px 16px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .zoom-controls button:hover {
    background: #f0f0f0;
    border-color: #ccc;
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

  input[type="range"] {
    width: 200px;
    margin: 8px 0;
  }

  .threshold-value {
    font-size: 14px;
    color: #666;
    margin-left: 8px;
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