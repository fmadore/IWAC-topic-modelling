# IWAC Topic Modelling

## Overview

The IWAC Topic Modelling application is a web-based tool for exploring and visualizing topics generated from textual data. It integrates a Python-based topic modeling pipeline using Latent Dirichlet Allocation (LDA) with an interactive front-end developed in SvelteKit and D3.js. The application allows users to easily explore topics, inspect associated documents, and interact with graphical representations of topic-document relationships.

## Features

- **Topic Modeling Pipeline**: Uses LDA for extracting topics from preprocessed article texts. The Python script (`topic_modeling.py`) processes raw data and outputs results as JSON.
- **Interactive Visualization**: A dynamic visualization built with Svelte and D3.js enables users to explore topics and their connections to documents through an interactive force-directed graph.
- **Multiple Dataset Support**: Users can switch between different organizational datasets through a clean dropdown interface.
- **Document-Topic Connections**: Visualizes the relationships between documents and their most relevant topics, with connection strength indicated by line thickness.
- **Dynamic Controls**: Users can adjust a threshold slider to filter connections (links) based on topic-document weight, as well as use zoom in/out and reset functions for better navigation.
- **Interactive Graph**: Nodes can be dragged and repositioned, with the force-directed layout automatically adjusting to maintain optimal spacing.
- **Tooltips & Metadata**: Hover over nodes to display detailed information including topic labels, word weights, publication dates, and source details.
- **Responsive UI**: The user interface is designed for clarity and responsiveness to facilitate both casual exploration and in-depth analysis.

## Architecture

- **Frontend**:
  - **SvelteKit Application**: The user interface is built using SvelteKit. Key components include:
    - `DatasetPicker.svelte`: Manages dataset selection and switching between different organization's topic models.
    - `TopicVisualization.svelte`: Combines various visualization components and handles tooltip interactions.
    - `VisualizationGraph.svelte`: Manages the SVG graph rendering and D3.js-based force simulation.
    - `Tooltip.svelte` & `VisualizationControls.svelte`: Provide interactive feedback and control mechanisms.
  - **D3.js Integration**: Implements force-directed layout, zooming, and dynamic link updates via D3.js in conjunction with Svelte reactivity.

- **Backend/Processing**:
  - **Python Topic Modeling**: The `topic_modeling.py` script processes raw article data (sourced from `integrisme_data.json`) using scikit-learn's LDA to extract topics and compute document-topic weights. The output JSON is then used by the frontend for visualization.

- **Utilities and Models**:
  - **Simulation & Visualization Utilities**: Located in `src/lib/utils/`, these files (e.g., `simulation.ts` and `visualization.ts`) manage the force simulation parameters and D3 rendering setups.
  - **Data Models and Types**: The codebase uses TypeScript interfaces and classes (in `src/lib/types.ts`, `src/lib/models.ts`, etc.) for strong type checking across the application.

## Components Overview

The frontend of the application is organized into several key Svelte components:

- **DatasetPicker.svelte**: A streamlined dropdown component for switching between different organizational datasets.
- **TopicVisualization.svelte**: Combines various visualization components including tooltips, dynamic graphs, and control panels. It serves as the main entry point for managing data flow and user interactions.
- **VisualizationGraph.svelte**: Renders an interactive SVG-based graph using D3.js's force simulation. It leverages the **GraphController** to manage zooming, panning, dragging, and the dynamic updating of links in response to changes in the data.
- **Tooltip.svelte**: Displays context-sensitive details for topics and documents when users hover over nodes.
- **VisualizationControls.svelte**: Provides interactive controls, including a threshold slider for filtering connections and buttons for zoom operations.

## TypeScript Files Overview

The application's TypeScript files provide the core functionality and ensure robust type-checking across the application. Key aspects include:

- **Controllers**: The `graphController.ts` in `src/lib/controllers` coordinates the D3 force simulation, zooming, panning, dragging, and updates to the graph based on user interactions.
- **Utilities**: Files like `simulation.ts` and `visualization.ts` in `src/lib/utils` set up the force simulation, define default configurations, and manage rendering, zooming, and dragging behaviors.
- **Data Processing**: The `dataProcessing.ts` file converts raw topic and document data into a structured format with nodes and links, which the visualization consumes.
- **Models and Types**: Files such as `models.ts`, `types.ts`, `types.d.ts`, and `interfaces.ts` define the structure of topics, documents, links, and overall visualization data, ensuring consistency via strong type checking.

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd IWAC-topic-modelling
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open the application in your browser at the indicated local address.

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview the Production Build**
   ```bash
   npm run preview
   ```

## Acknowledgements

- Built with [SvelteKit](https://kit.svelte.dev/) and [D3.js](https://d3js.org/).
- Topic modeling powered by [scikit-learn](https://scikit-learn.org/).