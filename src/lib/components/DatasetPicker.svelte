<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const datasets = [
    {
      id: 'conseil_national_islamique',
      name: 'Conseil National Islamique',
      file: 'topic_modeling_results_Conseil_National_Islamique.json'
    },
    {
      id: 'federation_associations_islamiques_burkina',
      name: 'Fédération des Associations Islamiques du Burkina',
      file: 'topic_modeling_results_Fédération_des_Associations_Islamiques_du_Burkina.json'
    },
    {
      id: 'union_islamique_benin',
      name: 'Union Islamique du Bénin',
      file: 'topic_modeling_results_Union_Islamique_du_Bénin.json'
    },
    {
      id: 'union_musulmane_togo',
      name: 'Union Musulmane du Togo',
      file: 'topic_modeling_results_Union_Musulmane_du_Togo.json'
    }
  ];

  export let selectedDataset = datasets[0].id;
  const dispatch = createEventDispatcher();

  function handleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    selectedDataset = select.value;
    const dataset = datasets.find(d => d.id === select.value);
    if (dataset) {
      dispatch('change', { datasetId: dataset.id, file: dataset.file });
    }
  }
</script>

<div class="dataset-picker">
  <select 
    id="dataset-select" 
    bind:value={selectedDataset}
    on:change={handleChange}
  >
    {#each datasets as dataset}
      <option value={dataset.id}>
        {dataset.name}
      </option>
    {/each}
  </select>
</div>

<style>
  .dataset-picker {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
  }

  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    font-size: 1rem;
  }

  select:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
  }

  @media (min-width: 640px) {
    select {
      width: auto;
      min-width: 300px;
    }
  }
</style> 