export type ChampionshipType =
  | "LOTECA"
  | "PLACARES"
  | "CLASSIFICACAO"
  | "MATA_MATA";

export type ChampionshipStatus =
  | "AGENDADO"
  | "EM_ANDAMENTO"
  | "ENCERRADO";

export interface Championship {
  id: string;
  name: string;
  type: ChampionshipType;
  description: string;
  status: ChampionshipStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface ChampionshipFormData {
  name: string;
  type: ChampionshipType | "";
  description: string;
  status: ChampionshipStatus;
  startDate: string;
  endDate: string;
}



