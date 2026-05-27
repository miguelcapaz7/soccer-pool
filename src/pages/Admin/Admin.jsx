import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.jsx";
import "../../assets/styles/Admin.css"

const Admin = () => {
  const navigate = useNavigate();

  const menus = [
    { title: "Mark Pools", path: "/admin/markPools", icon: "📝" },
    { title: "Users", path: "/admin/users", icon: "👥" },
  ];

  return (
    <MainLayout title="Admin Dashboard">
<div className="row g-3 g-md-4 mt-3">
  {menus.map((menu, index) => (
    <div
      key={index}
      className="col-6 col-md-4 col-lg-3"
      onClick={() => navigate(menu.path)}
    >
      <div className="menu-card h-100 d-flex flex-column align-items-center justify-content-center text-center p-3 p-md-4 rounded-3 bg-white border">
        <div className="menu-icon mb-2 mb-md-3 d-flex align-items-center justify-content-center rounded-circle">
          {menu.icon}
        </div>
        <h6 className="mb-0 fw-semibold">{menu.title}</h6>
      </div>
    </div>
  ))}
</div>
    </MainLayout>
  );
};

export default Admin;
