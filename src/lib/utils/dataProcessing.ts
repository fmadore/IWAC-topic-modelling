import { VisualizationData } from '../types';
import type { Node, Link, IVisualizationData } from '../types';

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
    
    // Create links with the new ID format
    const links: Link[] = [];
    data.documents.forEach(doc => {
        doc.topic_weights.forEach((weight, topicIdx) => {
            if (weight > 0.2) { // Initial threshold
                links.push({
                    source: `t${topicIdx}`, // Reference topic ID
                    target: `d${doc.id}`,   // Reference document ID
                    weight: weight
                });
            }
        });
    });
    
    return VisualizationData.create(nodes, links);
} 