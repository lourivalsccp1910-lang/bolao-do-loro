import type {
  Prediction,
  PredictionFormData,
} from "../types/prediction.types";

const STORAGE_KEY = "bolao_do_loro_predictions";

function getPredictions(): Prediction[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data) as Prediction[];
  } catch {
    return [];
  }
}

function savePredictions(
  predictions: Prediction[]
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(predictions)
  );
}

export function listPredictions(): Prediction[] {
  return getPredictions();
}

export function createPrediction(
  data: PredictionFormData
): Prediction {
  const predictions = getPredictions();

  const prediction: Prediction = {
    id: crypto.randomUUID(),
    participantId: data.participantId,
    gameId: data.gameId,
    homeScore: data.homeScore,
    awayScore: data.awayScore,
    createdAt: new Date().toISOString(),
  };

  predictions.push(prediction);

  savePredictions(predictions);

  return prediction;
}

export function updatePrediction(
  id: string,
  data: PredictionFormData
): boolean {
  const predictions = getPredictions();

  const index = predictions.findIndex(
    (prediction) => prediction.id === id
  );

  if (index === -1) {
    return false;
  }

  predictions[index] = {
    ...predictions[index],
    participantId: data.participantId,
    gameId: data.gameId,
    homeScore: data.homeScore,
    awayScore: data.awayScore,
  };

  savePredictions(predictions);

  return true;
}

export function deletePrediction(
  id: string
): boolean {
  const predictions = getPredictions();

  const filteredPredictions = predictions.filter(
    (prediction) => prediction.id !== id
  );

  if (
    filteredPredictions.length ===
    predictions.length
  ) {
    return false;
  }

  savePredictions(filteredPredictions);

  return true;
}