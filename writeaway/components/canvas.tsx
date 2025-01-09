"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  ReactFlowInstance,
  Viewport,
  NodeTypes,
  updateEdge,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import { SceneBox } from "./scenebox";
import { initToolboxActions, onDelete } from "@/utils/toolbox-actions";
import Toolbox2 from "./toolbox2";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "sceneBox",
    position: { x: 100, y: 100 },
    data: { label: "Scene 1", number: 1 },
  },
  {
    id: "2",
    type: "sceneBox",
    position: { x: 400, y: 100 },
    data: { label: "Scene 2", number: 2 },
  },
];

const initialEdges: Edge[] = [];

export default function Canvas() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const viewportRef = useRef<Viewport | null>(null);
  const edgeUpdateSuccessful = useRef(true);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // This state holds the currently selected node's ID:
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Standard connection handlers:
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);
  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((eds) => updateEdge(oldEdge, newConnection, eds));
    },
    [setEdges]
  );
  const onEdgeUpdateEnd = useCallback(
    (_: any, edge: Edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }
      edgeUpdateSuccessful.current = true;
    },
    [setEdges]
  );

  // Initialize the shared toolbox actions so they can access setNodes/setEdges:
  useEffect(() => {
    initToolboxActions(setNodes, setEdges);
  }, [setNodes, setEdges]);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
    viewportRef.current = instance.getViewport();
  }, []);
  const onMoveEnd = useCallback((_event: any, viewport: Viewport) => {
    viewportRef.current = viewport;
  }, []);

  // For toggling expansion in SceneBox (unchanged except for syntax tweaks):
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const handleExpand = useCallback((id: string, isExpanded: boolean) => {
    setExpandedNode(isExpanded ? id : null);
  }, []);

  // Our custom node types:
  const nodeTypes: NodeTypes = useMemo(
    () => ({
      sceneBox: (props) => (
        <SceneBox
          {...props}
          number={props.data.number}
          content={props.data.content || ""}
          onContentChange={(content) => {
            setNodes((ns) =>
              ns.map((n) =>
                n.id === props.id
                  ? { ...n, data: { ...n.data, content } }
                  : n
              )
            );
          }}
          onDelete={() => {
            // If you want to let each box delete itself, do it here:
            setNodes((ns) => ns.filter((n) => n.id !== props.id));
            setEdges((es) =>
              es.filter((e) => e.source !== props.id && e.target !== props.id)
            );
            if (selectedNodeId === props.id) {
              setSelectedNodeId(null);
            }
          }}
          onExpand={handleExpand}
          isCurrentlyExpanded={expandedNode === props.id}
          isSelected={selectedNodeId === props.id}
          onSelect={() => setSelectedNodeId(props.id)}
        />
      ),
    }),
    [expandedNode, handleExpand, selectedNodeId, setNodes, setEdges]
  );

  if (!isClient) {
    return <div style={{ width: "100%", height: "100vh" }} />;
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={onInit}
        onMoveEnd={onMoveEnd}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView={false}
        snapToGrid
        snapGrid={[15, 15]}
      >
        <Background color="#999999" gap={15} />
        <Controls />
        <MiniMap />
      </ReactFlow>

      {/*
        Toolbox2 is the floating bottom bar. 
        We'll pass the currently selected node's ID so onDelete knows which one to remove.
      */}
      <Toolbox2 selectedNodeId={selectedNodeId} />
    </div>
  );
}
