import React, { useState } from "react";
import map from "../../../../../../assets/map/map.svg";

/**
 * Component to display a match map with champion kill events.
 * @param {Object} props - Props passed to the component.
 * @param {Object[]} props.timeLine - Timeline data of the match.
 * @param {Object} props.match - Information about the match.
 * @returns {JSX.Element} - Map component JSX.
 */
export const Map = ({ timeLine, match }) => {
  // Array of CSS classes representing team colors
  const colors = [
    "bg-blue-500",
    "bg-lime-500",
    "bg-cyan-500",
    "bg-emerald-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-rose-500",
    "bg-amber-500",
  ];

  // Extract champion kill events from the timeline data
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

  // Maximum value for X and Y coordinates on the map
  const maxXY = 15100;

  // State variables to manage selected kill event and info box visibility
  const [selectedKillEvent, setSelectedKillEvent] = useState(null);
  const [showInfoBox, setShowInfoBox] = useState(false);
  let timer;

  // Function to handle mouse enter event on a kill event marker
  const handleMouseEnter = (killEvent) => {
    setSelectedKillEvent(killEvent);
    timer = setTimeout(() => {
      setShowInfoBox(true);
    }, 500);
  };

  // Function to handle mouse leave event on a kill event marker
  const handleMouseLeave = () => {
    clearTimeout(timer);
    setShowInfoBox(false);
    setSelectedKillEvent(null);
  };

  // State variable to manage active participant (clicked participant)
  const [activeParticipant, setActiveParticipant] = useState("");

  // Function to handle participant click event
  const handleParticipantClick = (index) => {
    const isActive = activeParticipant.includes(index);

    if (isActive) {
      setActiveParticipant("");
    } else {
      setActiveParticipant([index]);
    }
  };

  // Function to format time from milliseconds to minutes
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="flex " style={{ height: 530 }}>
      {/* Blue Team */}
      <div className="w-1/4 m-2 flex flex-col justify-center">
        <div className="text-blue-400">Blue Team</div>
        {/* Render participant info for Blue Team */}
        {match.participants.slice(0, 5).map((participant, index) => (
          <div className="flex my-2 items-center" key={index}>
            <div
              className={`${colors[index]} w-8 h-8 rounded-md mr-2 flex-shrink-0`}
            ></div>
            <div
              className={`flex-grow p-2 rounded-md border-gray-400 border flex items-center cursor-pointer ${
                activeParticipant.includes(index) ? "bg-gray-400" : ""
              }`}
              onClick={() => handleParticipantClick(index)}
            >
              <div>
                <img
                  src={`http://192.168.1.133:8000/static/champion/icon/${participant.championName}.png`}
                  alt={participant.championName}
                  className="w-10 h-auto rounded-md mr-2"
                />
              </div>
              <div className="truncate">{participant.riotIdGameName}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Match Map */}
      <div className="w-2/4 flex justify-center items-center">
        <div className="relative ">
          {/* Render the map image */}
          <img
            className="rounded-2xl"
            src={map}
            alt={"map"}
            style={{ width: "400px", height: "400px" }}
          />
          {/* Render champion kill events on the map */}
          {championKillEvents.map((killEvent, index) => {
            const porcentajeX = (killEvent.position.x / maxXY) * 100;
            const porcentajeY = (killEvent.position.y / maxXY) * 100;

            if (
              !activeParticipant ||
              activeParticipant.includes(killEvent.killerId - 1) ||
              activeParticipant.includes(killEvent.victimId - 1)
            ) {
              return (
                <div
                  key={index}
                  className={`w-3 h-3 absolute rounded-full ${
                    colors[killEvent.killerId - 1]
                  }`}
                  style={{ bottom: `${porcentajeY}%`, left: `${porcentajeX}%` }}
                  onMouseEnter={() => handleMouseEnter(killEvent)}
                  onMouseLeave={handleMouseLeave}
                ></div>
              );
            } else {
              return null;
            }
          })}

          {/* Render info box for selected kill event */}
          {selectedKillEvent && showInfoBox && (
            <div
              className="absolute bg-black text-white p-2 rounded-lg shadow"
              style={{
                bottom: `${
                  (selectedKillEvent.position.y / maxXY) * 100 + 5
                }%`,
                left: `${
                  (selectedKillEvent.position.x / maxXY) * 100 - 5
                }%`,
              }}
            >
              <div>
                <p>{formatTime(selectedKillEvent.timestamp)}</p>
              </div>
              <div className="flex">
                <p className="mr-2">
                  {`${
                    match.participants[selectedKillEvent.killerId - 1]
                      .championName
                  } Killed ${
                    match.participants[selectedKillEvent.victimId - 1]
                      .championName
                  }`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Red Team */}
      <div className="w-1/4 m-2 flex flex-col justify-center">
        <div className="text-red-400">RedTeam</div>
        {/* Render participant info for Red Team */}
        {match.participants.slice(5).map((participant, index) => (
          <div className="flex my-2 items-center" key={index + 5}>
            <div
              className={`flex-grow p-2 rounded-md border-gray-400 border flex items-center cursor-pointer ${
                activeParticipant.includes(index + 5) ? "bg-gray-400" : ""
              }`}
              onClick={() => handleParticipantClick(index + 5)}
            >
              <div>
                <img
                  src={`http://192.168.1.133:8000/static/champion/icon/${participant.championName}.png`}
                  alt={participant.championName}
                  className="w-10 h-auto rounded-md mr-2"
                />
              </div>
              <div className="truncate">{participant.riotIdGameName}</div>
            </div>
            <div
              className={`${
                colors[index + 5]
              } w-8 h-8 rounded-md ml-2 flex-shrink-0`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
