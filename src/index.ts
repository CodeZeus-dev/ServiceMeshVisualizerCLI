#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import { discoverServices } from './services/discovery';
import { generateTopology } from './services/topology';
import { visualizeTopology } from './services/visualization';

const program = new Command();

console.log(
    chalk.blue(
        figlet.textSync('Service Mesh Visualizer', { horizontalLayout: 'full' })
    )
);

program
    .version('1.0.0')
    .description('CLI tool for visualizing service mesh topology');

program
    .command('discover')
    .description('Discover services in the mesh')
    .option('-n, --namespace <namespace>', 'Kubernetes namespace')
    .action(async (options) => {
        try {
            const services = await discoverServices(options.namespace);
            console.log(chalk.green('Discovered services:'));
            console.log(services);
        } catch (error) {
            console.error(chalk.red('Error discovering services:'), error);
        }
    });

program
    .command('visualize')
    .description('Generate and display service mesh topology')
    .option('-n, --namespace <namespace>', 'Kubernetes namespace')
    .option('-o, --output <format>', 'Output format (svg, html)', 'html')
    .action(async (options) => {
        try {
            const services = await discoverServices(options.namespace);
            const topology = generateTopology(services);
            await visualizeTopology(topology, options.output);
        } catch (error) {
            console.error(chalk.red('Error visualizing topology:'), error);
        }
    });

program.parse(process.argv); 