"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NodeProps } from "reactflow";
import Toolbox1 from "./toolbox1";

interface SceneBoxProps extends NodeProps {
  number: number;
  content: string;
  onContentChange: (content: string) => void;
  onDelete: () => void;
  onExpand: (id: string, isExpanded: boolean) => void;
  isCurrentlyExpanded: boolean;

  // new for selection
  isSelected: boolean;
  onSelect: () => void;
}

export function SceneBox({
  number,
  content,
  onContentChange,
  onDelete,
  onExpand,
  isCurrentlyExpanded,
  id,
  data,

  // new
  isSelected,
  onSelect,
}: SceneBoxProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onSelect()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative w-64 h-48
        border border-gray-200 rounded-lg shadow-md cursor-pointer
        ${isSelected ? "bg-gray-100" : "bg-white"}
      `}
    >
      {/* Number label */}
      <div className="absolute top-2 left-2 text-sm font-semibold text-gray-500">
        {number}
      </div>

      {/* Expand button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1 right-1"
        onClick={(e) => {
          e.stopPropagation();
          onExpand(id, !isCurrentlyExpanded);
        }}
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isCurrentlyExpanded ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Text area */}
      <Textarea
        className="w-full h-full p-6 pt-8 resize-none border-none focus:ring-0"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Enter scene description..."
      />

      {/* Connection circles */}
      <div className="absolute bottom-2 left-2 flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
      </div>

      {/* Toolbox1 only appears on hover */}
      {isHovered && <Toolbox1 selectedNodeId={id} />}
    </div>
  );
}
