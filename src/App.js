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
import Step1 from "./pages/Picks/GroupStagePicks";
import Step2 from "./pages/Picks/AdvancedTeamsPicks";
import Step3 from "./pages/Picks/KnockoutStagePicks";
import Step4 from "./pages/Picks/TopScorerPicks";
import Navbar from "./components/Navbar";
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
            <Route path="/groupStagePicks" element={<Step1 />} />
            <Route path="/advancedTeamsPicks" element={<Step2 />} />
            <Route path="/knockoutStagePicks" element={<Step3 />} />
            <Route path="/topScorerPicks" element={<Step4 />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
