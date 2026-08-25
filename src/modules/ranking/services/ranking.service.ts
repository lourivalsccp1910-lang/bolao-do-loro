import { listParticipants } from "../../participants/services/participant.service";
import { listGames } from "../../games/services/game.service";
import { listPredictions } from "../../predictions/services/prediction.services";
import { calculateScore } from "./scoring.service";

import type {
  RankingEntry,
  RankingSummary,
} from "../types/ranking.types";

import type { Game } from "../../games/types/game.types";
import type { Prediction } from "../../predictions/types/prediction.types";

export function calculateParticipantRankingData(
  participantId: string,
  predictions: Prediction[],
  games: Game[]
): {
  points: number;
  exactScores: number;
  partialScores: number;
  errors: number;
  firstPredictionAt: string | null;
} {
  const participantPredictions = predictions.filter(
    (prediction) =>
      prediction.participantId === participantId
  );

  let points = 0;
  let exactScores = 0;
  let partialScores = 0;
  let errors = 0;

  let firstPredictionAt: string | null = null;

  for (const prediction of participantPredictions) {
    if (
      firstPredictionAt === null ||
      prediction.createdAt < firstPredictionAt
    ) {
      firstPredictionAt = prediction.createdAt;
    }

    const game = games.find(
      (item) => item.id === prediction.gameId
    );

    if (
      !game ||
      game.status !== "FINALIZADO" ||
      game.homeScore === null ||
      game.awayScore === null
    ) {
      continue;
    }

    const score = calculateScore(
      prediction.homeScore,
      prediction.awayScore,
      game.homeScore,
      game.awayScore
    );

    points += score;

    if (score === 4) {
      exactScores++;
    } else if (score === 2) {
      partialScores++;
    } else {
      errors++;
    }
  }

  return {
    points,
    exactScores,
    partialScores,
    errors,
    firstPredictionAt,
  };
}

export function calculateParticipantPoints(
  participantId: string,
  predictions: Prediction[],
  games: Game[]
): number {
  return calculateParticipantRankingData(
    participantId,
    predictions,
    games
  ).points;
}

export function getRanking(): RankingSummary {
  const participants = listParticipants();
  const predictions = listPredictions();
  const games = listGames();

  const entries: RankingEntry[] = participants
    .map((participant) => {
      const data = calculateParticipantRankingData(
        participant.id,
        predictions,
        games
      );

      return {
        participantId: participant.id,
        participantName: participant.name,
        points: data.points,
        exactScores: data.exactScores,
        partialScores: data.partialScores,
        errors: data.errors,
        firstPredictionAt: data.firstPredictionAt,
        position: 0,
      };
    })
    .sort((a, b) => {
      // 1º critério: maior pontuação
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      // 2º critério: maior número de placares exatos
      if (b.exactScores !== a.exactScores) {
        return b.exactScores - a.exactScores;
      }

      // 3º critério: primeiro palpite enviado
      if (
        a.firstPredictionAt !== null &&
        b.firstPredictionAt !== null
      ) {
        return (
          new Date(a.firstPredictionAt).getTime() -
          new Date(b.firstPredictionAt).getTime()
        );
      }

      if (a.firstPredictionAt !== null) {
        return -1;
      }

      if (b.firstPredictionAt !== null) {
        return 1;
      }

      return 0;
    })
    .map((entry, index) => ({
      ...entry,
      position: index + 1,
    }));

  return {
    totalParticipants: participants.length,
    totalPoints: entries.reduce(
      (total, entry) => total + entry.points,
      0
    ),
    entries,
  };
}
