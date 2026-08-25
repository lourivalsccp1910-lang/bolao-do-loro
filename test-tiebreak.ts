import { calculateParticipantRankingData } from "./src/modules/ranking/services/ranking.service.ts";

const games = [
  {
    id: "jogo-1",
    championshipId: "camp-1",
    homeTeam: "A",
    awayTeam: "B",
    matchDate: "2026-08-20T20:00:00",
    status: "FINALIZADO" as const,
    homeScore: 2,
    awayScore: 1,
    createdAt: "2026-08-01T10:00:00",
  },
  {
    id: "jogo-2",
    championshipId: "camp-1",
    homeTeam: "C",
    awayTeam: "D",
    matchDate: "2026-08-21T20:00:00",
    status: "FINALIZADO" as const,
    homeScore: 1,
    awayScore: 0,
    createdAt: "2026-08-01T10:00:00",
  },
  {
    id: "jogo-3",
    championshipId: "camp-1",
    homeTeam: "E",
    awayTeam: "F",
    matchDate: "2026-08-22T20:00:00",
    status: "FINALIZADO" as const,
    homeScore: 3,
    awayScore: 2,
    createdAt: "2026-08-01T10:00:00",
  },
];

const predictions = [
  // JOÃO
  // Jogo 1 = EXATO = 4
  {
    id: "p1",
    participantId: "joao",
    gameId: "jogo-1",
    homeScore: 2,
    awayScore: 1,
    createdAt: "2026-08-10T10:00:00",
  },

  // Jogo 2 = RESULTADO CORRETO = 2
  {
    id: "p2",
    participantId: "joao",
    gameId: "jogo-2",
    homeScore: 2,
    awayScore: 0,
    createdAt: "2026-08-10T10:01:00",
  },

  // MARIA
  // Jogo 1 = RESULTADO CORRETO = 2
  {
    id: "p3",
    participantId: "maria",
    gameId: "jogo-1",
    homeScore: 3,
    awayScore: 0,
    createdAt: "2026-08-10T09:00:00",
  },

  // Jogo 2 = RESULTADO CORRETO = 2
  {
    id: "p4",
    participantId: "maria",
    gameId: "jogo-2",
    homeScore: 2,
    awayScore: 0,
    createdAt: "2026-08-10T09:01:00",
  },

  // Jogo 3 = RESULTADO CORRETO = 2
  {
    id: "p5",
    participantId: "maria",
    gameId: "jogo-3",
    homeScore: 4,
    awayScore: 1,
    createdAt: "2026-08-10T09:02:00",
  },
];

const joao = calculateParticipantRankingData(
  "joao",
  predictions,
  games
);

const maria = calculateParticipantRankingData(
  "maria",
  predictions,
  games
);

console.log("");
console.log("===== TESTE 1 - PLACARES EXATOS =====");
console.log("João:", joao);
console.log("Maria:", maria);

if (joao.points !== 6) {
  throw new Error(
    "ERRO: João deveria ter 6 pontos."
  );
}

if (maria.points !== 6) {
  throw new Error(
    "ERRO: Maria deveria ter 6 pontos."
  );
}

if (joao.exactScores !== 1) {
  throw new Error(
    "ERRO: João deveria ter 1 placar exato."
  );
}

if (maria.exactScores !== 0) {
  throw new Error(
    "ERRO: Maria deveria ter 0 placares exatos."
  );
}

if (joao.partialScores !== 1) {
  throw new Error(
    "ERRO: João deveria ter 1 resultado correto."
  );
}

if (maria.partialScores !== 3) {
  throw new Error(
    "ERRO: Maria deveria ter 3 resultados corretos."
  );
}

console.log("");
console.log("APROVADO");
console.log("João e Maria empataram em 6 pontos.");
console.log("João tem 1 placar exato.");
console.log("Maria tem 0 placares exatos.");
console.log("João deve vencer o desempate.");
