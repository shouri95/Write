"use client";

import { Plus, Trash2, Edit, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { onAdd, onDelete, onEdit, onLink } from "@/utils/toolbox-actions";

export default function Toolbox1() {
    return (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-md shadow-lg flex space-x-1 p-1">
            <Button variant="ghost" size="icon" onClick={onAdd}>
                <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onEdit}>
                <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onLink}>
                <Link className="h-4 w-4" />
            </Button>
        </div>
    );
}
