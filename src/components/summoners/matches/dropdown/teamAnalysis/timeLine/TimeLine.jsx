import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

/**
 * Component to display match timeline events.
 * @param {Object} props - Props passed to the component.
 * @param {Object} props.timeLine - Timeline data.
 * @param {Object} props.match - Match data.
 * @returns {JSX.Element} - TimeLine component JSX.
 */
export const TimeLine = ({ timeLine, match }) => {
  const baseURL = "http://127.0.0.1:8000/static/";

  // Images for different types of wards
  const wardImages = {
    YELLOW_TRINKET: "3340.png",
    SIGHT_WARD: "3340.png",
    RED_TRINKET: "3364.png",
    BLUE_TRINKET: "3363.png",
    CONTROL_WARD: "2055.png",
  };

  // Images for different types of objectives
  const objectivesImages = {
    HORDE: ["vilemaw-100.png", "vilemaw-200.png"],
    RIFTHERALD: ["herald-100.png", "herald-200.png"],
    DRAGON: ["dragon-100.png", "dragon-200.png"],
    BARON_NASHOR: ["baron-100.png", "baron-200.png"],
    INHIBITOR_BUILDING: ["inhibitor-100.png", "inhibitor-200.png"],
    TOWER_BUILDING: ["tower-100.png", "tower-200.png"],
  };

  // States to manage visibility of different types of events
  const [objectivesActive, setObjectivesActive] = useState(true);
  const [killsActive, setKillsActive] = useState(true);
  const [wardsActive, setWardsActive] = useState(true);

  // Convert milliseconds to minutes
  const millisecondsToMinutes = (milliseconds) => {
    return Math.floor(milliseconds / 60000);
  };

  // Render image for objective event
  const renderObjectiveImage = (objectiveType, killerId) => {
    const index = killerId - 1 >= 5 ? 1 : 0;
    return `${baseURL}objectives/${objectivesImages[objectiveType][index]}`;
  };

  // Render image for champion
  const renderChampionImage = (championName) => {
    return `${baseURL}champion/icon/${championName}.png`;
  };

  // Render image for ward
  const renderWardImage = (wardType) => {
    return `${baseURL}item/${wardImages[wardType]}`;
  };

  // Get participant's name
  const getParticipantName = (participant) => {
    return `${participant.riotIdGameName} #${participant.riotIdTagline}`;
  };

  // Get background color based on team
  const getColorTeam = (participantId) => {
    return participantId <= 5 ? "bg-blue-300" : "bg-red-300";
  };

  // Render different types of events
  const renderEvent = (event) => {
    const killer = match.participants[event.killerId - 1];
    const victim = match.participants[event.victimId - 1];
    const creator = match.participants[event.creatorId - 1];

    switch (event.type) {
      case "CHAMPION_KILL":
        if (!killsActive) return null;

        return (
          <div className="flex w-full">
            {/* Render timestamp */}
            <div className="w-1/12 p-2">
              {millisecondsToMinutes(event.timestamp)} min
            </div>

            {/* Render kill event */}
            <div
              className={`flex w-11/12 p-2  my-0.5 ${
                killer ? getColorTeam(event.killerId) : getColorTeam(event.victimId)
              }`}
            >
              <div className="w-1/2 flex">
                {/* Render killer */}
                <img
                  alt="killer"
                  src={killer ? renderChampionImage(killer.championName) : ""}
                  className="h-7 mr-2 rounded"
                />
                <div className="mr-2">
                  {killer
                    ? getParticipantName(killer)
                    : event.killerId <= 4
                    ? "Red Minion"
                    : "Blue Minion"}
                </div>
              </div>
              <div className="w-1/2 justify-end flex">
                {/* Render victim */}
                <div>Killed</div>
                <img
                  alt="victim"
                  src={renderChampionImage(victim.championName)}
                  className="h-7 ml-2"
                />
              </div>
            </div>
          </div>
        );

      case "WARD_PLACED":
        if (!wardsActive) return null;

        if (event.wardType === "UNDEFINED") {
          return null;
        } else {
          return (
            <div className="flex w-full">
              {/* Render timestamp */}
              <div className="w-1/12 p-2">
                {millisecondsToMinutes(event.timestamp)} min
              </div>

              {/* Render ward placed event */}
              <div
                className={`flex w-11/12 p-2  my-0.5 ${
                  event.creatorId <= 5 ? "bg-blue-300" : "bg-red-300"
                }`}
              >
                <div className=" w-1/2 flex">
                  {/* Render creator */}
                  <img
                    alt="champ"
                    src={renderChampionImage(creator.championName)}
                    className="h-7 mr-2 rounded"
                  />
                  <div className="mr-2">{getParticipantName(creator)}</div>
                </div>

                <div className="flex justify-end w-1/2">
                  {/* Render ward icon */}
                  <div> Placed</div>
                  <img
                    alt="ward"
                    src={renderWardImage(event.wardType)}
                    className="h-7 ml-2"
                  />
                </div>
              </div>
            </div>
          );
        }

      case "WARD_KILL":
        if (!wardsActive) return null;

        return (
          <div className="flex w-full">
            {/* Render timestamp */}
            <div className="w-1/12 p-2">
              {millisecondsToMinutes(event.timestamp)} min
            </div>

            {/* Render ward kill event */}
            <div
              className={`flex w-11/12 p-2  my-0.5 ${
                event.killerId <= 5 ? "bg-blue-300" : "bg-red-300"
              }`}
            >
              <div className=" w-1/2 flex">
                {/* Render killer */}
                <img
                  alt="champ"
                  src={renderChampionImage(killer.championName)}
                  className="h-7 mr-2 rounded"
                />
                <div className="mr-2">{getParticipantName(killer)}</div>
              </div>

              <div className="flex justify-end w-1/2">
                {/* Render ward icon */}
                <div> Killed</div>
                <img
                  alt="ward"
                  src={renderWardImage(event.wardType)}
                  className="h-7 ml-2"
                />
              </div>
            </div>
          </div>
        );

      case "ELITE_MONSTER_KILL":
        if (!objectivesActive) return null;

        if (killer && killer.championName) {
          return (
            <div className="flex w-full">
              {/* Render timestamp */}
              <div className="w-1/12 p-2">
                {millisecondsToMinutes(event.timestamp)} min
              </div>
              <div
                className={`flex w-11/12 p-2  my-0.5 ${
                  event.killerId - 1 >= 5 ? "bg-red-300" : "bg-blue-300"
                }`}
              >
                <div className="w-1/2 flex">
                  {/* Render killer */}
                  <img
                    alt="killer"
                    src={renderChampionImage(killer.championName)}
                    className="h-7 mr-2 rounded"
                  />
                  <div className="mr-2">{getParticipantName(killer)}</div>
                </div>
                <div className="w-1/2 justify-end flex">
                  {/* Render objective icon */}
                  <div>Killed</div>
                  <img
                    alt="objective"
                    src={renderObjectiveImage(event.monsterType, event.killerId)}
                    className="h-7 ml-2"
                  />
                </div>
              </div>
            </div>
          );
        } else {
          return null;
        }
      case "BUILDING_KILL":
        if (!objectivesActive) return null;

        return (
          <div className="flex w-full">
            {/* Render timestamp */}
            <div className="w-1/12 p-2">
              {millisecondsToMinutes(event.timestamp)} min
            </div>

            {/* Render building kill event */}
            <div
              className={`flex w-11/12 p-2  my-0.5 ${
                event.killerId - 1 >= 5 ? "bg-red-300" : "bg-blue-300"
              }`}
            >
              <div className="w-1/2 flex">
                {/* Render killer */}
                <img
                  alt="killer"
                  src={
                    event.killerId === 0
                      ? event.killerId <= 4
                        ? renderChampionImage("RedMinion")
                        : renderChampionImage("BlueMinion")
                      : renderChampionImage(killer.championName)
                  }
                  className="h-7 mr-2 rounded"
                />
                <div className="mr-2">
                  {event.killerId === 0
                    ? event.killerId <= 4
                      ? "Red Minion"
                      : "Blue Minion"
                    : `${getParticipantName(killer)}`}
                </div>
              </div>
              <div className="w-1/2 justify-end flex">
                {/* Render objective icon */}
                <div>Killed</div>
                <img
                  alt="objective"
                  src={renderObjectiveImage(event.buildingType, event.killedId)}
                  className="h-7 ml-2"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="py-4 max-md:py-2">
      {/* Toggle buttons for event types */}
      <div className="flex justify-center">
        <button
          onClick={() => setObjectivesActive(!objectivesActive)}
          className="flex items-center"
        >
          {/* Toggle button for objectives */}
          <div className="flex items-center justify-center p-2 mr-2 bg-blue-300">
            {objectivesActive ? (
              <FaCheck className="w-5 h-5 max-md:w-3 max-md:h-3 text-white" />
            ) : (
              <div className="w-5 h-5 max-md:w-3 max-md:h-3"></div>
            )}
          </div>
          Objectives
        </button>
        <button
          onClick={() => setKillsActive(!killsActive)}
          className="flex items-center mx-4"
        >
          {/* Toggle button for kills */}
          <div className="flex items-center justify-center p-2 mr-2 bg-blue-300">
            {killsActive ? (
              <FaCheck className="w-5 h-5 max-md:w-3 max-md:h-3 text-white" />
            ) : (
              <div className="w-5 h-5 max-md:w-3 max-md:h-3"></div>
            )}
          </div>
          Kills
        </button>
        <button
          onClick={() => setWardsActive(!wardsActive)}
          className="flex items-center"
        >
          {/* Toggle button for wards */}
          <div className="flex items-center justify-center p-2 mr-2 bg-blue-300">
            {wardsActive ? (
              <FaCheck className="w-5 h-5 max-md:w-3 max-md:h-3 text-white" />
            ) : (
              <div className="w-5 h-5 max-md:w-3 max-md:h-3"></div>
            )}
          </div>
          Vision
        </button>
      </div>
      {/* Event timeline */}
      <div className="overflow-y-auto m-4 max-md:m-1 px-2 " style={{ height: 480 }}>
        {timeLine.info.frames.slice(1).map((frame, frameIndex) => (
          <div key={frameIndex}>
            {frame.events.map((event, eventIndex) => (
              <div key={eventIndex}>{renderEvent(event, eventIndex)} </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
