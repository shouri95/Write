'use client'

import { useState } from 'react'
import { ChevronDown, Plus, Trash2, Edit, Link } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface SceneBoxProps {
  number: number
  content: string
  onContentChange: (content: string) => void
  onDelete: () => void
}

export function SceneBox({ number, content, onContentChange, onDelete }: SceneBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative w-64 h-48 bg-white border border-gray-200 rounded-lg shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sequential Number */}
      <div className="absolute top-2 left-2 text-sm font-semibold text-gray-500">
        {number}
      </div>

      {/* Expand Icon */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1 right-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </Button>

      {/* Text Area */}
      <Textarea
        className="w-full h-full p-6 pt-8 resize-none border-none focus:ring-0"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Enter scene description..."
      />

      {/* Connection Circles */}
      <div className="absolute bottom-2 left-2 flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
      </div>

      {/* Hover Toolbar */}
      {isHovered && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-md shadow-lg flex space-x-1 p-1">
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Link className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

