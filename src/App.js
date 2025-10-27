import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import '../src/assets/styles/styles.scss';
import CreateAccount from "./pages/Auth/CreateAccount";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Rules from "./pages/Rules";
import GroupStagePicks from "./pages/Picks/GroupStagePicks";
import StandingsPicks from "./pages/Picks/StandingsPicks";
import KnockoutStagePicks from "./pages/Picks/KnockoutStagePicks";
import TopScorerPicks from "./pages/Picks/TopScorerPicks";
import ReviewPicks from "./pages/Picks/ReviewPicks";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";

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
