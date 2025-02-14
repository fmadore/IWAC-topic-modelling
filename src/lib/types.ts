import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export interface ITopicNode extends SimulationNodeDatum {
  id: number;
  type: 'topic';
  nodeId: string;
  label: string;
  words: string[];
  word_weights: [string, number][];
  weight: number;
  prevalence: number;
}

export interface IDocumentNode extends SimulationNodeDatum {
  id: number;
  type: 'document';
  nodeId: string;
  title: string;
  date: string;
  publisher: string;
  topic_weights: number[];
}

export type INode = ITopicNode | IDocumentNode;

export interface ILink extends SimulationLinkDatum<INode> {
  source: string | INode;
  target: string | INode;
  weight: number;
}

export interface IVisualizationData {
  nodes: INode[];
  links: ILink[];
}

export interface IVisualizationConfig {
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

export interface IZoomConfig {
  minZoom: number;
  maxZoom: number;
}

// Runtime class implementation for VisualizationData used in processData
export class VisualizationData implements IVisualizationData {
  constructor(public nodes: INode[], public links: ILink[]) {}
  
  static create(nodes: INode[], links: ILink[]): VisualizationData {
    return new VisualizationData(nodes, links);
  }
}

export class TopicNode implements ITopicNode {
  id!: number;
  type: 'topic' = 'topic';
  nodeId!: string;
  label!: string;
  words!: string[];
  word_weights!: [string, number][];
  weight!: number;
  prevalence!: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  index?: number;

  constructor(data: Partial<TopicNode>) {
    Object.assign(this, data);
  }
}

export class DocumentNode implements SimulationNodeDatum {
  id!: number;
  type: 'document' = 'document';
  nodeId!: string;
  title!: string;
  date!: string;
  publisher!: string;
  topic_weights!: number[];
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  index?: number;

  constructor(data: Partial<DocumentNode>) {
    Object.assign(this, data);
  }
}

export type Node = TopicNode | DocumentNode;
export class Link implements SimulationLinkDatum<Node> {
  source!: string | Node;
  target!: string | Node;
  weight!: number;
  index?: number;

  constructor(data: Partial<Link>) {
    Object.assign(this, data);
  }
}

export class VisualizationConfig {
  width: number = 1100;
  height: number = 800;
  nodeRadius = {
    topic: 20,
    document: 5
  };
  forces = {
    link: {
      strength: 1
    },
    charge: {
      strength: -100
    },
    collision: {
      radiusScale: 1
    }
  };

  constructor(data?: Partial<VisualizationConfig>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export class ZoomConfig {
  minZoom: number = 0.1;
  maxZoom: number = 4;

  constructor(data?: Partial<ZoomConfig>) {
    if (data) {
      Object.assign(this, data);
    }
  }
} 