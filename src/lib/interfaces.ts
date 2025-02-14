import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export interface TopicNode extends SimulationNodeDatum {
  id: number;
  type: 'topic';
  nodeId: string;
  label: string;
  words: string[];
  word_weights: [string, number][];
  weight: number;
  prevalence: number;
}

export interface DocumentNode extends SimulationNodeDatum {
  id: number;
  type: 'document';
  nodeId: string;
  title: string;
  date: string;
  publisher: string;
  topic_weights: number[];
}

export type Node = TopicNode | DocumentNode;

export interface Link extends SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  weight: number;
}

export interface VisualizationData {
  nodes: Node[];
  links: Link[];
}

export interface VisualizationConfig {
  width: number;
  height: number;
  nodeRadius: {
    topic: number;
    document: number;
  };
  forces: {
    link: {
      strength: number;
    };
    charge: {
      strength: number;
    };
    collision: {
      radiusScale: number;
    };
  };
}

export interface ZoomConfig {
  minZoom: number;
  maxZoom: number;
} 