import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type {
  Participant,
  ParticipantFormData,
} from "../types/participant.types";

interface Props {
  participant?: Participant | null;
  onSubmit: (data: ParticipantFormData) => void;
  onCancel?: () => void;
}

const emptyForm: ParticipantFormData = {
  name: "",
  phone: "",
  email: "",
  cpf: "",
};

export default function ParticipantForm({
  participant,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] =
    useState<ParticipantFormData>(emptyForm);

  useEffect(() => {
    if (participant) {
      setForm({
        name: participant.name,
        phone: participant.phone,
        email: participant.email,
        cpf: participant.cpf,
      });
    } else {
      setForm(emptyForm);
    }
  }, [participant]);

  function handleChange(
    field: keyof ParticipantFormData,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    onSubmit(form);

    if (!participant) {
      setForm(emptyForm);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h6">
          {participant
            ? "Editar participante"
            : "Novo participante"}
        </Typography>

        <TextField
          label="Nome completo"
          value={form.name}
          onChange={(event) =>
            handleChange("name", event.target.value)
          }
          required
          fullWidth
        />

        <TextField
          label="Telefone"
          value={form.phone}
          onChange={(event) =>
            handleChange("phone", event.target.value)
          }
          fullWidth
        />

        <TextField
          label="E-mail"
          type="email"
          value={form.email}
          onChange={(event) =>
            handleChange("email", event.target.value)
          }
          fullWidth
        />

        <TextField
          label="CPF"
          value={form.cpf}
          onChange={(event) =>
            handleChange("cpf", event.target.value)
          }
          fullWidth
        />

        <Stack direction="row" spacing={2}>
          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            {participant ? "Salvar alterações" : "Cadastrar"}
          </Button>

          {participant && onCancel && (
            <Button
              type="button"
              variant="outlined"
              size="large"
              onClick={onCancel}
            >
              Cancelar
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}