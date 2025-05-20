export interface Xtlog {
    /** N° de tiers */
    numtiers: number;
  
    /** N° d'ordre extension */
    ordreext: number;
  
    /** Site concerné */
    site?: string;
  
    /** Login utilisateur */
    login?: string;
  
    /** mot de passe */
    password?: string;
  
    /** Role pour ce login */
    role?: string;
  
    /** Utilisateur Belair */
    util?: string;
  
    /** Dernière connexion */
    dercon?: Date;
  
    /** Nombre de connexion */
    nbconn?: number;
  
    /** Email de l'utilisateur */
    email?: string;
  
    /** Login envoyé à l'utilisateur */
    envoye?: boolean;
  
    /** Mot de passe en clair */
    mdpclair?: string;
  
    /** Identifiant du courtier */
    court?: number;
  }
  
  export const xtlogTagMap: Record<keyof Xtlog, string> = {
    numtiers: 'numtiers',
    ordreext: 'ordreext',
    site: 'site',
    login: 'login',
    password: 'password',
    role: 'role',
    util: 'util',
    dercon: 'dercon',
    nbconn: 'nbconn',
    email: 'email',
    envoye: 'envoye',
    mdpclair: 'mdpclair',
    court: 'court',
  };
  
  export const xtlogFieldMap: Record<string, keyof Xtlog> = {
    numtiers: 'numtiers',
    ordreext: 'ordreext',
    site: 'site',
    login: 'login',
    password: 'password',
    role: 'role',
    util: 'util',
    dercon: 'dercon',
    nbconn: 'nbconn',
    email: 'email',
    envoye: 'envoye',
    mdpclair: 'mdpclair',
    court: 'court',
  };
  