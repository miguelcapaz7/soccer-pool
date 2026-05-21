const PicksSubmittedCard = ({ title, message, buttonText, onButtonClick }) => {
  return (
    <div className="container d-flex justify-content-center py-5 mt-5">
      <div
        className="card shadow-sm border-1 text-center"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="card-body p-4">
          <div className="mb-3" style={{ fontSize: "2rem" }}>
            ✅
          </div>
          <h4 className="card-title mb-3">{title}</h4>
          <p className="card-text text-muted mb-0 small">{message}</p>
          {buttonText && onButtonClick && (
            <button className="px-3 btn btn-dark mt-3" onClick={onButtonClick}>
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PicksSubmittedCard;
