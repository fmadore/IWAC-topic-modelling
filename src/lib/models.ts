import type { 
  ITopicNode, 
  IDocumentNode, 
  ILink, 
  IVisualizationData, 
  IVisualizationConfig, 
  IZoomConfig 
} from './types';

export class TopicNode implements ITopicNode {
  id: number = 0;
  type: 'topic' = 'topic';
  nodeId: string = '';
  label: string = '';
  words: string[] = [];
  word_weights: [string, number][] = [];
  weight: number = 0;
  prevalence: number = 0;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  index?: number;

  constructor(data: Partial<ITopicNode>) {
    Object.assign(this, data);
  }
}

export class DocumentNode implements IDocumentNode {
  id: number = 0;
  type: 'document' = 'document';
  nodeId: string = '';
  title: string = '';
  date: string = '';
  publisher: string = '';
  topic_weights: number[] = [];
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  index?: number;

  constructor(data: Partial<IDocumentNode>) {
    Object.assign(this, data);
  }
}

export class Link implements ILink {
  source: string | TopicNode | DocumentNode;
  target: string | TopicNode | DocumentNode;
  weight: number = 0;
  index?: number;

  constructor(data: Partial<ILink>) {
    this.source = data.source!;
    this.target = data.target!;
    this.weight = data.weight ?? 0;
    this.index = data.index;
  }
}

export class VisualizationData implements IVisualizationData {
  nodes: (TopicNode | DocumentNode)[] = [];
  links: Link[] = [];

  constructor(data: { nodes: (TopicNode | DocumentNode)[]; links: Link[] }) {
    this.nodes = data.nodes;
    this.links = data.links;
  }
}

export class VisualizationConfig implements IVisualizationConfig {
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

  constructor(data?: Partial<IVisualizationConfig>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export class ZoomConfig implements IZoomConfig {
  minZoom: number = 0.1;
  maxZoom: number = 4;

  constructor(data?: Partial<IZoomConfig>) {
    if (data) {
      Object.assign(this, data);
    }
  }
} 