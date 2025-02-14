import type { Node, Link } from '../types';
import type { SimulationConfig } from './simulation';
import * as d3 from 'd3';

export interface VisualizationHandlers {
  onNodeMouseOver: (event: MouseEvent, node: Node) => void;
  onNodeMouseMove: (event: MouseEvent) => void;
  onNodeMouseOut: (event: MouseEvent) => void;
}

export function renderVisualization(
  container: SVGGElement,
  nodes: Node[],
  links: Link[],
  config: SimulationConfig,
  handlers: VisualizationHandlers
) {
  // Draw links
  const link = d3.select(container)
    .selectAll('.link')
    .data(links)
    .join('line')
    .attr('class', 'link')
    .attr('stroke-width', d => d.weight * 2);

  // Draw nodes
  const node = d3.select(container)
    .selectAll<SVGCircleElement, Node>('.node')
    .data(nodes)
    .join('circle')
    .attr('class', d => `node node-${d.type}`)
    .attr('r', d => d.type === 'topic' ? config.nodeRadius.topic : config.nodeRadius.document);

  // Add event handlers
  node.on('mouseover', handlers.onNodeMouseOver)
     .on('mousemove', handlers.onNodeMouseMove)
     .on('mouseout', handlers.onNodeMouseOut);

  return { node, link };
}

export function setupZoom(
  svg: SVGSVGElement,
  container: SVGGElement,
  config: { minZoom: number; maxZoom: number }
) {
  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([config.minZoom, config.maxZoom])
    .on('zoom', (event) => {
      d3.select(container).attr('transform', event.transform);
    });

  d3.select(svg).call(zoom);
  return zoom;
}

export function createDragBehavior(simulation: d3.Simulation<Node, Link>) {
  return d3.drag<SVGCircleElement, Node>()
    .on('start', (event) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    })
    .on('drag', (event) => {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    })
    .on('end', (event) => {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    });
}