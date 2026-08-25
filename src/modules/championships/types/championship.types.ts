export type ChampionshipType =
  | "LOTECA"
  | "PLACARES"
  | "CLASSIFICACAO"
  | "MATA_MATA";

export interface Championship {
  id: string;
  name: string;
  type: ChampionshipType;
  description: string;
  active: boolean;
  createdAt: string;
}

export interface ChampionshipFormData {
  name: string;
  type: ChampionshipType;
  description: string;
}