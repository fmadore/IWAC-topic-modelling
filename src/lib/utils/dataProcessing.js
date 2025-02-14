export function processData(data) {
    // Create nodes with consistent IDs
    const nodes = [
        // Topics with their original IDs
        ...data.topics.map(t => ({
            ...t,
            type: 'topic',
            nodeId: `t${t.id}` // Prefix topic IDs with 't'
        })),
        // Documents with prefixed IDs
        ...data.documents.map(d => ({
            ...d,
            type: 'document',
            nodeId: `d${d.id}` // Prefix document IDs with 'd'
        }))
    ];
    
    // Create links with the new ID format
    const links = [];
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
    
    return { nodes, links };
} 