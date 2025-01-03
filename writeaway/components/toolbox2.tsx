"use client";

import { Plus, Trash2, Edit, Link, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { onAdd, onDelete, onEdit, onLink } from "@/utils/toolbox-actions";

export default function Toolbox2({
  selectedNodeId,
}: {
  selectedNodeId: string | null;
}) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg flex space-x-6 p-1">
      <Button variant="ghost" size="icon" className="h-10 w-10" onClick={onAdd}>
        <Plus className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10"
        onClick={() => {
          if (selectedNodeId) {
            onDelete(selectedNodeId);
          }
        }}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10"
        onClick={onEdit}
      >
        <Edit className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10"
        onClick={onLink}
      >
        <Link className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-10 w-10">
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
}
