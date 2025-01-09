// File: components/sidebar/types.ts

export interface Scene {
  id: string;
  name: string;
  content: string;
}

export interface Project {
  id: string;
  name: string;
  activeSection: string;
  // NEW: each project can have its own color for display
  color?: string;
  sections: {
    canvas: {
      title: string;
      content: string;
    };
    screenplay: {
      title: string;
      content: string;
    };
    scenes: {
      title: string;
      items: Scene[];
    };
  };
}
