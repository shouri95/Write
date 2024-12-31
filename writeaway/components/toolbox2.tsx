'use client'

import { Plus, Trash2, Edit, Link, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Toolbox2() {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-md shadow-lg flex space-x-2 p-2">
      <Button variant="ghost" size="icon" className="h-10 w-10">
        <Plus className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-10 w-10">
        <Trash2 className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-10 w-10">
        <Edit className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-10 w-10">
        <Link className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-10 w-10">
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  )
}