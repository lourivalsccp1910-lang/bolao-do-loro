import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import {
  createGame,
  deleteGame,
  listGames,
  updateGame,
  updateGameResult,
} from "../services/game.service";

import type {
  Game,
  GameFormData,
} from "../types/game.types";

import { listChampionships } from "../../championships/services/championship.service";

import type { Championship } from "../../championships/types/championship.types";

const emptyForm: GameFormData = {
  championshipId: "",
  homeTeam: "",
  awayTeam: "",
  matchDate: "",
};

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [form, setForm] = useState<GameFormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [resultGameId, setResultGameId] = useState<string | null>(null);
  const [homeScore, setHomeScore] = useState<number>(0);
  const [awayScore, setAwayScore] = useState<number>(0);

  useEffect(() => {
    setGames(listGames());
    setChampionships(listChampionships());
  }, []);

  function handleChange(
    field: keyof GameFormData,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit() {
    if (!form.championshipId) {
      alert("Selecione um campeonato.");
      return;
    }

    if (!form.homeTeam.trim()) {
      alert("Informe o time da casa.");
      return;
    }

    if (!form.awayTeam.trim()) {
      alert("Informe o time visitante.");
      return;
    }

    if (!form.matchDate) {
      alert("Informe a data e horário do jogo.");
      return;
    }

    if (editingId) {
      updateGame(editingId, form);
    } else {
      createGame(form);
    }

    setGames(listGames());
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(game: Game) {
    setEditingId(game.id);

    setForm({
      championshipId: game.championshipId,
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      matchDate: game.matchDate,
    });
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Deseja realmente excluir este jogo?"
    );

    if (!confirmed) {
      return;
    }

    deleteGame(id);

    setGames(listGames());

    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }

    if (resultGameId === id) {
      setResultGameId(null);
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleOpenResult(game: Game) {
    setResultGameId(game.id);
    setHomeScore(game.homeScore ?? 0);
    setAwayScore(game.awayScore ?? 0);
  }

  function handleSaveResult() {
    if (!resultGameId) {
      return;
    }

    if (homeScore < 0 || awayScore < 0) {
      alert("O placar não pode ser negativo.");
      return;
    }

    updateGameResult(
      resultGameId,
      homeScore,
      awayScore
    );

    setGames(listGames());
    setResultGameId(null);
    setHomeScore(0);
    setAwayScore(0);
  }

  function handleCancelResult() {
    setResultGameId(null);
    setHomeScore(0);
    setAwayScore(0);
  }

  function getChampionshipName(
    championshipId: string
  ): string {
    const championship = championships.find(
      (item) => item.id === championshipId
    );

    return championship?.name ?? "Campeonato não encontrado";
  }

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Jogos
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: "text.secondary",
        }}
      >
        Cadastro e gerenciamento dos jogos dos campeonatos.
      </Typography>

      {championships.length === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Ainda não existe nenhum campeonato cadastrado.
          Cadastre um campeonato antes de adicionar jogos.
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
                  ? "Editar jogo"
                  : "Novo jogo"}
              </Typography>

              <FormControl
                fullWidth
                sx={{ mb: 2 }}
                disabled={championships.length === 0}
              >
                <InputLabel id="championship-label">
                  Campeonato
                </InputLabel>

                <Select
                  labelId="championship-label"
                  value={form.championshipId}
                  label="Campeonato"
                  onChange={(event) =>
                    handleChange(
                      "championshipId",
                      event.target.value
                    )
                  }
                >
                  {championships.map((championship) => (
                    <MenuItem
                      key={championship.id}
                      value={championship.id}
                    >
                      {championship.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Time da casa"
                value={form.homeTeam}
                onChange={(event) =>
                  handleChange(
                    "homeTeam",
                    event.target.value
                  )
                }
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Time visitante"
                value={form.awayTeam}
                onChange={(event) =>
                  handleChange(
                    "awayTeam",
                    event.target.value
                  )
                }
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                type="datetime-local"
                label="Data e horário"
                value={form.matchDate}
                onChange={(event) =>
                  handleChange(
                    "matchDate",
                    event.target.value
                  )
                }
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 3 }}
              />

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={championships.length === 0}
                sx={{ mr: 1 }}
              >
                {editingId
                  ? "SALVAR ALTERAÇÕES"
                  : "CADASTRAR"}
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
                Jogos cadastrados
              </Typography>

              {games.length === 0 ? (
                <Typography color="text.secondary">
                  Nenhum jogo cadastrado.
                </Typography>
              ) : (
                games.map((game) => (
                  <Card
                    key={game.id}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  >
                    <CardContent>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
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
                        {game.homeTeam} × {game.awayTeam}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ mt: 1 }}
                      >
                        Data:{" "}
                        {new Date(
                          game.matchDate
                        ).toLocaleString("pt-BR")}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          color:
                            game.status === "FINALIZADO"
                              ? "success.main"
                              : "text.secondary",
                        }}
                      >
                        Status: {game.status}
                      </Typography>

                      {game.status === "FINALIZADO" &&
                        game.homeScore !== null &&
                        game.awayScore !== null && (
                          <Typography
                            variant="h6"
                            sx={{
                              mt: 1,
                              fontWeight: "bold",
                            }}
                          >
                            Resultado:{" "}
                            {game.homeScore} ×{" "}
                            {game.awayScore}
                          </Typography>
                        )}

                      {resultGameId === game.id ? (
                        <Card
                          variant="outlined"
                          sx={{
                            mt: 2,
                            p: 2,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                              mb: 2,
                            }}
                          >
                            Lançar resultado
                          </Typography>

                          <Grid
                            container
                            spacing={2}
                            alignItems="center"
                          >
                            <Grid item xs={5}>
                              <TextField
                                fullWidth
                                type="number"
                                label={game.homeTeam}
                                value={homeScore}
                                inputProps={{
                                  min: 0,
                                }}
                                onChange={(event) =>
                                  setHomeScore(
                                    Number(
                                      event.target.value
                                    )
                                  )
                                }
                              />
                            </Grid>

                            <Grid item xs={2}>
                              <Typography
                                align="center"
                                variant="h6"
                              >
                                ×
                              </Typography>
                            </Grid>

                            <Grid item xs={5}>
                              <TextField
                                fullWidth
                                type="number"
                                label={game.awayTeam}
                                value={awayScore}
                                inputProps={{
                                  min: 0,
                                }}
                                onChange={(event) =>
                                  setAwayScore(
                                    Number(
                                      event.target.value
                                    )
                                  )
                                }
                              />
                            </Grid>
                          </Grid>

                          <Button
                            variant="contained"
                            onClick={handleSaveResult}
                            sx={{
                              mt: 2,
                              mr: 1,
                            }}
                          >
                            SALVAR RESULTADO
                          </Button>

                          <Button
                            variant="outlined"
                            onClick={handleCancelResult}
                            sx={{ mt: 2 }}
                          >
                            CANCELAR
                          </Button>
                        </Card>
                      ) : (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() =>
                            handleOpenResult(game)
                          }
                          sx={{
                            mt: 2,
                            mr: 1,
                          }}
                        >
                          {game.status === "FINALIZADO"
                            ? "EDITAR RESULTADO"
                            : "LANÇAR RESULTADO"}
                        </Button>
                      )}

                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          handleEdit(game)
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
                          handleDelete(game.id)
                        }
                        sx={{ mt: 2 }}
                      >
                        EXCLUIR
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}