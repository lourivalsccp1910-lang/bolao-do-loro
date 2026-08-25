import { SCORING } from "../types/scoring.types";

export function calculateScore(
  predictedHomeScore: number,
  predictedAwayScore: number,
  actualHomeScore: number,
  actualAwayScore: number
): number {
  // Placar exato
  if (
    predictedHomeScore === actualHomeScore &&
    predictedAwayScore === actualAwayScore
  ) {
    return SCORING.EXACT_SCORE;
  }

  const predictedResult = getMatchResult(
    predictedHomeScore,
    predictedAwayScore
  );

  const actualResult = getMatchResult(
    actualHomeScore,
    actualAwayScore
  );

  // Resultado correto, mas placar diferente
  if (predictedResult === actualResult) {
    return SCORING.CORRECT_RESULT;
  }

  // Resultado incorreto
  return SCORING.WRONG_RESULT;
}

function getMatchResult(
  homeScore: number,
  awayScore: number
): "HOME" | "DRAW" | "AWAY" {
  if (homeScore > awayScore) {
    return "HOME";
  }

  if (homeScore < awayScore) {
    return "AWAY";
  }

  return "DRAW";
}