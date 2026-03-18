import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.jsx";

const Admin = () => {
  const navigate = useNavigate();

  const menus = [
    { title: "Mark Pools", path: "/admin/markPools", icon: "📝" },
    { title: "Users", path: "/admin/users", icon: "👥" },
  ];

  return (
    <MainLayout title="Admin Dashboard">
      <div className="row g-4 mt-3 ">
        {menus.map((menu, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-md-4 col-lg-3 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate(menu.path)}
          >
            <div className="p-4 border rounded-3 shadow-sm bg-light h-100 d-flex flex-column align-items-center justify-content-center text-center">
              <div style={{ fontSize: "2rem" }}>{menu.icon}</div>
              <h5 className="mt-3">{menu.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Admin;
