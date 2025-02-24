import { VisualizationData } from '../types';
import type { Node, ILink, IVisualizationData } from '../types';

interface RawTopic {
    id: number;
    words: string[];
    word_weights: Array<[string, number]>;
    weight: number;
    prevalence: number;
    label: string;
}

interface RawDocument {
    id: number;
    title: string;
    date: string;
    publisher: string;
    topic_weights: number[];
}

interface RawData {
    topics: RawTopic[];
    documents: RawDocument[];
}

export function processData(data: RawData): IVisualizationData {
    // Create nodes for topics and documents
    const nodes: Node[] = [
        // Topics with their original IDs
        ...data.topics.map(t => ({
            id: t.id,
            type: 'topic' as const,
            nodeId: `t${t.id}`,
            label: `Topic ${t.id}`,
            words: t.words,
            word_weights: t.word_weights,
            weight: t.weight,
            prevalence: t.prevalence
        })),
        // Documents with their IDs
        ...data.documents.map(d => ({
            id: d.id,
            type: 'document' as const,
            nodeId: `d${d.id}`,
            title: d.title,
            date: d.date,
            publisher: d.publisher,
            topic_weights: d.topic_weights
        }))
    ];

    // Create links between documents and their most relevant topics
    const links: ILink[] = [];
    data.documents.forEach(doc => {
        doc.topic_weights.forEach((weight, topicIndex) => {
            // Only create links for topics with significant weights (e.g., > 0.2)
            if (weight > 0.2) {
                links.push({
                    source: `t${data.topics[topicIndex].id}`,
                    target: `d${doc.id}`,
                    weight: weight
                });
            }
        });
    });

    return VisualizationData.create(nodes, links);
} 