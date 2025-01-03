// src/utils/screenplayFormatter.ts

interface Scene {
    id: string
    title: string
    scriptContent: string
    position: { x: number; y: number }
    size: { width: number; height: number }
    characters: string[]
    color: string
  }
  
  interface Character {
    id: string
    name: string
    description: string
  }
  
  export const formatScene = (scene: Scene, characters: Character[]): string => {
    const sceneNumberMatch = scene.title.match(/Scene (\d+)/i)
    const sceneNumber = sceneNumberMatch ? sceneNumberMatch[1] : 'Unknown'
    const location = extractLocation(scene.title)
    const timeOfDay = extractTimeOfDay(scene.title)
  
    const sceneHeading = `EXT. ${location} - ${timeOfDay}`
  
    const formattedScript = scriptContentToFormattedText(scene.scriptContent, characters)
  
    return `${sceneHeading}\n\n${formattedScript}`
  }
  
  const extractLocation = (title: string): string => {
    // Example: "Scene 1: Office" => "OFFICE"
    const match = title.match(/Scene \d+: (.+)/i)
    return match ? match[1].toUpperCase() : "UNKNOWN LOCATION"
  }
  
  const extractTimeOfDay = (title: string): string => {
    // Example: "Scene 1: Office (Day)" => "DAY"
    const match = title.match(/\((Day|Night|Evening|Morning)\)/i)
    return match ? match[1].toUpperCase() : "DAY"
  }
  
  const scriptContentToFormattedText = (scriptContent: string, characters: Character[]): string => {
    // Basic formatter: Replace character IDs with names
    // Implement more sophisticated formatting as needed
    let formatted = scriptContent
  
    characters.forEach(char => {
      const regex = new RegExp(`\\b${char.name}\\b`, 'g')
      formatted = formatted.replace(regex, `**${char.name.toUpperCase()}**`)
    })
  
    return formatted
  }