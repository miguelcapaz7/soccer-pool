import React from "react";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import './assets/styles/styles.scss';
import CreateAccount from "./pages/Auth/CreateAccount.jsx";
import Login from "./pages/Auth/Login.jsx";
import Home from "./pages/Home.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Rules from "./pages/Rules.jsx";
import GroupStagePicks from "./pages/Picks/GroupStage/GroupStagePicks.jsx";
import StandingsPicks from "./pages/Picks/Standings/StandingsPicks.jsx";
import KnockoutStagePicks from "./pages/Picks/KnockoutStage/KnockoutStagePicks.jsx";
import TopScorerPicks from "./pages/Picks/TopScorers/TopScorerPicks.jsx";
import ReviewPicks from "./pages/Picks/Review/ReviewPicks.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./pages/Profile.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

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
