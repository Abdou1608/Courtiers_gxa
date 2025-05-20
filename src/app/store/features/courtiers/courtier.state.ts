export interface CourtierState {
    dossiers: any[];
    contrats: any[];
    produits: any[];
    commissions: any[];
    loading: boolean;
    error: string | null;
  }
  
  export const initialCourtierState: CourtierState = {
    dossiers: [],
    contrats: [],
    produits: [],
    commissions: [],
    loading: false,
    error: null
  };
  