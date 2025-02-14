<script lang="ts">
  // Expect topics as an array of objects with id, label, and words properties
  export let topics: Array<{ id: number, label: string, words: string[] }> = [];

  function handleTopicClick(topicId: number) {
    // Add your custom logic for when a topic is clicked
    console.log('Topic clicked:', topicId);
  }
</script>

<style>
  .sidebar {
    width: 250px;
    background-color: #f4f4f4;
    overflow-y: auto;
    height: 100vh;
    padding: 1rem;
    border-right: 1px solid #ccc;
  }
  .topic-item {
    padding: 0.5rem;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #e5e5e5;
    cursor: pointer;
  }
  .topic-item:hover {
    background-color: #e5e5e5;
  }
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li + li {
    margin-top: 0.5rem;
  }
</style>

<div class="sidebar">
  <h2>Topics</h2>
  {#if topics.length === 0}
    <p>No topics available.</p>
  {:else}
    <ul>
      {#each topics as topic}
        <li>
          <button type="button" class="topic-item" on:click={() => handleTopicClick(topic.id)}>
            <div>
              <strong>{topic.label}</strong>
            </div>
            <div>
              {topic.words.join(', ')}
            </div>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div> 