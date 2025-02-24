<script lang="ts">
  import { onMount } from 'svelte';
  import HeaderMenu from '$lib/components/HeaderMenu.svelte';
  import TopicSidebar from '$lib/components/TopicSidebar.svelte';
  import TopicVisualization from '$lib/components/TopicVisualization.svelte';
  import { loadDataset } from '$lib/services/datasetService';
  import { processData } from '$lib/utils/dataProcessing';
  import type { TopicModelingData } from '$lib/services/datasetService';
  import type { IVisualizationData } from '$lib/types';

  let rawData: TopicModelingData | null = null;
  let visualizationData: IVisualizationData | null = null;
  let error: string | null = null;
  let loading = true;
  let threshold = 0.2;
  let vizComponent: TopicVisualization;

  async function handleDatasetChange(event: CustomEvent<{ datasetId: string, file: string }>) {
    try {
      loading = true;
      error = null;
      rawData = await loadDataset(event.detail.file);
      if (rawData) {
        visualizationData = processData(rawData);
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load dataset';
      console.error('Error loading dataset:', e);
    } finally {
      loading = false;
    }
  }

  function handleThresholdChange(value: number) {
    threshold = value;
  }

  function handleZoomIn() {
    if (vizComponent) {
      vizComponent.handleZoomIn();
    }
  }

  function handleZoomOut() {
    if (vizComponent) {
      vizComponent.handleZoomOut();
    }
  }

  function handleZoomReset() {
    if (vizComponent) {
      vizComponent.handleZoomReset();
    }
  }

  onMount(async () => {
    try {
      rawData = await loadDataset('topic_modeling_results_Conseil_National_Islamique.json');
      if (rawData) {
        visualizationData = processData(rawData);
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load initial dataset';
      console.error('Error loading initial dataset:', e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Topic Model Visualization</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
  <header>
    <h1>Topic Modeling Visualization</h1>
    <HeaderMenu 
      {threshold}
      onThresholdChange={handleThresholdChange}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onZoomReset={handleZoomReset}
      on:datasetChange={handleDatasetChange}
    />
  </header>

  <main>
    {#if loading}
      <div class="loading">Loading dataset...</div>
    {:else if error}
      <div class="error">
        <p>Error: {error}</p>
        <button on:click={() => window.location.reload()}>Retry</button>
      </div>
    {:else if rawData && visualizationData}
      <div class="content">
        <TopicSidebar topics={rawData.topics.map(t => ({
          id: t.id,
          label: `Topic ${t.id}`,
          words: t.words
        }))} />
        <TopicVisualization 
          bind:this={vizComponent}
          data={visualizationData}
          {threshold}
        />
      </div>
    {/if}
  </main>
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

  .app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  header {
    padding: 1rem 2rem;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  h1 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    color: #333;
  }

  main {
    flex: 1;
    overflow: hidden;
  }

  .content {
    display: flex;
    height: 100%;
  }

  .loading, .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
  }

  .error {
    color: #d32f2f;
  }

  .error button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .error button:hover {
    background-color: #d32f2f;
  }
</style> 