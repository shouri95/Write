"use client"

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { formatScene } from '../utils/screenplayformatter'

const ScreenplayFormatter: React.FC = () => {
  const scenes = useSelector((state: RootState) => state.scenes.scenes)
  const characters = useSelector((state: RootState) => state.characters.characters)

  // Format screenplay content by excluding description
  const formattedScreenplay = scenes.map(scene => {
    const sceneCharacters = characters.filter(char => scene.characters.includes(char.id))
    return formatScene(scene, sceneCharacters)
  }).join('\n\n')

  return (
    <div className="formatted-screenplay p-4 bg-gray-50 rounded-md shadow-md overflow-auto max-h-screen">
      <pre className="whitespace-pre-wrap text-lg">{formattedScreenplay}</pre>
    </div>
  )
}

export default ScreenplayFormatter