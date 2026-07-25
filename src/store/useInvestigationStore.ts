import { create } from 'zustand';
import type { Case, Evidence, Person, BoardItem, BoardConnection } from '../types';
import { mockCases, mockEvidence, mockPeople } from '../lib/mockData';

interface InvestigationState {
  cases: Case[];
  evidence: Evidence[];
  people: Person[];
  activeCaseId: string | null;
  boardItems: BoardItem[];
  boardConnections: BoardConnection[];
  
  setActiveCase: (id: string | null) => void;
  updateBoardItemPosition: (id: string, x: number, y: number) => void;
  addBoardItem: (item: Omit<BoardItem, 'id'>) => void;
  addBoardConnection: (connection: Omit<BoardConnection, 'id'>) => void;
  removeBoardItem: (id: string) => void;
}

export const useInvestigationStore = create<InvestigationState>((set) => ({
  cases: mockCases,
  evidence: mockEvidence,
  people: mockPeople,
  activeCaseId: mockCases[0]?.id || null,
  
  // Initial board state for the active case (mock)
  boardItems: [
    { id: 'item-1', type: 'person', refId: mockPeople[0]?.id, x: 400, y: 300 },
    { id: 'item-2', type: 'evidence', refId: mockEvidence[0]?.id, x: 200, y: 200 },
    { id: 'item-3', type: 'note', content: 'Suspect was seen near the loading dock.', x: 600, y: 150 },
  ],
  boardConnections: [
    { id: 'conn-1', sourceId: 'item-1', targetId: 'item-2' },
    { id: 'conn-2', sourceId: 'item-1', targetId: 'item-3' }
  ],

  setActiveCase: (id) => set({ activeCaseId: id }),
  
  updateBoardItemPosition: (id, x, y) => set((state) => ({
    boardItems: state.boardItems.map(item => 
      item.id === id ? { ...item, x, y } : item
    )
  })),

  addBoardItem: (item) => set((state) => ({
    boardItems: [...state.boardItems, { ...item, id: `item-${Date.now()}` }]
  })),

  addBoardConnection: (conn) => set((state) => ({
    boardConnections: [...state.boardConnections, { ...conn, id: `conn-${Date.now()}` }]
  })),

  removeBoardItem: (id) => set((state) => ({
    boardItems: state.boardItems.filter(i => i.id !== id),
    boardConnections: state.boardConnections.filter(c => c.sourceId !== id && c.targetId !== id)
  }))
}));
