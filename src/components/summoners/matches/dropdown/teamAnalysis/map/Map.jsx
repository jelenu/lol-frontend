import React from "react";
import map from "../../../../../../assets/map/map11.png";

export const Map = ({ timeLine }) => {
  const championKillEvents = timeLine.info.frames.flatMap((frame) =>
    frame.events
      .filter((event) => event.type === "CHAMPION_KILL")
      .map((event) => ({
        killerId: event.killerId,
        victimId: event.victimId,
        timestamp: event.timestamp,
        position: event.position,
      }))
  );

  const maxXY = 15100;

  const pruebaX = championKillEvents[0].position.x;
  const pruebaY = championKillEvents[0].position.y;

  var porcentajeX = (pruebaX / maxXY) * 100;
  var porcentajeY = (pruebaY / maxXY) * 100;

  return (
    <div className="flex " style={{ height: 530 }}>
      <div className="w-1/4"></div>
      <div className="w-2/4 flex justify-center items-center">
        <div className="relative ">
          <img
            className=" rounded-2xl "
            src={map}
            alt={"map"}
            style={{ width: "400px", height: "400px" }}
          />
          {championKillEvents.map((killEvent, index) => (
            <div key={index}
            className="w-2 h-2 absolute rounded-full bg-red-100"
            style={{ top: porcentajeY, left: porcentajeX }}
          ></div>
          ))}
          
        </div>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
};
