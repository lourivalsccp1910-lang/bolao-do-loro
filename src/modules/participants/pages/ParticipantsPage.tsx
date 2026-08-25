import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ParticipantForm from "../components/ParticipantForm";
import ParticipantTable from "../components/ParticipantTable";

import {
  createParticipant,
  deleteParticipant,
  listParticipants,
  updateParticipant,
} from "../services/participant.service";

import type {
  Participant,
  ParticipantFormData,
} from "../types/participant.types";

export default function ParticipantsPage() {
  const [participants, setParticipants] =
    useState<Participant[]>([]);

  const [editingParticipant, setEditingParticipant] =
    useState<Participant | null>(null);

  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");

  function loadParticipants() {
    setParticipants(listParticipants());
  }

  useEffect(() => {
    loadParticipants();
  }, []);

  function handleSubmit(data: ParticipantFormData) {
    if (editingParticipant) {
      updateParticipant(
        editingParticipant.id,
        data
      );

      setMessage("Participante atualizado com sucesso.");
      setEditingParticipant(null);
    } else {
      createParticipant(data);

      setMessage("Participante cadastrado com sucesso.");
    }

    loadParticipants();

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  function handleDelete(id: string) {
    const participant = participants.find(
      (item) => item.id === id
    );

    if (!participant) {
      return;
    }

    const confirmed = window.confirm(
      `Deseja excluir o participante "${participant.name}"?`
    );

    if (!confirmed) {
      return;
    }

    deleteParticipant(id);

    if (editingParticipant?.id === id) {
      setEditingParticipant(null);
    }

    loadParticipants();

    setMessage("Participante excluído com sucesso.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          Participantes
        </Typography>

        <Typography color="text.secondary">
          Cadastro e gerenciamento dos participantes do
          Bolão do Loro.
        </Typography>
      </Box>

      {message && (
        <Alert severity="success">
          {message}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <ParticipantForm
          participant={editingParticipant}
          onSubmit={handleSubmit}
          onCancel={() =>
            setEditingParticipant(null)
          }
        />
      </Paper>

      <Divider />

      <ParticipantTable
        participants={participants}
        search={search}
        onSearchChange={setSearch}
        onEdit={setEditingParticipant}
        onDelete={handleDelete}
      />
    </Stack>
  );
}