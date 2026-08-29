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

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  cpf?: string;
}

const emptyForm: ParticipantFormData = {
  name: "",
  phone: "",
  email: "",
  cpf: "",
};

function validateForm(form: ParticipantFormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Informe o nome completo.";
  }

  const phoneDigits = form.phone.replace(/\D/g, "");

  if (form.phone.trim() && phoneDigits.length < 10) {
    errors.phone = "Informe um telefone válido.";
  }

  if (form.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email.trim())) {
      errors.email = "Informe um e-mail válido.";
    }
  }

  const cpfDigits = form.cpf.replace(/\D/g, "");

  if (form.cpf.trim() && cpfDigits.length !== 11) {
    errors.cpf = "Informe um CPF válido.";
  }

  return errors;
}

export default function ParticipantForm({
  participant,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] =
    useState<ParticipantFormData>(emptyForm);

  const [errors, setErrors] = useState<FormErrors>({});

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

    setErrors({});
  }, [participant]);

  function handleChange(
    field: keyof ParticipantFormData,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const validationErrors = validateForm(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      cpf: form.cpf.trim(),
    });

    if (!participant) {
      setForm(emptyForm);
      setErrors({});
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
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
          error={Boolean(errors.name)}
          helperText={errors.name}
          required
          fullWidth
        />

        <TextField
          label="Telefone"
          value={form.phone}
          onChange={(event) =>
            handleChange("phone", event.target.value)
          }
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          fullWidth
        />

        <TextField
          label="E-mail"
          type="email"
          value={form.email}
          onChange={(event) =>
            handleChange("email", event.target.value)
          }
          error={Boolean(errors.email)}
          helperText={errors.email}
          fullWidth
        />

        <TextField
          label="CPF"
          value={form.cpf}
          onChange={(event) =>
            handleChange("cpf", event.target.value)
          }
          error={Boolean(errors.cpf)}
          helperText={errors.cpf}
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
