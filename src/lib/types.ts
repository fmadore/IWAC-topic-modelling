import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

// Create empty objects to represent our types at runtime
export const TopicNode = {};
export const DocumentNode = {};
export const Node = {};
export const Link = {};
export const IVisualizationData = {};

// Type definitions
export type TopicNode = SimulationNodeDatum & {
  id: number;
  type: 'topic';
  nodeId: string;
  label: string;
  words: string[];
  word_weights: [string, number][];
  weight: number;
  prevalence: number;
};

export type DocumentNode = SimulationNodeDatum & {
  id: number;
  type: 'document';
  nodeId: string;
  title: string;
  date: string;
  publisher: string;
  topic_weights: number[];
};

export type Node = TopicNode | DocumentNode;

export type Link = SimulationLinkDatum<Node> & {
  source: string | Node;
  target: string | Node;
  weight: number;
};

export type IVisualizationData = {
  nodes: Node[];
  links: Link[];
};

// Runtime class implementation
export class VisualizationData implements IVisualizationData {
  constructor(public nodes: Node[], public links: Link[]) {}
  
  static create(nodes: Node[], links: Link[]): VisualizationData {
    return new VisualizationData(nodes, links);
  }
} 