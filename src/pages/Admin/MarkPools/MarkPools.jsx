import useMarkPools from "../../../hooks/Admin/MarkPools/useMarkPools.js";
import MainLayout from "../../../layouts/MainLayout.jsx";
import "../../../assets/styles/MarkPools.css"

const MarkPools = () => {
  const { navigate, menus } = useMarkPools();

  return (
    <MainLayout title="Mark Pools">
      <div className="container mt-4">
  <div className="mb-3">
    <h5 className="fw-bold mb-1">Select a stage to mark</h5>
    <p className="text-muted small mb-0">Choose which prediction step you'd like to score.</p>
  </div>

  <div className="row g-3 g-md-4">
    {menus.map((step, index) => (
      <div
        key={index + 1}
        className="col-6 col-md-4 col-lg-3"
        onClick={() => navigate(`/admin/markPools${step.path}`)}
      >
        <div className="stage-card h-100 d-flex flex-column align-items-center justify-content-center text-center p-3 p-md-4 rounded-3 bg-white border position-relative">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-dark text-white fw-bold mb-2 mb-md-3"
            style={{ width: "40px", height: "40px", fontSize: "1rem" }}
          >
            {index + 1}
          </div>
          <h6 className="mb-0 fw-semibold">{step.title}</h6>
        </div>
      </div>
    ))}
  </div>
</div>
    </MainLayout>
  );
};

export default MarkPools;
