import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import {
  createChampionship,
  deleteChampionship,
  listChampionships,
  updateChampionship,
} from "../services/championship.service";

import type {
  Championship,
  ChampionshipFormData,
  ChampionshipStatus,
  ChampionshipType,
} from "../types/championship.types";

import { listTeams } from "../../teams/services/team.service";
import type { Team } from "../../teams/types/team.types";

import {
  createChampionshipTeam,
  deleteChampionshipTeam,
  listTeamsByChampionship,
} from "../../championshipTeams/services/championshipTeam.service";

const emptyForm: ChampionshipFormData = {
  name: "",
  type: "",
  description: "",
  status: "AGENDADO",
  startDate: "",
  endDate: "",
};

const typeLabels: Record<ChampionshipType, string> = {
  LOTECA: "Loteca",
  PLACARES: "Placares",
  CLASSIFICACAO: "Classificação",
  MATA_MATA: "Mata-mata",
};

const statusLabels: Record<ChampionshipStatus, string> = {
  AGENDADO: "Agendado",
  EM_ANDAMENTO: "Em andamento",
  ENCERRADO: "Encerrado",
};

export default function ChampionshipsPage() {
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);
  const [form, setForm] = useState<ChampionshipFormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setChampionships(listChampionships());
    setTeams(
      listTeams().filter((team) => team.status === "ATIVO")
    );
  }, []);

  function handleChange(
    field: keyof ChampionshipFormData,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleTeamToggle(teamId: string) {
    setSelectedTeamIds((current) =>
      current.includes(teamId)
        ? current.filter((id) => id !== teamId)
        : [...current, teamId]
    );
  }

  function syncChampionshipTeams(championshipId: string) {
    const existingRelations =
      listTeamsByChampionship(championshipId);

    existingRelations.forEach((relation) => {
      if (!selectedTeamIds.includes(relation.teamId)) {
        deleteChampionshipTeam(relation.id);
      }
    });

    existingRelations.forEach((relation) => {
      if (!selectedTeamIds.includes(relation.teamId)) {
        return;
      }
    });

    selectedTeamIds.forEach((teamId) => {
      const alreadyExists = existingRelations.some(
        (relation) => relation.teamId === teamId
      );

      if (!alreadyExists) {
        createChampionshipTeam(championshipId, teamId);
      }
    });
  }

  function handleSubmit() {
    if (!form.name.trim()) {
      alert("Informe o nome do campeonato.");
      return;
    }

    if (!form.type) {
      alert("Selecione o tipo do campeonato.");
      return;
    }

    if (!form.startDate) {
      alert("Informe a data de início.");
      return;
    }

    if (!form.endDate) {
      alert("Informe a data de encerramento.");
      return;
    }

    if (form.endDate < form.startDate) {
      alert(
        "A data de encerramento não pode ser anterior à data de início."
      );
      return;
    }

    if (editingId) {
      updateChampionship(editingId, {
        ...form,
        name: form.name.trim(),
      });

      syncChampionshipTeams(editingId);
    } else {
      const championship = createChampionship({
        ...form,
        name: form.name.trim(),
      });

      selectedTeamIds.forEach((teamId) => {
        createChampionshipTeam(championship.id, teamId);
      });
    }

    setChampionships(listChampionships());
    setForm(emptyForm);
    setSelectedTeamIds([]);
    setEditingId(null);
  }

  function handleEdit(championship: Championship) {
    setEditingId(championship.id);

    setForm({
      name: championship.name,
      type: championship.type,
      description: championship.description,
      status: championship.status,
      startDate: championship.startDate,
      endDate: championship.endDate,
    });

    setSelectedTeamIds(
      listTeamsByChampionship(championship.id).map(
        (relation) => relation.teamId
      )
    );
  }

  function handleDelete(id: string) {
    const championship = championships.find(
      (item) => item.id === id
    );

    if (!championship) {
      return;
    }

    const confirmed = window.confirm(
      `Deseja realmente excluir o campeonato "${championship.name}"?`
    );

    if (!confirmed) {
      return;
    }

    const relations = listTeamsByChampionship(id);

    relations.forEach((relation) => {
      deleteChampionshipTeam(relation.id);
    });

    deleteChampionship(id);
    setChampionships(listChampionships());

    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
      setSelectedTeamIds([]);
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setSelectedTeamIds([]);
  }

  function formatDate(date: string) {
    if (!date) {
      return "-";
    }

    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  }

  function getTeamName(teamId: string) {
    return (
      teams.find((team) => team.id === teamId)?.name ||
      "Time não encontrado"
    );
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
        Campeonatos
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: "text.secondary",
        }}
      >
        Cadastro e gerenciamento dos campeonatos do Bolão do Loro.
      </Typography>

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
                  ? "Editar campeonato"
                  : "Novo campeonato"}
              </Typography>

              <TextField
                fullWidth
                label="Nome do campeonato"
                value={form.name}
                onChange={(event) =>
                  handleChange("name", event.target.value)
                }
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="championship-type-label">
                  Tipo
                </InputLabel>

                <Select displayEmpty
                  labelId="championship-type-label"
                  value={form.type}
                  label="Tipo"
                  onChange={(event) =>
                    handleChange(
                      "type",
                      event.target.value as ChampionshipType
                    )
                  }
                >
                  <MenuItem value="" disabled>Selecione o tipo</MenuItem>
                  <MenuItem value="LOTECA">Loteca</MenuItem>
                  <MenuItem value="PLACARES">Placares</MenuItem>
                  <MenuItem value="CLASSIFICACAO">
                    Classificação
                  </MenuItem>
                  <MenuItem value="MATA_MATA">
                    Mata-mata
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="championship-status-label">
                  Status
                </InputLabel>

                <Select displayEmpty
                  labelId="championship-status-label"
                  value={form.status}
                  label="Status"
                  onChange={(event) =>
                    handleChange(
                      "status",
                      event.target.value as ChampionshipStatus
                    )
                  }
                >
                  <MenuItem value="AGENDADO">Agendado</MenuItem>
                  <MenuItem value="EM_ANDAMENTO">
                    Em andamento
                  </MenuItem>
                  <MenuItem value="ENCERRADO">
                    Encerrado
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="date"
                label="Data de início"
                value={form.startDate}
                onChange={(event) =>
                  handleChange("startDate", event.target.value)
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                type="date"
                label="Data de encerramento"
                value={form.endDate}
                onChange={(event) =>
                  handleChange("endDate", event.target.value)
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Descrição"
                value={form.description}
                onChange={(event) =>
                  handleChange(
                    "description",
                    event.target.value
                  )
                }
                sx={{ mb: 3 }}
              />

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                Times do campeonato
              </Typography>

              {teams.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Nenhum time ativo cadastrado.
                </Typography>
              ) : (
                <FormGroup sx={{ mb: 3 }}>
                  {teams.map((team) => (
                    <FormControlLabel
                      key={team.id}
                      control={
                        <Checkbox
                          checked={selectedTeamIds.includes(team.id)}
                          onChange={() =>
                            handleTeamToggle(team.id)
                          }
                        />
                      }
                      label={team.name}
                    />
                  ))}
                </FormGroup>
              )}

              <Button
                variant="contained"
                onClick={handleSubmit}
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
                Campeonatos cadastrados
              </Typography>

              {championships.length === 0 ? (
                <Typography color="text.secondary">
                  Nenhum campeonato cadastrado.
                </Typography>
              ) : (
                championships.map((championship) => {
                  const championshipTeamRelations =
                    listTeamsByChampionship(championship.id);

                  return (
                    <Card
                      key={championship.id}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold" }}
                        >
                          {championship.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ mt: 1 }}
                        >
                          Tipo:{" "}
                          {typeLabels[championship.type]}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ mt: 1 }}
                        >
                          Status:{" "}
                          {statusLabels[championship.status]}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ mt: 1 }}
                        >
                          Período:{" "}
                          {formatDate(championship.startDate)}
                          {" até "}
                          {formatDate(championship.endDate)}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                            fontWeight: "bold",
                          }}
                        >
                          Times:
                        </Typography>

                        {championshipTeamRelations.length ===
                        0 ? (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            Nenhum time associado.
                          </Typography>
                        ) : (
                          championshipTeamRelations.map(
                            (relation) => (
                              <Typography
                                key={relation.id}
                                variant="body2"
                                sx={{ ml: 2, mt: 0.5 }}
                              >
                                •{" "}
                                {getTeamName(
                                  relation.teamId
                                )}
                              </Typography>
                            )
                          )
                        )}

                        {championship.description && (
                          <Typography
                            variant="body2"
                            sx={{ mt: 1 }}
                            color="text.secondary"
                          >
                            {championship.description}
                          </Typography>
                        )}

                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() =>
                            handleEdit(championship)
                          }
                          sx={{ mt: 2, mr: 1 }}
                        >
                          EDITAR
                        </Button>

                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() =>
                            handleDelete(championship.id)
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







