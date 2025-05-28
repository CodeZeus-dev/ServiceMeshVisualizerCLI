# Service Mesh Visualizer CLI

A command-line tool for visualizing service mesh topology in distributed systems. This tool helps you understand how services interact within your service mesh by providing an interactive visualization of the service topology.

## Features

- Service discovery in Kubernetes/Istio environments
- Automatic topology mapping of service dependencies
- Interactive visualization using D3.js
- Support for both HTML and SVG output formats

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/service-mesh-visualizer.git
cd service-mesh-visualizer

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Discover Services

```bash
# Discover services in the default namespace
npm start discover

# Discover services in a specific namespace
npm start discover --namespace my-namespace
```

### Visualize Topology

```bash
# Generate HTML visualization
npm start visualize

# Generate SVG visualization
npm start visualize --output svg

# Visualize services in a specific namespace
npm start visualize --namespace my-namespace
```

## Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test
```

## Project Structure

```
service-mesh-visualizer/
├── src/
│   ├── index.ts              # CLI entry point
│   └── services/
│       ├── discovery.ts      # Service discovery logic
│       ├── topology.ts       # Topology generation
│       └── visualization.ts  # D3.js visualization
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 