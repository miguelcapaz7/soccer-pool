import useAdmin from "../../hooks/Admin/useAdmin.js";
import MainLayout from "../../layouts/MainLayout.jsx";
import MenuCard from "../../components/Admin/MenuCard.jsx";

const Admin = () => {
  const { navigate, menus } = useAdmin();

  return (
    <MainLayout title="Admin Dashboard">
      <div className="row g-3 g-md-4 mt-3">
        {menus.map((menu, index) => (
          <div
            key={index}
            className="col-6 col-md-4 col-lg-3"
            onClick={() => navigate(menu.path)}
          >
            <MenuCard icon={menu.icon} title={menu.title} />
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Admin;
