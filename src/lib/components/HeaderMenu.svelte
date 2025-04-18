<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import DatasetPicker from './DatasetPicker.svelte';

  export let threshold: number;
  export let onThresholdChange: (value: number) => void;
  export let onZoomIn: () => void;
  export let onZoomOut: () => void;
  export let onZoomReset: () => void;

  const dispatch = createEventDispatcher();

  function handleThresholdInput(event: Event) {
    const target = event.target as HTMLInputElement;
    onThresholdChange(Number(target.value) / 100);
  }

  function handleDatasetChange(event: CustomEvent) {
    dispatch('datasetChange', event.detail);
  }
</script>

<div class="header-menu">
  <div class="menu-section">
    <DatasetPicker on:datasetChange={handleDatasetChange} />
  </div>
  <div class="menu-section threshold-section">
    <div class="threshold-control">
      <input 
        type="range" 
        id="threshold" 
        min="0" 
        max="100" 
        value={threshold * 100}
        on:input={handleThresholdInput}
      >
      <span class="threshold-value">{threshold.toFixed(2)}</span>
    </div>
    <div class="threshold-explanation">
      Link Threshold
      <span class="info-icon" title="Higher values show stronger topic-document relationships only">?</span>
    </div>
  </div>
  <div class="menu-section zoom-section">
    <div class="zoom-controls">
      <button on:click={onZoomIn}>Zoom In</button>
      <button on:click={onZoomOut}>Zoom Out</button>
      <button on:click={onZoomReset}>Reset</button>
    </div>
  </div>
</div>

<style>
  .header-menu {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 0.5rem 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .menu-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .threshold-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .threshold-control {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  input[type="range"] {
    width: 200px;
  }

  .threshold-value {
    font-size: 14px;
    color: #666;
    min-width: 3em;
  }

  .threshold-explanation {
    font-size: 14px;
    color: #666;
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
    cursor: help;
  }

  .zoom-controls {
    display: flex;
    gap: 8px;
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

  @media (max-width: 640px) {
    .header-menu {
      flex-direction: column;
      gap: 1rem;
    }

    .menu-section {
      width: 100%;
    }

    input[type="range"] {
      width: 100%;
    }

    .zoom-controls {
      width: 100%;
      justify-content: space-between;
    }
  }
</style> 