import { useEffect, useState } from "react";
import {
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
  createChampionship,
  deleteChampionship,
  listChampionships,
  updateChampionship,
} from "../services/championship.service";

import type {
  Championship,
  ChampionshipFormData,
  ChampionshipType,
} from "../types/championship.types";

const emptyForm: ChampionshipFormData = {
  name: "",
  type: "LOTECA",
  description: "",
};

const typeLabels: Record<ChampionshipType, string> = {
  LOTECA: "Loteca",
  PLACARES: "Placares",
  CLASSIFICACAO: "Classificação",
  MATA_MATA: "Mata-mata",
};

export default function ChampionshipsPage() {
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [form, setForm] = useState<ChampionshipFormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setChampionships(listChampionships());
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

  function handleSubmit() {
    if (!form.name.trim()) {
      alert("Informe o nome do campeonato.");
      return;
    }

    if (editingId) {
      updateChampionship(editingId, form);
    } else {
      createChampionship(form);
    }

    setChampionships(listChampionships());
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(championship: Championship) {
    setEditingId(championship.id);

    setForm({
      name: championship.name,
      type: championship.type,
      description: championship.description,
    });
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Deseja realmente excluir este campeonato?"
    );

    if (!confirmed) {
      return;
    }

    deleteChampionship(id);
    setChampionships(listChampionships());

    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
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

                <Select
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
                  <MenuItem value="LOTECA">
                    Loteca
                  </MenuItem>

                  <MenuItem value="PLACARES">
                    Placares
                  </MenuItem>

                  <MenuItem value="CLASSIFICACAO">
                    Classificação
                  </MenuItem>

                  <MenuItem value="MATA_MATA">
                    Mata-mata
                  </MenuItem>
                </Select>
              </FormControl>

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
                Campeonatos cadastrados
              </Typography>

              {championships.length === 0 ? (
                <Typography color="text.secondary">
                  Nenhum campeonato cadastrado.
                </Typography>
              ) : (
                championships.map((championship) => (
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
                        Tipo: {typeLabels[championship.type]}
                      </Typography>

                      {championship.description && (
                        <Typography
                          variant="body2"
                          sx={{ mt: 1 }}
                          color="text.secondary"
                        >
                          {championship.description}
                        </Typography>
                      )}

                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          color: "success.main",
                        }}
                      >
                        {championship.active
                          ? "Ativo"
                          : "Inativo"}
                      </Typography>

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
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}