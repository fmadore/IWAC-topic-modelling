export interface TopicModelingData {
  topics: Array<{
    id: number;
    words: string[];
    word_weights: Array<[string, number]>;
    weight: number;
    prevalence: number;
    label: string;
  }>;
  documents: Array<{
    id: number;
    title: string;
    date: string;
    publisher: string;
    topic_weights: number[];
  }>;
  // Add other properties as needed
}

export async function loadDataset(filename: string): Promise<TopicModelingData> {
  try {
    const response = await fetch(filename);
    if (!response.ok) {
      throw new Error(`Failed to load dataset: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading dataset:', error);
    throw error;
  }
} 