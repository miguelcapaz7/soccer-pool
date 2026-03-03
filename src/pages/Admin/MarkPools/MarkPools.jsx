import useMarkPools from "../../../hooks/Admin/MarkPools/useMarkPools.js";
import MainLayout from "../../../layouts/MainLayout.jsx";

const MarkPools = () => {
  const { user, profile, navigate, menus } = useMarkPools();

  if (!user || !profile) {
    return null;
  }

  if (profile.role !== "Admin") {
    return (
      <div className="container py-5 mt-5">
        <h5 className="text-center mt-4">
          You do not have permission to view this page
        </h5>
      </div>
    );
  }

  return (
    <MainLayout title="Mark Pools">
      <div className="container mt-4">
        Select the stage to mark
        <div className="row g-4 mt-3 ">
          {menus.map((step, index) => (
            <div
              key={index + 1}
              className="col-12 col-sm-6 col-md-4 col-lg-3 "
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/admin/markPools${step.path}`)}
            >
              <div className="p-4 border rounded-3 shadow-sm bg-light h-100 d-flex flex-column align-items-center justify-content-center text-center">
                <h5 className="mt-3">{step.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MarkPools;
