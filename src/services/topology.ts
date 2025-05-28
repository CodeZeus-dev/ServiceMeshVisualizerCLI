import { Service } from './discovery';

export interface Node {
    id: string;
    name: string;
    namespace: string;
    type: 'service';
    metadata: Record<string, any>;
}

export interface Edge {
    source: string;
    target: string;
    type: 'communication';
    metadata: Record<string, any>;
}

export interface Topology {
    nodes: Node[];
    edges: Edge[];
}

export function generateTopology(services: Service[]): Topology {
    const nodes: Node[] = services.map(service => ({
        id: `${service.namespace}/${service.name}`,
        name: service.name,
        namespace: service.namespace,
        type: 'service',
        metadata: {
            endpoints: service.endpoints,
            labels: service.labels
        }
    }));

    // Generate edges based on service dependencies
    // In a real implementation, this would analyze actual service communication patterns
    const edges: Edge[] = [
        {
            source: 'default/frontend',
            target: 'default/backend',
            type: 'communication',
            metadata: {
                protocol: 'http',
                port: 8080
            }
        },
        {
            source: 'default/backend',
            target: 'default/database',
            type: 'communication',
            metadata: {
                protocol: 'postgresql',
                port: 5432
            }
        }
    ];

    return { nodes, edges };
} 