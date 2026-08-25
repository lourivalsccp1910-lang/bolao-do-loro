import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { getRanking } from "../services/ranking.service";

import type { RankingEntry } from "../types/ranking.types";

export default function RankingPage() {
  const [entries, setEntries] = useState<RankingEntry[]>([]);

  useEffect(() => {
    const ranking = getRanking();
    setEntries(ranking.entries);
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Ranking
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 4,
        }}
      >
        Classifica&ccedil;&atilde;o dos participantes.
      </Typography>

      <Card elevation={3}>
        <CardContent>
          {entries.length === 0 ? (
            <Typography color="text.secondary">
              Nenhum participante cadastrado.
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Posi&ccedil;&atilde;o</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Participante</strong>
                    </TableCell>

                    <TableCell align="right">
                      <strong>Pontos</strong>
                    </TableCell>

                    <TableCell align="right">
                      <strong>Exatos</strong>
                    </TableCell>

                    <TableCell align="right">
                      <strong>Parciais</strong>
                    </TableCell>

                    <TableCell align="right">
                      <strong>Erros</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry.participantId}>
                      <TableCell>
                        {entry.position}&ordm;
                      </TableCell>

                      <TableCell>
                        {entry.participantName}
                      </TableCell>

                      <TableCell align="right">
                        <strong>{entry.points}</strong>
                      </TableCell>

                      <TableCell align="right">
                        {entry.exactScores}
                      </TableCell>

                      <TableCell align="right">
                        {entry.partialScores}
                      </TableCell>

                      <TableCell align="right">
                        {entry.errors}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </>
  );
}
