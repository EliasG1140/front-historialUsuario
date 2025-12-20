import { create } from "zustand";

export interface PersonasFilterState {
  liderId?: number | null;
  puestoVotacionId?: number | null;
  mesaVotacionId?: number | null;
  categoriaId?: number | null;
  onlyLider?: boolean | null;
  setFilters: (filters: Partial<PersonasFilterState>) => void;
  clearFilters: () => void;
}

export const usePersonasFilterStore = create<PersonasFilterState>((set) => ({
  liderId: null,
  puestoVotacionId: null,
  mesaVotacionId: null,
  setFilters: (filters) => set({ ...filters }),
  clearFilters: () =>
    set({
      liderId: null,
      puestoVotacionId: null,
      mesaVotacionId: null,
      categoriaId: null,
      onlyLider: null,
    }),
}));
