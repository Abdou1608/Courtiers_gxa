/**
 * Adhésions d’un contrat
 */
export interface Adh {
    /** N° contrat */
    contrat: number;
    /** N° pièce du contrat */
    piece: number;
    /** N° adhésion */
    adhesion: number;
    /** Date d'entrée */
    entree?: Date;
    /** Date de sortie */
    sortie?: Date;
    /** Lié à un risque */
    risklie?: boolean;
    /** Prime annuelle */
    prime?: number;
    /** Prime annuelle (ISO 4217) */
    prime1?: string;
    /** Tiers concerné */
    numtiers?: number;
    /** Motif sortie */
    motif?: string;
    /** Panier de garanties choisi */
    panier?: string;
  }
  export enum AdhMotif {
    RDPPMOTIF = 'RDPPMOTIF'
  }