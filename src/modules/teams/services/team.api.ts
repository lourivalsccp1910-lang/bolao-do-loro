export interface FootballApiTeam {
  team: {
    id: number;
    name: string;
    country: string;
    logo?: string;
  };
  venue?: {
    name?: string;
    city?: string;
  };
}

interface FootballApiResponse {
  response: FootballApiTeam[];
}

export async function fetchTeamsFromApi(
  league: number,
  season: number
): Promise<FootballApiTeam[]> {
  const params = new URLSearchParams({
    endpoint: "teams",
    league: String(league),
    season: String(season),
  });

  const response = await fetch(`/api/football?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Não foi possível consultar os times na API-Football.");
  }

  const data = (await response.json()) as FootballApiResponse;

  return data.response || [];
}
