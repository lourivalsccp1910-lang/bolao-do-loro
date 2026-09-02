import type { Team, TeamFormData } from "../types/team.types";

const STORAGE_KEY = "bolao-do-loro-teams";

function saveTeams(teams: Team[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
}

export function listTeams(): Team[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  return JSON.parse(stored) as Team[];
}

export function createTeam(data: TeamFormData): Team {
  const teams = listTeams();

  const team: Team = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
  };

  teams.push(team);
  saveTeams(teams);

  return team;
}

export function updateTeam(
  id: string,
  data: TeamFormData
): Team | null {
  const teams = listTeams();
  const index = teams.findIndex((team) => team.id === id);

  if (index === -1) {
    return null;
  }

  const updatedTeam: Team = {
    ...teams[index],
    ...data,
  };

  teams[index] = updatedTeam;
  saveTeams(teams);

  return updatedTeam;
}

export function deleteTeam(id: string): boolean {
  const teams = listTeams();
  const filteredTeams = teams.filter(
    (team) => team.id !== id
  );

  if (filteredTeams.length === teams.length) {
    return false;
  }

  saveTeams(filteredTeams);

  return true;
}
