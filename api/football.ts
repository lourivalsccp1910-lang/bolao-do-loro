import type { VercelRequest, VercelResponse } from "@vercel/node";

const API_URL = "https://v3.football.api-sports.io";

const ALLOWED_ENDPOINTS = new Set([
  "leagues",
  "teams",
]);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Método não permitido.",
    });
  }

  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    return res.status(500).json({
      message: "Chave da API-Football não configurada no servidor.",
    });
  }

  const endpoint =
    typeof req.query.endpoint === "string"
      ? req.query.endpoint
      : "";

  if (!ALLOWED_ENDPOINTS.has(endpoint)) {
    return res.status(400).json({
      message: "Endpoint não permitido.",
    });
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(req.query)) {
    if (key === "endpoint") {
      continue;
    }

    if (typeof value === "string") {
      params.set(key, value);
    }
  }

  const url = `${API_URL}/${endpoint}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": apiKey,
      },
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch {
    return res.status(500).json({
      message: "Erro ao comunicar com a API-Football.",
    });
  }
}
