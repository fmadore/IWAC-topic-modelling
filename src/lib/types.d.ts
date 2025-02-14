import type { SimulationNodeDatum } from 'd3';

export interface TopicNode extends SimulationNodeDatum {
  id: number;
  type: 'topic';
  nodeId: string;
  label: string;
  words: string[];
  word_weights: [string, number][];
  weight: number;
  prevalence: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface DocumentNode extends SimulationNodeDatum {
  id: number;
  type: 'document';
  nodeId: string;
  title: string;
  date: string;
  publisher: string;
  topic_weights: number[];
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export type Node = TopicNode | DocumentNode;

export interface Link {
  source: string | Node;
  target: string | Node;
  weight: number;
}

export interface VisualizationData {
  nodes: Node[];
  links: Link[];
} 