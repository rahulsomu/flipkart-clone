import React from "react";

const Ads = ({ img }) => {
  return (
    <div
      style={{
        maxWidth: "1700px",
        margin: "10px auto",
        boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%);",
      }}
    >
      <img src={img} alt="ad" style={{ width: "100%" }} />
    </div>
  );
};

export default Ads;
