import "../../assets/styles/Admin.css"

const MenuCard = ({ icon, title }) => {
  return (
    <div className="menu-card h-100 d-flex flex-column align-items-center justify-content-center text-center p-3 p-md-4 rounded-3 bg-white border">
      <div className="menu-icon fw-bold mb-2 mb-md-3 d-flex align-items-center justify-content-center rounded-circle">
        {icon}
      </div>
      <h6 className="mb-0 fw-semibold">{title}</h6>
    </div>
  );
};

export default MenuCard;