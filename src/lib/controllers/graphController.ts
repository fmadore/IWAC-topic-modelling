import * as d3 from 'd3';
import type { TopicNode, DocumentNode, Link, VisualizationConfig } from '$lib/models';
import { createSimulation } from '$lib/utils/simulation';
import { renderVisualization, setupZoom } from '$lib/utils/visualization';

export class GraphController {
  svg: SVGSVGElement;
  container: SVGGElement;
  simulation: d3.Simulation<TopicNode | DocumentNode, Link>;
  config: VisualizationConfig;
  nodes: (TopicNode | DocumentNode)[];
  links: Link[];
  nodeSelection: d3.Selection<SVGCircleElement, TopicNode | DocumentNode, SVGGElement, unknown>;
  linkSelection: d3.Selection<SVGLineElement, Link, SVGGElement, unknown>;
  private zoomBehavior: d3.ZoomBehavior<SVGSVGElement, unknown>;

  constructor(
    svg: SVGSVGElement,
    nodes: (TopicNode | DocumentNode)[],
    links: Link[],
    config: VisualizationConfig,
    onNodeHover: (event: MouseEvent, node: TopicNode | DocumentNode | null, ...args: any[]) => void
  ) {
    this.svg = svg;
    this.config = config;
    this.nodes = nodes;
    this.links = links;
    // Create container group
    const g = d3.select(svg).append('g');
    this.container = g.node() as SVGGElement;
    // Setup zoom behavior on the svg element using setupZoom
    this.zoomBehavior = setupZoom(this.svg, this.container, { minZoom: 0.1, maxZoom: 4 });

    // Initialize simulation
    this.simulation = createSimulation(this.nodes, this.links, this.config);

    // Render visualization elements
    const rendered = renderVisualization(this.container, this.nodes, this.links, this.config, {
      onNodeMouseOver: (event: MouseEvent, d: TopicNode | DocumentNode, ...args: any[]) => onNodeHover(event, d, ...args),
      onNodeMouseMove: (event: MouseEvent, d: TopicNode | DocumentNode, ...args: any[]) => onNodeHover(event, d, ...args),
      onNodeMouseOut: (event: MouseEvent, _node: TopicNode | DocumentNode | null, ...args: any[]) => onNodeHover(event, null, ...args)
    });
    this.nodeSelection = rendered.node as d3.Selection<SVGCircleElement, TopicNode | DocumentNode, SVGGElement, unknown>;
    this.linkSelection = rendered.link as d3.Selection<SVGLineElement, Link, SVGGElement, unknown>;

    // Setup tick update
    this.simulation.on('tick', () => {
      this.linkSelection
        .attr('x1', d => (d.source as TopicNode | DocumentNode).x ?? 0)
        .attr('y1', d => (d.source as TopicNode | DocumentNode).y ?? 0)
        .attr('x2', d => (d.target as TopicNode | DocumentNode).x ?? 0)
        .attr('y2', d => (d.target as TopicNode | DocumentNode).y ?? 0);
      this.nodeSelection
        .attr('cx', d => d.x ?? 0)
        .attr('cy', d => d.y ?? 0);
    });
  }

  // Method to update links (for example after changing threshold)
  updateLinks(newLinks: Link[]) {
    this.links = newLinks;
    // Update force linking
    const linkForce = this.simulation.force<d3.ForceLink<TopicNode | DocumentNode, Link>>('link');
    if (linkForce) {
      linkForce.links(newLinks);
    }
    
    // Update the link selection with the new links
    this.linkSelection = this.linkSelection.data<Link>(newLinks, (d, i, group) => `${(d.source as any).nodeId}-${(d.target as any).nodeId}`);
    this.linkSelection.exit().remove();
    const newLinkSelection = this.linkSelection.enter()
      .append('line')
      .attr('class', 'link') as d3.Selection<SVGLineElement, Link, SVGGElement, unknown>;
    this.linkSelection = newLinkSelection.merge(this.linkSelection as d3.Selection<SVGLineElement, Link, SVGGElement, unknown>);

    // Restart simulation
    this.simulation.alpha(1).restart();
  }

  // Zoom methods, assumed to be managed externally through already defined functions
  zoomBy(factor: number) {
    const currentTransform = d3.zoomTransform(this.svg);
    const newTransform = d3.zoomIdentity.translate(currentTransform.x, currentTransform.y).scale(currentTransform.k * factor);
    d3.select(this.svg).transition().duration(750).call(this.zoomBehavior.transform, newTransform);
  }

  zoomReset() {
    d3.select(this.svg).transition().duration(750).call(this.zoomBehavior.transform, d3.zoomIdentity);
  }

  destroy() {
    this.simulation.stop();
  }
} 