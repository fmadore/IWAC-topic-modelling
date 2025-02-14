<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import * as d3 from 'd3';
  import TopicVisualization from '$lib/components/TopicVisualization.svelte';
  import { processData } from '$lib/utils/dataProcessing';

  let data = null;

  onMount(async () => {
    const response = await fetch(`${base}/topic_modeling_results.json`);
    const rawData = await response.json();
    data = processData(rawData);
  });
</script>

<svelte:head>
  <title>Topic Model Visualization</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="container">
  <h1>Topic Model Visualization</h1>
  {#if data}
    <TopicVisualization {data} />
  {:else}
    <div class="loading">Loading visualization...</div>
  {/if}
</div>

<style>
  :global(*) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  :global(body) {
    color: #333;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 24px;
    color: #1a1a1a;
  }

  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
</style> 