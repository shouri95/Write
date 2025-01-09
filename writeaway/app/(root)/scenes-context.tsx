"use client";

import React, { createContext, useState, useContext } from "react";

type Scene = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    number: number;
    content?: string;
  };
};

type ScenesContextValue = {
  scenes: Scene[];
  addScene: () => void;
  deleteScene: (id: string) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
};

const ScenesContext = createContext<ScenesContextValue>({
  scenes: [],
  addScene: () => {},
  deleteScene: () => {},
  selectedNodeId: null,
  setSelectedNodeId: () => {},
});

export function ScenesProvider({ children }: { children: React.ReactNode }) {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  function addScene() {
    const newNodeNumber = scenes.length + 1;
    const newScene: Scene = {
      id: `node-${newNodeNumber}`,
      type: "sceneBox",
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: {
        number: newNodeNumber,
        label: `Scene ${newNodeNumber}`,
        content: ""
      }
    };
    setScenes(prev => [...prev, newScene]);
  }

  function deleteScene(id: string) {
    setScenes(prev => prev.filter(scene => scene.id !== id));
    if (selectedNodeId === id) {
      setSelectedNodeId(null);
    }
  }

  return (
    <ScenesContext.Provider 
      value={{ 
        scenes, 
        addScene, 
        deleteScene, 
        selectedNodeId,
        setSelectedNodeId 
      }}
    >
      {children}
    </ScenesContext.Provider>
  );
}

export function useScenes() {
  const context = useContext(ScenesContext);
  if (!context) {
    throw new Error("useScenes must be used within a ScenesProvider");
  }
  return context;
}