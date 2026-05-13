import React from "react";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./assets/styles/styles.scss";
import CreateAccount from "./pages/Auth/CreateAccount.jsx";
import Login from "./pages/Auth/Login.jsx";
import Home from "./pages/Home.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Rules from "./pages/Rules.jsx";
import Picks from "./pages/Picks/Picks.jsx";
import Profile from "./pages/Profile.jsx";
import YourPicks from "./pages/YourPicks.jsx";
import PicksSubmitted from "./pages/PicksSubmitted.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Users from "./pages/Admin/Users/Users.jsx";
import ViewPool from "./pages/Admin/Users/ViewPool.jsx";
import MarkPools from "./pages/Admin/MarkPools/MarkPools.jsx";
import MarkPoolsStep from "./pages/Admin/MarkPools/MarkPoolsStep.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import PublicRoute from "./components/Auth/PublicRoute.jsx";
import AdminRoute from "./components/Auth/AdminRoute.jsx";

const Router = import.meta.env.MODE === "production" ? HashRouter : BrowserRouter;

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/createAccount" element={<CreateAccount />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route element={<ProtectedLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/yourPicks" element={<YourPicks />} />
                <Route path="/picks/:step" element={<Picks />} />
                <Route path="/picksSubmitted" element={<PicksSubmitted />} />
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/markPools" element={<MarkPools />} />
                  <Route path="/admin/markPools/:step" element={<MarkPoolsStep />} />
                  <Route path="/admin/users" element={<Users />} />
                  <Route path="/admin/viewPool/:userId" element={<ViewPool />} />
                </Route>
              </Route>
            </Route>
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
