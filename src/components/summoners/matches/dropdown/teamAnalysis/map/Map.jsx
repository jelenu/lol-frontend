import React, { useState } from "react";
import map from "../../../../../../assets/map/map.svg";
import WindowSizeHook from "../../../../../../hooks/WindowSizeHook";

/**
 * Component to display a match map with champion kill events.
 * @param {Object} props - Props passed to the component.
 * @param {Object[]} props.timeLine - Timeline data of the match.
 * @param {Object} props.match - Information about the match.
 * @returns {JSX.Element} - Map component JSX.
 */
export const Map = ({ timeLine, match }) => {
  const size = WindowSizeHook();

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

  const getHeight = () => {
    if (size.width < 500) {
      return 200;
    } else if (size.width < 640) {
      return 250;
    } else if (size.width < 1024) {
      return 300;
    } else {
      return 400;
    }
  };

  return (
    <div className="flex justify-between ">
      {/* Blue Team */}
      <div className="md:w-1/4 m-3 flex flex-col justify-center">
        <div className="text-blue-400">Blue Team</div>
        {/* Render participant info for Blue Team */}
        {match.participants.slice(0, 5).map((participant, index) => (
          <div className="flex my-2 items-center" key={index}>
            <div
              className={`md:flex-grow  p-2 max-md:p-1 rounded-md border-gray-400  border flex items-center cursor-pointer ${
                activeParticipant.includes(index) ? "bg-white" : colors[index]
              }`}
              onClick={() => handleParticipantClick(index)}
            >
              <div>
                <img
                  src={`http://192.168.1.133:8000/static/champion/icon/${participant.championName}.png`}
                  alt={participant.championName}
                  className="w-10 max-lg:w-8 max-sm:w-6 h-auto rounded-md mr-2 max-md:mr-0 "
                />
              </div>
              <div className="truncate max-md:hidden">
                {participant.riotIdGameName}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Match Map */}
      <div className=" flex justify-center items-center">
        <div className="relative ">
          {/* Render the map image */}
          <img
            className="rounded-2xl"
            src={map}
            alt={"map"}
            style={{ width: getHeight(), height: getHeight() }}
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
                  className={`w-3 h-3 max-md:w-2 max-md:h-2 absolute rounded-full ${
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
                bottom: `${(selectedKillEvent.position.y / maxXY) * 100 + 5}%`,
                left: `${(selectedKillEvent.position.x / maxXY) * 100 - 5}%`,
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
      <div className=" m-3 md:w-1/4 flex flex-col justify-center">
        <div className="text-red-400">Red Team</div>
        {/* Render participant info for Red Team */}
        {match.participants.slice(5).map((participant, index) => (
          <div className="flex my-2 items-center" key={index + 5}>
            <div
              className={`md:flex-grow p-2 max-md:p-1 rounded-md border-gray-400  border flex items-center cursor-pointer ${
                activeParticipant.includes(index + 5) ? "bg-white" : colors[index + 5]
              }`}
              onClick={() => handleParticipantClick(index + 5)}
            >
              <div>
                <img
                  src={`http://192.168.1.133:8000/static/champion/icon/${participant.championName}.png`}
                  alt={participant.championName}
                  className="w-10 max-lg:w-8 max-sm:w-6 h-auto rounded-md mr-2 max-md:mr-0"
                />
              </div>
              <div className="truncate max-md:hidden">
                {participant.riotIdGameName}
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};
