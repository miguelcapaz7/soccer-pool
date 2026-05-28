const MainLayout = ({ title, children }) => {
  return (
    <div className="container py-5 mt-5">
      <h2 className="text-center fw-bold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default MainLayout;