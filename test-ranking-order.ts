const storage = new Map<string, string>();

(globalThis as any).localStorage = {
  getItem(key: string) {
    return storage.has(key)
      ? storage.get(key)!
      : null;
  },

  setItem(key: string, value: string) {
    storage.set(key, value);
  },

  removeItem(key: string) {
    storage.delete(key);
  },

  clear() {
    storage.clear();
  },
};

const participants = [
  {
    id: "joao",
    name: "João",
    phone: "",
    email: "",
    cpf: "",
    active: true,
    createdAt: "2026-08-01T08:00:00",
  },
  {
    id: "maria",
    name: "Maria",
    phone: "",
    email: "",
    cpf: "",
    active: true,
    createdAt: "2026-08-01T08:01:00",
  },
];

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
    createdAt: "2026-08-01T09:00:00",
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
    createdAt: "2026-08-01T09:01:00",
  },
];

const predictions = [
  {
    id: "p1",
    participantId: "joao",
    gameId: "jogo-1",
    homeScore: 2,
    awayScore: 1,
    createdAt: "2026-08-10T10:00:00",
  },
  {
    id: "p2",
    participantId: "joao",
    gameId: "jogo-2",
    homeScore: 2,
    awayScore: 0,
    createdAt: "2026-08-10T10:01:00",
  },
  {
    id: "p3",
    participantId: "maria",
    gameId: "jogo-1",
    homeScore: 3,
    awayScore: 0,
    createdAt: "2026-08-10T09:00:00",
  },
  {
    id: "p4",
    participantId: "maria",
    gameId: "jogo-2",
    homeScore: 0,
    awayScore: 2,
    createdAt: "2026-08-10T09:01:00",
  },
];

storage.set(
  "bolao-do-loro-participants",
  JSON.stringify(participants)
);

storage.set(
  "bolao-do-loro-games",
  JSON.stringify(games)
);

storage.set(
  "bolao_do_loro_predictions",
  JSON.stringify(predictions)
);

const { getRanking } = await import(
  "./src/modules/ranking/services/ranking.service.ts"
);

const ranking = getRanking();

console.log("");
console.log("===== RANKING GERADO =====");

for (const entry of ranking.entries) {
  console.log(
    entry.position +
      "º " +
      entry.participantName +
      " - " +
      entry.points +
      " pontos - " +
      entry.exactScores +
      " exato(s) - " +
      entry.partialScores +
      " parcial(is) - " +
      entry.errors +
      " erro(s)"
  );
}

console.log("");
console.log("TOTAL DE PARTICIPANTES:", ranking.totalParticipants);
console.log("TOTAL DE PONTOS:", ranking.totalPoints);

if (ranking.entries.length !== 2) {
  throw new Error("ERRO: deveriam existir 2 participantes.");
}

if (ranking.totalParticipants !== 2) {
  throw new Error("ERRO: total de participantes deveria ser 2.");
}

if (ranking.totalPoints !== 8) {
  throw new Error("ERRO: total de pontos deveria ser 8.");
}

if (ranking.entries[0].participantName !== "João") {
  throw new Error("ERRO: João deveria estar em 1º lugar.");
}

if (ranking.entries[1].participantName !== "Maria") {
  throw new Error("ERRO: Maria deveria estar em 2º lugar.");
}

console.log("");
console.log("======================================");
console.log("TESTE DO RANKING COMPLETO: APROVADO");
console.log("======================================");
