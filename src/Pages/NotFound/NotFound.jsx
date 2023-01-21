import React from "react";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not_found_page">
      <div className="not_found_wrapper">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="main">
          <h1 className="not_found_heading">404</h1>
          <p className="not_found_desc">Page Not Found</p>
        </div>
      </div>
    </div>
  );
}
