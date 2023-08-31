//  this component is for wrapping our sections into a fixed width like out popular sections etc.

import React from "react";
import "./style.scss";

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
