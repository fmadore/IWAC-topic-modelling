import type { Node, ILink } from '../types';
import * as d3 from 'd3';

export interface SimulationConfig {
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

export const defaultConfig: SimulationConfig = {
  width: 1100,
  height: 800,
  nodeRadius: {
    topic: 20,
    document: 5
  },
  forces: {
    link: {
      strength: 1
    },
    charge: {
      strength: -100
    },
    collision: {
      radiusScale: 1
    }
  }
};

export function createSimulation(
  nodes: Node[],
  links: ILink[],
  config: SimulationConfig = defaultConfig
): d3.Simulation<Node, ILink> {
  return d3.forceSimulation<Node>(nodes)
    .force('link', d3.forceLink<Node, ILink>(links)
      .id(d => d.nodeId)
      .strength(d => d.weight * config.forces.link.strength))
    .force('charge', d3.forceManyBody().strength(config.forces.charge.strength))
    .force('center', d3.forceCenter(config.width / 2, config.height / 2))
    .force('collision', d3.forceCollide().radius(d => 
      (d as Node).type === 'topic' 
        ? config.nodeRadius.topic * config.forces.collision.radiusScale 
        : config.nodeRadius.document * config.forces.collision.radiusScale
    ));
} 