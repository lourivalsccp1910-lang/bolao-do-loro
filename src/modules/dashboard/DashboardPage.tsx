import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import { listParticipants } from "../participants/services/participant.service";
import { listChampionships } from "../championships/services/championship.service";
import { listGames } from "../games/services/game.service";
import { listPredictions } from "../predictions/services/prediction.services";

const cards = [
  {
    titulo: "Participantes",
    key: "participants",
  },
  {
    titulo: "Campeonatos",
    key: "championships",
  },
  {
    titulo: "Jogos",
    key: "games",
  },
  {
    titulo: "Palpites",
    key: "predictions",
  },
];

export default function DashboardPage() {
  const [totals, setTotals] = useState({
    participants: 0,
    championships: 0,
    games: 0,
    predictions: 0,
  });

  useEffect(() => {
    const participants = listParticipants();
    const championships = listChampionships();
    const games = listGames();
    const predictions = listPredictions();

    setTotals({
      participants: participants.length,
      championships: championships.length,
      games: games.length,
      predictions: predictions.length,
    });
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 4,
        }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={card.titulo}
          >
            <Card elevation={3}>
              <CardContent>
                <Typography variant="subtitle2">
                  {card.titulo}
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    mt: 2,
                    fontWeight: "bold",
                  }}
                >
                  {
                    totals[
                      card.key as keyof typeof totals
                    ]
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}