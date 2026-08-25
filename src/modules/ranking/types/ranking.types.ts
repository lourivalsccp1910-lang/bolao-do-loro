export interface RankingEntry {
  participantId: string;
  participantName: string;
  points: number;
  exactScores: number;
  partialScores: number;
  errors: number;
  firstPredictionAt: string | null;
  position: number;
}

export interface RankingSummary {
  totalParticipants: number;
  totalPoints: number;
  entries: RankingEntry[];
}
