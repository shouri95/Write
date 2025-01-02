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
    Connection
} from "reactflow";
import "reactflow/dist/style.css";
import { SceneBox } from "./scenebox";
import { initToolboxActions } from "@/utils/toolbox-actions";

// Default starting nodes
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

const Canvas: React.FC = () => {
    const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
    const viewportRef = useRef<Viewport | null>(null);
    const edgeUpdateSuccessful = useRef(true);

    // This is where we store all nodes and edges
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [expandedNode, setExpandedNode] = useState<string | null>(null);

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

    // Make sure toolbox actions have access to setNodes
    useEffect(() => {
        // This sets setNodesRef and setEdgesRef for onAdd() / onDelete() etc.
        initToolboxActions(setNodes, setEdges);
    }, [setNodes, setEdges]);

    const onInit = useCallback((instance: ReactFlowInstance) => {
        reactFlowInstance.current = instance;
        viewportRef.current = instance.getViewport();
    }, []);

    const onMoveEnd = useCallback((event: any, viewport: Viewport) => {
        viewportRef.current = viewport;
    }, []);

    // Example expand logic for SceneBox
    const handleExpand = useCallback((id: string, isExpanded: boolean) => {
        setExpandedNode(isExpanded ? id : null);
    }, []);

    // Define custom node types
    const nodeTypes: NodeTypes = useMemo(
        () => ({
            sceneBox: (props) => (
                <SceneBox
                    {...props}
                    number={props.data.number}
                    content={props.data.content || ''}
                    onContentChange={(content) => {
                        setNodes(nodes => nodes.map(node => 
                            node.id === props.id
                              ? { ...node, data: { ...node.data, content } }
                              : node
                        ));
                    }}
                    onDelete={() => {
                        setNodes(nodes => nodes.filter(node => node.id !== props.id));
                        setEdges(edges => edges.filter(edge => edge.source !== props.id && edge.target !== props.id));
                    }}
                    onExpand={handleExpand}
                    isCurrentlyExpanded={expandedNode === props.id}
                />
            ),
        }),
        [handleExpand, expandedNode, setNodes, setEdges]
    );

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
        </div>
    );
};

export default Canvas;
