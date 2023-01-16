import React from "react";

const Ads = ({ img }) => {
  return (
    <div style={{ width: "100%" }}>
      <img src={img} alt="ad" style={{ width: "100%" }} />
    </div>
  );
};

export default Ads;
