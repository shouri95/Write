// utils/toolbox-actions.ts

import { Node, addEdge, Edge } from 'reactflow';

let nextNodeId = 3; // Start from 3 since you have '1' and '2' already in initialNodes

export const toolboxActions = {
  onAdd: (
    nodes: Node[],
    setNodes: (nodes: Node[]) => void,
    edges: Edge[],
    setEdges: (edges: Edge[]) => void
  ) => {
    const newNode: Node = {
      id: `${nextNodeId}`,
      type: 'sceneBox',
      position: { x: Math.random() * 500, y: Math.random() * 500 }, // Adjust as needed for better placement
      data: { label: `Scene ${nextNodeId}` },
    };

    setNodes([...nodes, newNode]);
    nextNodeId++;
  },

  onDelete: (
    selectedNodeId: string | null,
    nodes: Node[],
    setNodes: (nodes: Node[]) => void,
    edges: Edge[],
    setEdges: (edges: Edge[]) => void
  ) => {
    if (!selectedNodeId) return;

    setNodes(nodes.filter((node) => node.id !== selectedNodeId));
    setEdges(edges.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));
  },

  onEdit: () => {
    // Edit logic here (currently not implemented as it requires more specific requirements)
    console.log('Editing item');
  },

  onLink: (
    selectedNodeId: string | null,
    nodes: Node[],
    setNodes: (nodes: Node[]) => void,
    edges: Edge[],
    setEdges: (edges: Edge[]) => void
  ) => {
    if (!selectedNodeId) return;
  
    // Find the first node that isn't the selected one. This is a simplistic way to choose a target.
    const targetNode = nodes.find((node) => node.id !== selectedNodeId);
  
    if (!targetNode) {
      console.log("No other node to link to.");
      return;
    }
  
    const newEdge: Edge = {
      id: `e${selectedNodeId}-${targetNode.id}`,
      source: selectedNodeId,
      target: targetNode.id,
      type: 'smoothstep', // Or your preferred edge type
      animated: true, // Optional
    };
  
    // Add the edge only if it doesn't already exist
    if (!edges.find(edge => edge.id === newEdge.id)) {
      setEdges([...edges, newEdge]);
    }
  },
  
};