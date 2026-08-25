import type {
  Game,
  GameFormData,
} from "../types/game.types";

const STORAGE_KEY = "bolao-do-loro-games";

function generateId(): string {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

export function listGames(): Game[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Game[];
  } catch {
    return [];
  }
}

function saveGames(games: Game[]): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(games)
  );
}

export function createGame(
  data: GameFormData
): Game {
  const games = listGames();

  const game: Game = {
    id: generateId(),
    championshipId: data.championshipId,
    homeTeam: data.homeTeam,
    awayTeam: data.awayTeam,
    matchDate: data.matchDate,
    status: "AGENDADO",
    homeScore: null,
    awayScore: null,
    createdAt: new Date().toISOString(),
  };

  games.push(game);

  saveGames(games);

  return game;
}

export function updateGame(
  id: string,
  data: GameFormData
): Game | null {
  const games = listGames();

  const index = games.findIndex(
    (game) => game.id === id
  );

  if (index === -1) {
    return null;
  }

  const updatedGame: Game = {
    ...games[index],
    championshipId: data.championshipId,
    homeTeam: data.homeTeam,
    awayTeam: data.awayTeam,
    matchDate: data.matchDate,
  };

  games[index] = updatedGame;

  saveGames(games);

  return updatedGame;
}

export function deleteGame(id: string): boolean {
  const games = listGames();

  const filteredGames = games.filter(
    (game) => game.id !== id
  );

  if (filteredGames.length === games.length) {
    return false;
  }

  saveGames(filteredGames);

  return true;
}

export function updateGameResult(
  id: string,
  homeScore: number,
  awayScore: number
): Game | null {
  const games = listGames();

  const index = games.findIndex(
    (game) => game.id === id
  );

  if (index === -1) {
    return null;
  }

  const updatedGame: Game = {
    ...games[index],
    homeScore,
    awayScore,
    status: "FINALIZADO",
  };

  games[index] = updatedGame;

  saveGames(games);

  return updatedGame;
}