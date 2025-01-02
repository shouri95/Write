// utils/toolbox-actions.ts
import { Dispatch, SetStateAction, useEffect } from "react";
import { Node, Edge } from "reactflow";
import { v4 as uuidv4 } from "uuid";

let setNodesRef: Dispatch<SetStateAction<Node[]>> | null = null;
let setEdgesRef: Dispatch<SetStateAction<Edge[]>> | null = null;

export function initToolboxActions(
  setNodes: Dispatch<SetStateAction<Node[]>>,
  setEdges: Dispatch<SetStateAction<Edge[]>>
) {
  setNodesRef = setNodes;
  setEdgesRef = setEdges;
}

export function onAdd() {
  if (!setNodesRef) return;

  setNodesRef((prevNodes) => {
    const newNodeNumber = prevNodes.length + 1;
    const newNode: Node = {
      id: `node-${newNodeNumber}`,
      type: "sceneBox",
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: {
        number: newNodeNumber,
        content: "",
        label: `Scene ${newNodeNumber}`,
      },
    };
    return [...prevNodes, newNode];
  });
}

export function onDelete(selectedNodeId: string) {
  if (!setNodesRef || !setEdgesRef) return;

  setNodesRef((prevNodes) =>
    prevNodes.filter((node) => node.id !== selectedNodeId)
  );
  setEdgesRef((prevEdges) =>
    prevEdges.filter(
      (edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId
    )
  );
}

export function onEdit() {
  // Implement your edit logic
  console.log("Editing item");
}

export function onLink() {
  // Implement your link logic
  console.log("Linking item");
}
