import type {
  Championship,
  ChampionshipFormData,
  ChampionshipStatus,
} from "../types/championship.types";

const STORAGE_KEY = "bolao-do-loro-championships";

type StoredChampionship = {
  id: string;
  name: string;
  type: Championship["type"];
  description: string;
  status?: ChampionshipStatus;
  startDate?: string;
  endDate?: string;
  active?: boolean;
  createdAt: string;
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeChampionship(
  championship: StoredChampionship
): Championship {
  return {
    id: championship.id,
    name: championship.name,
    type: championship.type,
    description: championship.description,
    status:
      championship.status ??
      (championship.active === false
        ? "ENCERRADO"
        : "AGENDADO"),
    startDate: championship.startDate ?? "",
    endDate: championship.endDate ?? "",
    createdAt: championship.createdAt,
  };
}

export function listChampionships(): Championship[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(
      stored
    ) as StoredChampionship[];

    return parsed.map(normalizeChampionship);
  } catch {
    return [];
  }
}

function saveChampionships(
  championships: Championship[]
): void {
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
    status: data.status,
    startDate: data.startDate,
    endDate: data.endDate,
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
    status: data.status,
    startDate: data.startDate,
    endDate: data.endDate,
  };

  championships[index] = updatedChampionship;

  saveChampionships(championships);

  return updatedChampionship;
}

export function updateChampionshipStatus(
  id: string,
  status: ChampionshipStatus
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
    status,
  };

  championships[index] = updatedChampionship;

  saveChampionships(championships);

  return updatedChampionship;
}

export function deleteChampionship(id: string): boolean {
  const championships = listChampionships();

  const filteredChampionships =
    championships.filter(
      (championship) => championship.id !== id
    );

  if (
    filteredChampionships.length ===
    championships.length
  ) {
    return false;
  }

  saveChampionships(filteredChampionships);

  return true;
}
