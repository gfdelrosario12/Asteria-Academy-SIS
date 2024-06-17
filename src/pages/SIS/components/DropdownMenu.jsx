import React from 'react';
import { Link } from "react-router-dom";

const DropdownMenu = ({ title, items, links }) => {
  return (
    <div className="dropdown d-flex flex-column justify-content-between align-items-center">
      <button
        className="dropdown-button-item dropdown-toggle px-3 py-2 my-2"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {title}
      </button>

      <ul className="dropdown-menu text-center">
        {items.map((item, index) => (
          <li key={index}>
            <Link className="dropdown-item" to={links[index]}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
