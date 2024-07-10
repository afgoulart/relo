import { create } from 'zustand';

interface Annotation {
  x: number;
  y: number;
  width: number;
  height: number;
  category: string;
}

interface AppState {
  annotations: Annotation[];
  addAnnotation: (annotation: Annotation) => void;
  discardAnnotation: () => void;
}

const useStore = create<AppState>((setState) => ({
  annotations: [],
  addAnnotation: (annotation: Annotation) => setState((state: AppState) => ({
    annotations: [...state.annotations, annotation]
  })),
  discardAnnotation: () => setState(() => ({ annotations: [] }))
}));

export default useStore;
