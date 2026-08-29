import type {
  Championship,
  ChampionshipFormData,
} from "../types/championship.types";

const STORAGE_KEY = "bolao-do-loro-championships";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function listChampionships(): Championship[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Championship[];
  } catch {
    return [];
  }
}

function saveChampionships(championships: Championship[]): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(championships)
  );
}

export function createChampionship(
  data: ChampionshipFormData
): Championship {
  const championships = listChampionships();

  const championship: Championship = {
    id: generateId(),
    name: data.name,
    type: data.type,
    description: data.description,
    active: true,
    createdAt: new Date().toISOString(),
  };

  championships.push(championship);

  saveChampionships(championships);

  return championship;
}

export function updateChampionship(
  id: string,
  data: ChampionshipFormData
): Championship | null {
  const championships = listChampionships();

  const index = championships.findIndex(
    (championship) => championship.id === id
  );

  if (index === -1) {
    return null;
  }

  const updatedChampionship: Championship = {
    ...championships[index],
    name: data.name,
    type: data.type,
    description: data.description,
  };

  championships[index] = updatedChampionship;

  saveChampionships(championships);

  return updatedChampionship;
}

export function deleteChampionship(id: string): boolean {
  const championships = listChampionships();

  const filteredChampionships = championships.filter(
    (championship) => championship.id !== id
  );

  if (filteredChampionships.length === championships.length) {
    return false;
  }

  saveChampionships(filteredChampionships);

  return true;
}