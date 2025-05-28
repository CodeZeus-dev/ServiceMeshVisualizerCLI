import * as d3 from 'd3';
import { Topology } from './topology';
import * as fs from 'fs';
import * as path from 'path';

export async function visualizeTopology(topology: Topology, format: 'svg' | 'html' = 'html'): Promise<void> {
    if (format === 'html') {
        await generateHtmlVisualization(topology);
    } else {
        await generateSvgVisualization(topology);
    }
}

async function generateHtmlVisualization(topology: Topology): Promise<void> {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Service Mesh Topology</title>
      <script src="https://d3js.org/d3.v7.min.js"></script>
      <style>
        .node {
          fill: #69c0ff;
          stroke: #fff;
          stroke-width: 2px;
        }
        .link {
          stroke: #999;
          stroke-opacity: 0.6;
        }
        .node-label {
          font-size: 12px;
          font-family: Arial;
        }
      </style>
    </head>
    <body>
      <div id="visualization"></div>
      <script>
        const topology = ${JSON.stringify(topology)};
        
        const width = 800;
        const height = 600;
        
        const simulation = d3.forceSimulation(topology.nodes)
          .force('link', d3.forceLink(topology.edges).id(d => d.id))
          .force('charge', d3.forceManyBody().strength(-300))
          .force('center', d3.forceCenter(width / 2, height / 2));
        
        const svg = d3.select('#visualization')
          .append('svg')
          .attr('width', width)
          .attr('height', height);
        
        const link = svg.append('g')
          .selectAll('line')
          .data(topology.edges)
          .enter()
          .append('line')
          .attr('class', 'link');
        
        const node = svg.append('g')
          .selectAll('circle')
          .data(topology.nodes)
          .enter()
          .append('circle')
          .attr('class', 'node')
          .attr('r', 10)
          .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));
        
        const label = svg.append('g')
          .selectAll('text')
          .data(topology.nodes)
          .enter()
          .append('text')
          .attr('class', 'node-label')
          .text(d => d.name);
        
        simulation.on('tick', () => {
          link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
          
          node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
          
          label
            .attr('x', d => d.x + 15)
            .attr('y', d => d.y + 5);
        });
        
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
        
        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;
        }
        
        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }
      </script>
    </body>
    </html>
  `;

    const outputPath = path.join(process.cwd(), 'topology.html');
    fs.writeFileSync(outputPath, html);
    console.log(`Visualization saved to ${outputPath}`);
}

async function generateSvgVisualization(topology: Topology): Promise<void> {
    // SVG visualization implementation would go here
    // This is a placeholder for future implementation
    console.log('SVG visualization not yet implemented');
} 