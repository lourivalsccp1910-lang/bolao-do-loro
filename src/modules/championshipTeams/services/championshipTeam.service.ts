import type { ChampionshipTeam } from "../types/championshipTeam.types";

const STORAGE_KEY = "bolao-do-loro-championship-teams";

function saveRelations(relations: ChampionshipTeam[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(relations));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function listChampionshipTeams(): ChampionshipTeam[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as ChampionshipTeam[];
  } catch {
    return [];
  }
}

export function createChampionshipTeam(
  championshipId: string,
  teamId: string
): ChampionshipTeam {
  const relations = listChampionshipTeams();

  const existingRelation = relations.find(
    (relation) =>
      relation.championshipId === championshipId &&
      relation.teamId === teamId
  );

  if (existingRelation) {
    return existingRelation;
  }

  const relation: ChampionshipTeam = {
    id: generateId(),
    championshipId,
    teamId,
    createdAt: new Date().toISOString(),
  };

  relations.push(relation);
  saveRelations(relations);

  return relation;
}

export function listTeamsByChampionship(
  championshipId: string
): ChampionshipTeam[] {
  return listChampionshipTeams().filter(
    (relation) => relation.championshipId === championshipId
  );
}

export function listChampionshipsByTeam(
  teamId: string
): ChampionshipTeam[] {
  return listChampionshipTeams().filter(
    (relation) => relation.teamId === teamId
  );
}

export function deleteChampionshipTeam(id: string): boolean {
  const relations = listChampionshipTeams();

  const filteredRelations = relations.filter(
    (relation) => relation.id !== id
  );

  if (filteredRelations.length === relations.length) {
    return false;
  }

  saveRelations(filteredRelations);

  return true;
}
