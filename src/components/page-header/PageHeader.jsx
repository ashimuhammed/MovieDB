import React from "react";
import "./page-header.scss";

const PageHeader = (props) => {
  return (
    <div className="page-header" style={{ backgroundImage: "url('/assets/footer-bg.jpg')" }}>
      <h2>{props.children}</h2>
    </div>
  );
};

export default PageHeader;