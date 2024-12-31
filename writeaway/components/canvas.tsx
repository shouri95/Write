// src/components/Playground/PlaygroundCanvas.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  ReactFlowInstance,
  Viewport,
} from 'reactflow';
import 'reactflow/dist/style.css';

const nodeTypes = {};

const PlaygroundCanvas: React.FC = () => {
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const viewportRef = useRef<Viewport | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const updateNodesWithoutChangingViewport = useCallback((newNodes: Node[]) => {
    if (reactFlowInstance.current && viewportRef.current) {
      setNodes(newNodes);
      setTimeout(() => {
        reactFlowInstance.current?.setViewport(viewportRef.current!);
      }, 0);
    } else {
      setNodes(newNodes);
    }
  }, [setNodes]);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
    viewportRef.current = instance.getViewport();
  }, []);

  const onMoveEnd = useCallback((event: any, viewport: Viewport) => {
    viewportRef.current = viewport;
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={[15, 15]}
        onInit={onInit}
        onMoveEnd={onMoveEnd}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView={false}
      >
        <Background color="#999999" gap={15} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default PlaygroundCanvas;
