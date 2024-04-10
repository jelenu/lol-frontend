import React from "react";
import map from "../../../../../../assets/map/map11.png";
export const Map = ({timeLine}) => {
  console.log(timeLine)
  return (
    <div className="flex" style={{ height: 530 }}>
      <div className="w-1/4">

      </div>
      <div className=" w-2/4">
        <img className="w-96 h-96" src={map} alt={"map"} />

      </div>
      <div className="w-1/4">

      </div>

    </div>
  );
};
