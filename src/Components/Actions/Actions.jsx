import React from "react";
import "./Actions.css";

export default function Actions() {
  const jsFilterFunc = () => {
    document.querySelector(".filter-menu").classList.toggle("active");
  };

  const clickGridFunc = () => {
    document.querySelector(".list").classList.remove("active");
    document.querySelector(".grid").classList.add("active");
    document.querySelector(".products-area-wrapper").classList.add("gridView");
    document
      .querySelector(".products-area-wrapper")
      .classList.remove("tableView");
  };

  const clickListFunc = () => {
    document.querySelector(".list").classList.add("active");
    document.querySelector(".grid").classList.remove("active");
    document
      .querySelector(".products-area-wrapper")
      .classList.remove("gridView");
    document.querySelector(".products-area-wrapper").classList.add("tableView");
  };

  return (
    <div className="app-content-actions">
      <input required={true} className="search-bar" placeholder="Search..." type="text" />
      <div className="app-content-actions-wrapper">
        <div className="filter-button-wrapper">
          <button
            onClick={() => jsFilterFunc()}
            className="action-button filter jsFilter"
          >
            <span>Filter</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-filter"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>
          <div className="filter-menu">
            <label>Category</label>
            <select>
              <option>All Categories</option>
              <option>Furniture</option>
              <option>Decoration</option>
              <option>Kitchen</option>
              <option>Bathroom</option>
            </select>
            <label>Status</label>
            <select>
              <option>All Status</option>
              <option>Active</option>
              <option>Disabled</option>
            </select>
            <div className="filter-menu-buttons">
              <button className="filter-button reset">Reset</button>
              <button className="filter-button apply">Apply</button>
            </div>
          </div>
        </div>
        <button
          onClick={() => clickListFunc()}
          className="action-button list active"
          title="List View"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-list"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </button>
        <button
          onClick={() => clickGridFunc()}
          className="action-button grid"
          title="Grid View"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-grid"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
