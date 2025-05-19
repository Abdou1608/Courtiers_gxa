export interface CourtierState {
    demandes: any[];
    produits: any[];
    commissions: any[];
    loading: boolean;
    error: string | null;
  }
  
  export const initialCourtierState: CourtierState = {
    demandes: [],
    produits: [],
    commissions: [],
    loading: false,
    error: null
  };
  