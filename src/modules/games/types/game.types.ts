export interface Game {
  id: string;
  championshipId: string;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  status: "AGENDADO" | "EM_ANDAMENTO" | "FINALIZADO";
  homeScore: number | null;
  awayScore: number | null;
  createdAt: string;
}

export interface GameFormData {
  championshipId: string;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
}