import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import type { Participant } from "../types/participant.types";

interface Props {
  participants: Participant[];
  search: string;
  onSearchChange: (value: string) => void;
  onEdit: (participant: Participant) => void;
  onDelete: (id: string) => void;
}

export default function ParticipantTable({
  participants,
  search,
  onSearchChange,
  onEdit,
  onDelete,
}: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredParticipants = participants.filter(
    (participant) => {
      const term = search.toLowerCase();

      return (
        participant.name.toLowerCase().includes(term) ||
        participant.phone.toLowerCase().includes(term) ||
        participant.email.toLowerCase().includes(term) ||
        participant.cpf.toLowerCase().includes(term)
      );
    }
  );

  useEffect(() => {
    setPage(0);
  }, [search]);

  const paginatedParticipants = filteredParticipants.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  function handleChangePage(
    _event: unknown,
    newPage: number
  ) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <Stack spacing={2}>
      <TextField
        label="Pesquisar participante"
        placeholder="Nome, telefone, e-mail ou CPF"
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        fullWidth
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nome</strong>
              </TableCell>

              <TableCell>
                <strong>Telefone</strong>
              </TableCell>

              <TableCell>
                <strong>E-mail</strong>
              </TableCell>

              <TableCell>
                <strong>CPF</strong>
              </TableCell>

              <TableCell align="right">
                <strong>Ações</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredParticipants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Box sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      Nenhum participante encontrado.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedParticipants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>
                    {participant.name}
                  </TableCell>

                  <TableCell>
                    {participant.phone || "-"}
                  </TableCell>

                  <TableCell>
                    {participant.email || "-"}
                  </TableCell>

                  <TableCell>
                    {participant.cpf || "-"}
                  </TableCell>

                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          onEdit(participant)
                        }
                      >
                        Editar
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() =>
                          onDelete(participant.id)
                        }
                      >
                        Excluir
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredParticipants.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
          labelRowsPerPage="Participantes por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
        />
      </TableContainer>
    </Stack>
  );
}
