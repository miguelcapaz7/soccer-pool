import { useNavigate } from "react-router-dom";

const useAdmin = () => {
  const navigate = useNavigate();
  const menus = [
    { title: "Mark Pools", path: "/admin/markPools", icon: "📝" },
    { title: "Users", path: "/admin/users", icon: "👥" },
  ];

  return { navigate, menus };
};

export default useAdmin;