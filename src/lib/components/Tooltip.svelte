<script>
  export let data = null;
  export let x = 0;
  export let y = 0;
  export let visible = false;
</script>

{#if visible && data}
  <div 
    class="tooltip"
    style="left: {x + 10}px; top: {y - 10}px;"
  >
    {#if data.type === 'topic'}
      <div class="tooltip-topic">
        <h4>{data.label}</h4>
        <div class="tooltip-prevalence">
          Corpus coverage: {(data.prevalence * 100).toFixed(1)}%
        </div>
        <div class="tooltip-words">
          {#each data.word_weights as [word, weight]}
            <span class="tooltip-word" style="opacity: {weight}">{word}</span>
          {/each}
        </div>
      </div>
    {:else}
      <div class="tooltip-document">
        <h4>{data.title}</h4>
        <div class="tooltip-meta">
          Published: {data.date}<br>
          Source: {data.publisher}
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .tooltip {
    position: absolute;
    padding: 12px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    pointer-events: none;
    font-size: 14px;
    max-width: 300px;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    line-height: 1.4;
  }

  h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 600;
  }

  .tooltip-prevalence {
    font-size: 12px;
    color: #666;
    margin-bottom: 8px;
  }

  .tooltip-words {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tooltip-word {
    font-size: 12px;
    padding: 2px 4px;
    background: rgba(0,0,0,0.05);
    border-radius: 3px;
  }

  .tooltip-meta {
    font-size: 12px;
    color: #666;
    line-height: 1.4;
  }
</style> 