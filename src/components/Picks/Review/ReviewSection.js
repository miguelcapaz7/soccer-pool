import React from "react";
import Button from "../../Button";

const ReviewSection = ({ title, items, onEdit }) => (
  <div className="card mb-4">
    <div className="card-header fw-bold">{title}</div>
    <div className="card-body">
      {items.length === 0 ? (
        <p className="text-danger">No data available.</p>
      ) : (
        <ul className="list-group list-group-flush">
          {items.map((item, idx) => (
            <li key={idx} className="list-group-item">
              {typeof item === "string" ? item : JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 text-end">
        <Button color="secondary" onClick={onEdit}>Edit</Button>
      </div>
    </div>
  </div>
);

export default ReviewSection;
