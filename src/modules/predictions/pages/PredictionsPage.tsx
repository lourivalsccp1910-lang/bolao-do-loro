import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import {
  createPrediction,
  deletePrediction,
  listPredictions,
  updatePrediction,
} from "../services/prediction.services";

import type {
  Prediction,
  PredictionFormData,
} from "../types/prediction.types";

import { listParticipants } from "../../participants/services/participant.service";
import { listGames } from "../../games/services/game.service";
import { listChampionships } from "../../championships/services/championship.service";

import type { Participant } from "../../participants/types/participant.types";
import type { Game } from "../../games/types/game.types";
import type { Championship } from "../../championships/types/championship.types";

const emptyForm: PredictionFormData = {
  participantId: "",
  gameId: "",
  homeScore: 0,
  awayScore: 0,
};

export default function PredictionsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [championships, setChampionships] = useState<Championship[]>([]);

  const [form, setForm] =
    useState<PredictionFormData>(emptyForm);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  useEffect(() => {
    setPredictions(listPredictions());
    setParticipants(listParticipants());
    setGames(listGames());
    setChampionships(listChampionships());
  }, []);

  function handleChange(
    field: keyof PredictionFormData,
    value: string | number
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit() {
    if (!form.participantId) {
      alert("Selecione o participante.");
      return;
    }

    if (!form.gameId) {
      alert("Selecione o jogo.");
      return;
    }

    if (form.homeScore < 0 || form.awayScore < 0) {
      alert("O placar não pode ser negativo.");
      return;
    }

    if (editingId) {
      updatePrediction(editingId, form);
    } else {
      createPrediction(form);
    }

    setPredictions(listPredictions());
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(prediction: Prediction) {
    setEditingId(prediction.id);

    setForm({
      participantId: prediction.participantId,
      gameId: prediction.gameId,
      homeScore: prediction.homeScore,
      awayScore: prediction.awayScore,
    });
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Deseja realmente excluir este palpite?"
    );

    if (!confirmed) {
      return;
    }

    deletePrediction(id);

    setPredictions(listPredictions());

    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function getParticipantName(
    participantId: string
  ): string {
    const participant = participants.find(
      (item) => item.id === participantId
    );

    return participant?.name ?? "Participante não encontrado";
  }

  function getGame(gameId: string): Game | undefined {
    return games.find((game) => game.id === gameId);
  }

  function getChampionshipName(
    championshipId: string
  ): string {
    const championship = championships.find(
      (item) => item.id === championshipId
    );

    return championship?.name ?? "Campeonato não encontrado";
  }

  const hasParticipants = participants.length > 0;
  const hasGames = games.length > 0;

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Palpites
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: "text.secondary",
        }}
      >
        Lançamento e gerenciamento dos palpites dos participantes.
      </Typography>

      {!hasParticipants && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Ainda não existe nenhum participante cadastrado.
        </Alert>
      )}

      {!hasGames && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Ainda não existe nenhum jogo cadastrado.
          Cadastre um jogo antes de lançar palpites.
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card elevation={3}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                {editingId
                  ? "Editar palpite"
                  : "Novo palpite"}
              </Typography>

              <Select
                fullWidth
                displayEmpty
                value={form.participantId}
                onChange={(event) =>
                  handleChange(
                    "participantId",
                    event.target.value
                  )
                }
                disabled={!hasParticipants || !hasGames}
                sx={{ mb: 2 }}
              >
                <MenuItem value="">
                  Selecione o participante
                </MenuItem>

                {participants.map((participant) => (
                  <MenuItem
                    key={participant.id}
                    value={participant.id}
                  >
                    {participant.name}
                  </MenuItem>
                ))}
              </Select>

              <Select
                fullWidth
                displayEmpty
                value={form.gameId}
                onChange={(event) =>
                  handleChange(
                    "gameId",
                    event.target.value
                  )
                }
                disabled={!hasGames || !hasParticipants}
                sx={{ mb: 2 }}
              >
                <MenuItem value="">
                  Selecione o jogo
                </MenuItem>

                {games.map((game) => (
                  <MenuItem
                    key={game.id}
                    value={game.id}
                  >
                    {game.homeTeam} × {game.awayTeam}
                  </MenuItem>
                ))}
              </Select>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Placar Casa"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={form.homeScore}
                    onChange={(event) =>
                      handleChange(
                        "homeScore",
                        Number(event.target.value)
                      )
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Placar Fora"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={form.awayScore}
                    onChange={(event) =>
                      handleChange(
                        "awayScore",
                        Number(event.target.value)
                      )
                    }
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!hasParticipants || !hasGames}
                sx={{ mr: 1 }}
              >
                {editingId
                  ? "SALVAR ALTERAÇÕES"
                  : "LANÇAR PALPITE"}
              </Button>

              {editingId && (
                <Button
                  variant="outlined"
                  onClick={handleCancelEdit}
                >
                  CANCELAR
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card elevation={3}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                Palpites cadastrados
              </Typography>

              {predictions.length === 0 ? (
                <Typography color="text.secondary">
                  Nenhum palpite cadastrado.
                </Typography>
              ) : (
                predictions.map((prediction) => {
                  const game = getGame(
                    prediction.gameId
                  );

                  return (
                    <Card
                      key={prediction.id}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    >
                      <CardContent>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                        >
                          {getParticipantName(
                            prediction.participantId
                          )}
                        </Typography>

                        {game && (
                          <>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1 }}
                            >
                              {getChampionshipName(
                                game.championshipId
                              )}
                            </Typography>

                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "bold",
                                mt: 1,
                              }}
                            >
                              {game.homeTeam}{" "}
                              {prediction.homeScore} ×{" "}
                              {prediction.awayScore}{" "}
                              {game.awayTeam}
                            </Typography>
                          </>
                        )}

                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() =>
                            handleEdit(prediction)
                          }
                          sx={{
                            mt: 2,
                            mr: 1,
                          }}
                        >
                          EDITAR
                        </Button>

                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() =>
                            handleDelete(prediction.id)
                          }
                          sx={{ mt: 2 }}
                        >
                          EXCLUIR
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
