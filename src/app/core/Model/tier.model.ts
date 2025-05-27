export interface Tier {
  numtiers: number;
  typtiers?: string;
  nattiers?: string;
  numdpp?: number;
  titre?: string;
  rsociale?: string;
  referenc?: string;
  connexe?: string;
  refext?: string;
  adr1?: string;
  adr2?: string;
  adr3?: string;
  codp?: string;
  ville?: string;
  codepays?: string;
  pays?: string;
  ntel?: string;
  nfax?: string;
  numemail?: string;
  memo?: string;
  ext?: string;
  images?: string;
  titnom?: string;
  gommette?: string;
  ole?: string;
  titrecou?: string;
  datdermo?: Date;
  modifpar?: string;
  nbpercha?: number;
  const?: string;
  histo?: string;
  adrinsee?: boolean;
  adresse1?: string;
  adresse2?: string;
  adresse3?: string;
  grcok?: boolean;
  nonepur?: boolean;
  territory?: string;
  latitude?: number;
  longitude?: number;
}

export class Tier implements Tier {
  [key: string]: any;

  constructor(data?: Partial<Tier>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  toJSON(): Partial<Tier> {
    const result: Partial<Tier> = {};
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        result[key as keyof Tier] = this[key];
      }
    }
    return result;
  }
}

export const TierTagMap: Record<keyof Tier, string> = {
  numtiers: 'N° de tiers',
  typtiers: 'type de tiers',
  nattiers: 'type de personne  ( P ou M )',
  numdpp: 'Numéro de personne physique',
  titre: 'titre',
  rsociale: 'Nom-prénom',
  referenc: 'référence de classement',
  connexe: 'nom connexe',
  refext: 'Référence externe (Cie,etc...)',
  adr1: 'Numéro et voie',
  adr2: 'auxiliaire de voie',
  adr3: 'Lieu dit',
  codp: 'code postal',
  ville: 'bureau distributeur',
  codepays: 'Code Pays',
  pays: 'pays',
  ntel: 'téléphone domicile',
  nfax: 'fax domicile',
  numemail: 'E mail internet domicile',
  memo: 'commentaires',
  ext: 'Liste des extensions',
  images: 'Images',
  titnom: 'Titre, nom, prénom',
  gommette: 'gommette',
  ole: 'ole',
  titrecou: 'titre pour courriers',
  datdermo: 'date de dernière modif',
  modifpar: 'modifié par',
  nbpercha: 'nb de personnes à charge',
  const: 'constante : "T"',
  histo: 'Historique des modifications',
  adrinsee: 'Adresse au format INSEE',
  adresse1: 'Adresse 1',
  adresse2: 'Adresse 2',
  adresse3: 'Adresse 3',
  grcok: 'Grc migrée en volume',
  nonepur: 'A conserver si épuration',
  territory: 'Territoire',
  latitude: 'Latitude',
  longitude: 'Longitude',
};

  
  
