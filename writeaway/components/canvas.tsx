"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
} from 'reactflow';
import 'reactflow/dist/style.css';
import { SceneBox } from './scenebox';
import { toolboxActions } from '@/utils/toolbox-actions';

// Default starting nodes
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'sceneBox',
    position: { x: 100, y: 100 },
    data: { label: 'Scene 1' },
  },
  {
    id: '2',
    type: 'sceneBox',
    position: { x: 400, y: 100 },
    data: { label: 'Scene 2' },
  },
];

const initialEdges: Edge[] = [];

const Canvas: React.FC = () => {
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const viewportRef = useRef<Viewport | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  const updateNodesWithoutChangingViewport = useCallback(
    (newNodes: Node[]) => {
      if (reactFlowInstance.current && viewportRef.current) {
        setNodes(newNodes);
        setTimeout(() => {
          reactFlowInstance.current?.setViewport(viewportRef.current!);
        }, 0);
      } else {
        setNodes(newNodes);
      }
    },
    [setNodes]
  );

  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
    viewportRef.current = instance.getViewport();
  }, []);

  const onMoveEnd = useCallback((event: any, viewport: Viewport) => {
    viewportRef.current = viewport;
  }, []);

  // Custom expand logic for SceneBox
  const handleExpand = useCallback((id: string, isExpanded: boolean) => {
    setExpandedNode(isExpanded ? id : null);
  }, []);

  // We define our nodeTypes for ReactFlow
  // Pass the custom props onExpand, isCurrentlyExpanded to SceneBox
  const nodeTypes: NodeTypes = useMemo(
    () => ({
      sceneBox: (props) => (
        <SceneBox
          {...props}
          onExpand={handleExpand}
          isCurrentlyExpanded={expandedNode === props.id}
        />
      ),
    }),
    [handleExpand, expandedNode]
  );

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
    </div>
  );
};

export default Canvas;
