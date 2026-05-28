import useMarkPools from "../../../hooks/Admin/MarkPools/useMarkPools.js";
import MainLayout from "../../../layouts/MainLayout.jsx";
import MenuCard from "../../../components/Admin/MenuCard.jsx";

const MarkPools = () => {
  const { navigate, menus } = useMarkPools();

  return (
    <MainLayout title="Mark Pools">
      <div className="container mt-4">
        <div className="mb-3">
          <h5 className="fw-bold mb-1">Select a stage to mark</h5>
          <p className="text-muted small mb-0">
            Choose which step you'd like to score.
          </p>
        </div>

        <div className="row g-3 g-md-4">
          {menus.map((menu, index) => (
            <div
              key={index + 1}
              className="col-6 col-md-4 col-lg-3"
              onClick={() => navigate(`/admin/markPools${menu.path}`)}
            >
              <MenuCard title={menu.title} icon={index+1}/>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MarkPools;
