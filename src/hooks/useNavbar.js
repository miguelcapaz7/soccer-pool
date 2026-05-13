import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { buildDropdownItems } from "../utils/navbarUtils";
import Collapse from "bootstrap/js/dist/collapse";

const useNavbar = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const navItems = ["Home", "Rules", "Leaderboard", "View Your Picks"];
  const displayName = user.displayName;

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
    if (collapseElement && collapseElement.classList.contains("show")) {
      const bsCollapse =
        Collapse.getInstance(collapseElement) ||
        new Collapse(collapseElement, {
          toggle: false,
        });
      bsCollapse.hide();
    }
  };

  const handleToggle = () => {
    const collapseElement = document.getElementById("navbarSupportedContent");

    if (!collapseElement) return;

    const bsCollapse =
      Collapse.getInstance(collapseElement) ||
      new Collapse(collapseElement, { toggle: false });

    if (collapseElement.classList.contains("show")) {
      bsCollapse.hide();
    } else {
      bsCollapse.show();
    }
  };

  return {
    displayName,
    navItems,
    dropdownItems,
    handleNavLinkClick,
    handleToggle
  };
};

export default useNavbar;
