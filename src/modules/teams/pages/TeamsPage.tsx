import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
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

import {
  fetchTeamsFromApi,
  type FootballApiTeam,
} from "../services/team.api";

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

  const [apiLeague, setApiLeague] = useState("71");
  const [apiSeason, setApiSeason] = useState("2024");
  const [apiTeams, setApiTeams] = useState<FootballApiTeam[]>([]);
  const [selectedApiIds, setSelectedApiIds] = useState<number[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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
      apiId: team.apiId,
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

  async function handleSearchApi() {
    setApiError("");
    setApiTeams([]);
    setSelectedApiIds([]);
    setApiLoading(true);

    try {
      const result = await fetchTeamsFromApi(
        Number(apiLeague),
        Number(apiSeason)
      );

      setApiTeams(result);
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Erro ao consultar a API-Football."
      );
    } finally {
      setApiLoading(false);
    }
  }

  function handleToggleApiTeam(apiId: number) {
    setSelectedApiIds((current) =>
      current.includes(apiId)
        ? current.filter((id) => id !== apiId)
        : [...current, apiId]
    );
  }

  function handleSelectAllApiTeams() {
    const availableIds = apiTeams
      .filter(
        (item) =>
          !teams.some(
            (team) => team.apiId === item.team.id
          )
      )
      .map((item) => item.team.id);

    setSelectedApiIds(availableIds);
  }

  function handleClearApiSelection() {
    setSelectedApiIds([]);
  }

  function handleImportSelectedApiTeams() {
    if (selectedApiIds.length === 0) {
      alert("Selecione pelo menos um time para importar.");
      return;
    }

    const selectedTeams = apiTeams.filter((item) =>
      selectedApiIds.includes(item.team.id)
    );

    let importedCount = 0;

    selectedTeams.forEach((item) => {
      const alreadyImported = teams.some(
        (team) => team.apiId === item.team.id
      );

      if (alreadyImported) {
        return;
      }

      createTeam({
        apiId: item.team.id,
        name: item.team.name,
        country: item.team.country,
        state: "",
        city: item.venue?.city || "",
        logo: item.team.logo || "",
        stadium: item.venue?.name || "",
        status: "ATIVO",
      });

      importedCount++;
    });

    setTeams(listTeams());
    setSelectedApiIds([]);

    alert(
      importedCount === 1
        ? "1 time importado com sucesso."
        : `${importedCount} times importados com sucesso.`
    );
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
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                Importar times da API-Football
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="ID da competição"
                    value={apiLeague}
                    onChange={(event) =>
                      setApiLeague(event.target.value)
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Temporada"
                    value={apiSeason}
                    onChange={(event) =>
                      setApiSeason(event.target.value)
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSearchApi}
                    disabled={apiLoading}
                    sx={{ height: "56px" }}
                  >
                    {apiLoading
                      ? "CONSULTANDO..."
                      : "CONSULTAR API"}
                  </Button>
                </Grid>
              </Grid>

              {apiError && (
                <Typography
                  color="error"
                  sx={{ mt: 2 }}
                >
                  {apiError}
                </Typography>
              )}

              {apiTeams.length > 0 && (
                <>
                  <Typography
                    sx={{
                      mt: 3,
                      fontWeight: "bold",
                    }}
                  >
                    {apiTeams.length} times encontrados.
                  </Typography>

                  <Grid
                    container
                    spacing={1}
                    sx={{ mt: 1, mb: 2 }}
                  >
                    <Grid item>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={handleSelectAllApiTeams}
                      >
                        SELECIONAR TODOS
                      </Button>
                    </Grid>

                    <Grid item>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={handleClearApiSelection}
                      >
                        LIMPAR SELEÇÃO
                      </Button>
                    </Grid>
                  </Grid>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {selectedApiIds.length} time(s)
                    selecionado(s).
                  </Typography>

                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleImportSelectedApiTeams}
                    disabled={selectedApiIds.length === 0}
                    sx={{ mb: 2 }}
                  >
                    IMPORTAR SELECIONADOS
                  </Button>
                </>
              )}

              {apiTeams.map((item) => {
                const alreadyImported = teams.some(
                  (team) => team.apiId === item.team.id
                );

                const selected = selectedApiIds.includes(
                  item.team.id
                );

                return (
                  <Card
                    key={item.team.id}
                    variant="outlined"
                    sx={{ mt: 2 }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Checkbox
                        checked={selected}
                        disabled={alreadyImported}
                        onChange={() =>
                          handleToggleApiTeam(
                            item.team.id
                          )
                        }
                      />

                      {item.team.logo && (
                        <img
                          src={item.team.logo}
                          alt={`Escudo do ${item.team.name}`}
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "contain",
                          }}
                        />
                      )}

                      <div>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold" }}
                        >
                          {item.team.name}
                        </Typography>

                        <Typography variant="body2">
                          {item.team.country}
                        </Typography>

                        <Typography variant="body2">
                          API ID: {item.team.id}
                        </Typography>

                        {item.venue?.name && (
                          <Typography variant="body2">
                            Estádio: {item.venue.name}
                          </Typography>
                        )}

                        {alreadyImported && (
                          <Typography
                            variant="body2"
                            color="success.main"
                            sx={{ mt: 1, fontWeight: "bold" }}
                          >
                            Já cadastrado
                          </Typography>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </Grid>

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

              {form.logo && (
                <img
                  src={form.logo}
                  alt={`Prévia do escudo de ${form.name || "time"}`}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    display: "block",
                    marginBottom: 16,
                  }}
                />
              )}
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





