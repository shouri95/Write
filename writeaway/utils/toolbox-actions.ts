// utils/toolbox-actions.ts
import { Dispatch, SetStateAction, useEffect } from "react";
import { Node, Edge } from "reactflow";
import { v4 as uuidv4 } from 'uuid';

let setNodesRef: Dispatch<SetStateAction<Node[]>> | null = null;
let setEdgesRef: Dispatch<SetStateAction<Edge[]>> | null = null;

export function initToolboxActions(
    setNodes: Dispatch<SetStateAction<Node[]>>,
    setEdges: Dispatch<SetStateAction<Edge[]>>
) {
    setNodesRef = setNodes;
    setEdgesRef = setEdges;
}

export function setupToolboxActions(
    setNodes: Dispatch<SetStateAction<Node[]>>,
    setEdges: Dispatch<SetStateAction<Edge[]>>
) {
    useEffect(() => {
        initToolboxActions(setNodes, setEdges);
    }, [setNodes, setEdges]);
}

export function onAdd() {
    if (!setNodesRef || !setEdgesRef) return;

    setNodesRef((prevNodes) => {
        const newNodeNumber = prevNodes.length + 1;
        const newNode = {
            id: `node-${newNodeNumber}`,
            type: 'sceneBox', // Changed from 'default' to 'sceneBox'
            position: { x: Math.random() * 500, y: Math.random() * 500 },
            data: {
                number: newNodeNumber,
                content: '',
                label: `Scene ${newNodeNumber}`
            }
        };

        return [...prevNodes, newNode];
    });
}

export function onDelete() {
    if (!setNodesRef || !setEdgesRef) return;

    setNodesRef((prevNodes) => {
        if (prevNodes.length === 0) {
            return prevNodes;
        }

        // Example: delete the *last* node in the array
        const lastNode = prevNodes[prevNodes.length - 1];

        if (setEdgesRef) {
            setEdgesRef((prevEdges) => {
                return prevEdges.filter(edge => edge.source !== lastNode.id && edge.target !== lastNode.id);
            });
        }

        return prevNodes.slice(0, -1);
    });
}

export function onEdit() {
    console.log("Editing item");
}

export function onLink() {
    console.log("Linking item");
}
