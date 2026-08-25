export interface Prediction {
  id: string;
  participantId: string;
  gameId: string;
  homeScore: number;
  awayScore: number;
  createdAt: string;
}

export interface PredictionFormData {
  participantId: string;
  gameId: string;
  homeScore: number;
  awayScore: number;
}