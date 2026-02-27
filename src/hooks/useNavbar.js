import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { buildDropdownItems } from "../utils/navbarUtils";
import Collapse from "bootstrap/js/dist/collapse";

const useNavbar = () => {
  const { user, isLoggedIn, profile } = useAuth();
  const navigate = useNavigate();
  const navItems = ["Home", "Rules", "Leaderboard"];

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    } 
  };

  const dropdownItems = buildDropdownItems(
    profile?.role,
    navigate,
    handleLogout,
  );

  const handleNavLinkClick = () => {
    const collapseElement = document.getElementById("navbarSupportedContent");
    if (collapseElement) {
      const bsCollapse =
        Collapse.getInstance(collapseElement) ||
        new Collapse(collapseElement, {
          toggle: false,
        });
      bsCollapse.hide();
    }
  };

  return {
    user,
    isLoggedIn,
    navItems,
    dropdownItems,
    handleNavLinkClick,
  };
};

export default useNavbar;
