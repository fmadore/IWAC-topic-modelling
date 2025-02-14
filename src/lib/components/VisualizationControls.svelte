<script lang="ts">
  export let threshold: number;
  export let onThresholdChange: (value: number) => void;
  export let onZoomIn: () => void;
  export let onZoomOut: () => void;
  export let onZoomReset: () => void;

  function handleThresholdInput(event: Event) {
    const target = event.target as HTMLInputElement;
    onThresholdChange(Number(target.value) / 100);
  }
</script>

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
      on:input={handleThresholdInput}
    >
    <span class="threshold-value">{threshold.toFixed(2)}</span>
    <div class="threshold-explanation">
      Adjust this slider to filter the strength of connections between topics and documents.
    </div>
  </div>
  
  <div class="zoom-controls">
    <button on:click={onZoomIn}>Zoom In</button>
    <button on:click={onZoomOut}>Zoom Out</button>
    <button on:click={onZoomReset}>Reset</button>
  </div>
</div>

<style>
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

  input[type="range"] {
    width: 200px;
    margin: 8px 0;
  }

  .threshold-value {
    font-size: 14px;
    color: #666;
    margin-left: 8px;
  }
</style> 