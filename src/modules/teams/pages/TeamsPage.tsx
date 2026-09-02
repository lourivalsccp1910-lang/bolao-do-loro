import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import {
  createTeam,
  deleteTeam,
  listTeams,
  updateTeam,
} from "../services/team.service";

import type {
  Team,
  TeamFormData,
  TeamStatus,
} from "../types/team.types";

const emptyForm: TeamFormData = {
  name: "",
  country: "",
  state: "",
  city: "",
  logo: "",
  stadium: "",
  status: "ATIVO",
};

const statusLabels: Record<TeamStatus, string> = {
  ATIVO: "Ativo",
  INATIVO: "Inativo",
};

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [form, setForm] = useState<TeamFormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTeams(listTeams());
  }, []);

  function handleChange(
    field: keyof TeamFormData,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit() {
    if (!form.name.trim()) {
      alert("Informe o nome do time.");
      return;
    }

    if (!form.country.trim()) {
      alert("Informe o país.");
      return;
    }

    if (editingId) {
      updateTeam(editingId, {
        ...form,
        name: form.name.trim(),
        country: form.country.trim(),
        state: form.state?.trim() || "",
        city: form.city?.trim() || "",
        logo: form.logo?.trim() || "",
        stadium: form.stadium?.trim() || "",
      });
    } else {
      createTeam({
        ...form,
        name: form.name.trim(),
        country: form.country.trim(),
        state: form.state?.trim() || "",
        city: form.city?.trim() || "",
        logo: form.logo?.trim() || "",
        stadium: form.stadium?.trim() || "",
      });
    }

    setTeams(listTeams());
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(team: Team) {
    setEditingId(team.id);

    setForm({
      name: team.name,
      country: team.country,
      state: team.state || "",
      city: team.city || "",
      logo: team.logo || "",
      stadium: team.stadium || "",
      status: team.status,
    });
  }

  function handleDelete(id: string) {
    const team = teams.find((item) => item.id === id);

    if (!team) {
      return;
    }

    const confirmed = window.confirm(
      `Deseja realmente excluir o time "${team.name}"?`
    );

    if (!confirmed) {
      return;
    }

    deleteTeam(id);
    setTeams(listTeams());

    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  const filteredTeams = teams.filter((team) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      team.name.toLowerCase().includes(searchText) ||
      team.country.toLowerCase().includes(searchText) ||
      (team.state || "").toLowerCase().includes(searchText) ||
      (team.city || "").toLowerCase().includes(searchText)
    );
  });

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Times
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: "text.secondary",
        }}
      >
        Cadastro e gerenciamento dos times do Bolão do Loro.
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
                {editingId ? "Editar time" : "Novo time"}
              </Typography>

              <TextField
                fullWidth
                label="Nome do time"
                value={form.name}
                onChange={(event) =>
                  handleChange("name", event.target.value)
                }
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="País"
                value={form.country}
                onChange={(event) =>
                  handleChange("country", event.target.value)
                }
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Estado / Região"
                value={form.state}
                onChange={(event) =>
                  handleChange("state", event.target.value)
                }
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Cidade"
                value={form.city}
                onChange={(event) =>
                  handleChange("city", event.target.value)
                }
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Estádio"
                value={form.stadium}
                onChange={(event) =>
                  handleChange("stadium", event.target.value)
                }
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="URL do escudo"
                value={form.logo}
                onChange={(event) =>
                  handleChange("logo", event.target.value)
                }
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                select
                label="Status"
                value={form.status}
                onChange={(event) =>
                  handleChange(
                    "status",
                    event.target.value as TeamStatus
                  )
                }
                sx={{ mb: 3 }}
              >
                <MenuItem value="ATIVO">
                  {statusLabels.ATIVO}
                </MenuItem>

                <MenuItem value="INATIVO">
                  {statusLabels.INATIVO}
                </MenuItem>
              </TextField>

              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mr: 1 }}
              >
                {editingId ? "SALVAR ALTERAÇÕES" : "CADASTRAR"}
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
                Times cadastrados
              </Typography>

              <TextField
                fullWidth
                label="Pesquisar time"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                sx={{ mb: 3 }}
              />

              {filteredTeams.length === 0 ? (
                <Typography color="text.secondary">
                  Nenhum time encontrado.
                </Typography>
              ) : (
                filteredTeams.map((team) => (
                  <Card
                    key={team.id}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold" }}
                      >
                        {team.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ mt: 1 }}
                      >
                        Localização:{" "}
                        {team.city || "-"}
                        {team.state
                          ? `, ${team.state}`
                          : ""}
                        {team.country
                          ? ` - ${team.country}`
                          : ""}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ mt: 1 }}
                      >
                        Estádio: {team.stadium || "-"}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ mt: 1 }}
                      >
                        Status: {statusLabels[team.status]}
                      </Typography>

                      {team.logo && (
                        <img
                          src={team.logo}
                          alt={`Escudo do ${team.name}`}
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "contain",
                            marginTop: 12,
                          }}
                        />
                      )}

                      <div>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() =>
                            handleEdit(team)
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
                            handleDelete(team.id)
                          }
                          sx={{ mt: 2 }}
                        >
                          EXCLUIR
                        </Button>
                      </div>
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
