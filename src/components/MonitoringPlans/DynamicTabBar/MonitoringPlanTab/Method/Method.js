import React from "react";
import "./Method.css";
const Method = ({ title }) => {
  return (
    <div className="methodHeader">
      <div className="methodTitle">
        <h3> + {title}</h3>
      </div>
      <button className="rectBTN">⊕ Add {title}</button>
    </div>
  );
};

export default Method;
