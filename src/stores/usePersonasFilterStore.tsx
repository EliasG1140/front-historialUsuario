import { create } from "zustand";

export interface PersonasFilterState {
  liderId?: number | null;
  coordinadorId?: number | null;
  puestoVotacionId?: number | null;
  mesaVotacionId?: number | null;
  categoriaId?: number | null;
  onlyLider?: boolean | null;
  onlyCoordinador?: boolean | null;
  setFilters: (filters: Partial<PersonasFilterState>) => void;
  clearFilters: () => void;
}

export const usePersonasFilterStore = create<PersonasFilterState>((set) => ({
  liderId: null,
  coordinadorId: null,
  puestoVotacionId: null,
  mesaVotacionId: null,
  setFilters: (filters) => set({ ...filters }),
  clearFilters: () =>
    set({
      liderId: null,
      puestoVotacionId: null,
      coordinadorId: null,
      mesaVotacionId: null,
      categoriaId: null,
      onlyLider: null,
      onlyCoordinador: null,
    }),
}));
