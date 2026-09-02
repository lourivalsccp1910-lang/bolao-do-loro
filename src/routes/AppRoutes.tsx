import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import DashboardPage from "../modules/dashboard/DashboardPage";
import ParticipantsPage from "../modules/participants/pages/ParticipantsPage";
import ChampionshipsPage from "../modules/championships/pages/ChampionshipsPage";
import TeamsPage from "../modules/teams/pages/TeamsPage";
import GamesPage from "../modules/games/pages/GamesPage";
import PredictionsPage from "../modules/predictions/pages/PredictionsPage";
import RankingPage from "../modules/ranking/pages/RankingPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />

          <Route
            path="/participantes"
            element={<ParticipantsPage />}
          />

          <Route
            path="/campeonatos"
            element={<ChampionshipsPage />}
          />          
          <Route
            path="/times"
            element={<TeamsPage />}
          />

          <Route
            path="/jogos"
            element={<GamesPage />}
          />
          <Route
  path="/palpites"
  element={<PredictionsPage />}
/>

<Route
  path="/ranking"
  element={<RankingPage />}
/>
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}




