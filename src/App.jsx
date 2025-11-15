import React from "react";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import './assets/styles/styles.scss';
import CreateAccount from "./pages/Auth/CreateAccount";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Rules from "./pages/Rules";
import GroupStagePicks from "./pages/Picks/GroupStage/GroupStagePicks";
import StandingsPicks from "./pages/Picks/Standings/StandingsPicks";
import KnockoutStagePicks from "./pages/Picks/KnockoutStage/KnockoutStagePicks";
import TopScorerPicks from "./pages/Picks/TopScorers/TopScorerPicks";
import ReviewPicks from "./pages/Picks/Review/ReviewPicks";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";

const Router = import.meta.env.MODE === 'production' ? HashRouter : BrowserRouter;

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/groupStagePicks" element={<GroupStagePicks />} />
            <Route path="/standingsPicks" element={<StandingsPicks />} />
            <Route path="/knockoutStagePicks" element={<KnockoutStagePicks />} />
            <Route path="/topScorerPicks" element={<TopScorerPicks />} />
            <Route path="/reviewPicks" element={<ReviewPicks />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
