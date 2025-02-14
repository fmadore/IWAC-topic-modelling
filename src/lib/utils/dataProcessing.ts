import { VisualizationData } from '../types';
import type { Node, ILink, IVisualizationData } from '../types';

interface RawData {
    topics: Array<{
        id: number;
        label: string;
        words: string[];
        word_weights: [string, number][];
        weight: number;
        prevalence: number;
    }>;
    documents: Array<{
        id: number;
        title: string;
        date: string;
        publisher: string;
        topic_weights: number[];
    }>;
}

export function processData(data: RawData): IVisualizationData {
    // Create nodes with consistent IDs
    const nodes: Node[] = [
        // Topics with their original IDs
        ...data.topics.map(t => ({
            ...t,
            type: 'topic' as const,
            nodeId: `t${t.id}` // Prefix topic IDs with 't'
        })),
        // Documents with prefixed IDs
        ...data.documents.map(d => ({
            ...d,
            type: 'document' as const,
            nodeId: `d${d.id}` // Prefix document IDs with 'd'
        }))
    ];
    
    // Create links with the new ID format using actual topic IDs
    const links: ILink[] = [];
    data.documents.forEach(doc => {
        // Loop over topic weights with index "idx"
        doc.topic_weights.forEach((weight, idx) => {
            if (weight > 0.2) { // Initial threshold - only create link if weight is high enough
                links.push({
                    // Use the topic's actual id from the topics array instead of the loop index
                    source: `t${data.topics[idx].id}`,
                    target: `d${doc.id}`,
                    weight: weight
                });
            }
        });
    });
    
    return VisualizationData.create(nodes, links);
} 