import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

export const TimeLine = ({ timeLine, match }) => {
  const baseURL = "http://localhost:8000/static/";

  const wardImages = {
    YELLOW_TRINKET: "3340.png",
    SIGHT_WARD: "3340.png",
    RED_TRINKET: "3364.png",
    BLUE_TRINKET: "3363.png",
    CONTROL_WARD: "2055.png",
  };

  const objectivesImages = {
    HORDE: ["vilemaw-100.png", "vilemaw-200.png"],
    RIFTHERALD: ["herald-100.png", "herald-200.png"],
    DRAGON: ["dragon-100.png", "dragon-200.png"],
    BARON_NASHOR: ["baron-100.png", "baron-200.png"],
    INHIBITOR_BUILDING: ["inhibitor-100.png", "inhibitor-200.png"],
    TOWER_BUILDING: ["tower-100.png", "tower-200.png"],
  };

  const [objectivesActive, setObjectivesActive] = useState(true);
  const [killsActive, setkillsActive] = useState(true);
  const [wardsActive, setWardsActive] = useState(true);

  const millisecondsToMinutes = (milliseconds) => {
    return Math.floor(milliseconds / 60000);
  };

  const renderObjectiveImage = (objectiveType, killerId) => {
    const index = killerId - 1 >= 5 ? 1 : 0;
    return `${baseURL}objectives/${objectivesImages[objectiveType][index]}`;
  };

  const renderChampionImage = (championName) => {
    return `http://localhost:8000/static/champion/icon/${championName}.png`;
  };

  const renderWardImage = (wardType) => {
    return `http://localhost:8000/static/item/${wardImages[wardType]}`;
  };

  const getParticipantName = (participant) => {
    return `${participant.riotIdGameName} #${participant.riotIdTagline}`;
  };

  const getColorTeam = (participantId) => {
    return participantId <= 5 ? "bg-blue-300" : "bg-red-300";
  };

  const renderEvent = (event) => {
    const killer = match.participants[event.killerId - 1];
    const victim = match.participants[event.victimId - 1];
    const creator = match.participants[event.creatorId - 1];


    switch (event.type) {
      case "CHAMPION_KILL":
        if (!killsActive) return null;

        return (
          <div className="flex w-full">
            <div className="w-1/12 p-2">
              {millisecondsToMinutes(event.timestamp)} min
            </div>

            <div
              className={`flex w-11/12 p-2  my-0.5 ${
                killer
                  ? getColorTeam(event.killerId)
                  : getColorTeam(event.victimId)
              }`}
            >
              <div className="w-1/2 flex">
                <img
                  alt="killer"
                  src={
                    killer
                      ? renderChampionImage(killer.championName)
                      : event.killerId <= 4
                      ? renderChampionImage("RedMinion")
                      : renderChampionImage("BlueMinion")
                  }
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
              <div className="w-1/12 p-2">
                {millisecondsToMinutes(event.timestamp)} min
              </div>

              <div
                className={`flex w-11/12 p-2  my-0.5 ${
                  event.creatorId <= 5 ? "bg-blue-300" : "bg-red-300"
                }`}
              >
                <div className=" w-1/2 flex">
                  <img
                    alt="champ"
                    src={renderChampionImage(creator.championName)}
                    className="h-7 mr-2 rounded"
                  />
                  <div className="mr-2">{getParticipantName(creator)}</div>
                </div>

                <div className="flex justify-end w-1/2">
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
            <div className="w-1/12 p-2">
              {millisecondsToMinutes(event.timestamp)} min
            </div>

            <div
              className={`flex w-11/12 p-2  my-0.5 ${
                event.killerId <= 5 ? "bg-blue-300" : "bg-red-300"
              }`}
            >
              <div className=" w-1/2 flex">
                <img
                  alt="champ"
                  src={renderChampionImage(killer.championName)}
                  className="h-7 mr-2 rounded"
                />
                <div className="mr-2">{getParticipantName(killer)}</div>
              </div>

              <div className="flex justify-end w-1/2">
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
              <div className="w-1/12 p-2">
                {millisecondsToMinutes(event.timestamp)} min
              </div>
              <div
                className={`flex w-11/12 p-2  my-0.5 ${
                  event.killerId - 1 >= 5 ? "bg-red-300" : "bg-blue-300"
                }`}
              >
                <div className="w-1/2 flex">
                  <img
                    alt="killer"
                    src={renderChampionImage(killer.championName)}
                    className="h-7 mr-2 rounded"
                  />
                  <div className="mr-2">{getParticipantName(killer)}</div>
                </div>
                <div className="w-1/2 justify-end flex">
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
            <div className="w-1/12 p-2">
              {millisecondsToMinutes(event.timestamp)} min
            </div>

            <div
              className={`flex w-11/12 p-2  my-0.5 ${
                event.killerId - 1 >= 5 ? "bg-red-300" : "bg-blue-300"
              }`}
            >
              <div className="w-1/2 flex">
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
    <div className=" py-4">
      <div className="flex justify-center">
        <button
          onClick={() => setObjectivesActive(!objectivesActive)}
          className="flex items-center"
        >
          <div className="flex items-center justify-center p-2 mr-2 bg-blue-300">
            {objectivesActive ? (
              <FaCheck className="w-5 h-5 text-white" />
            ) : (
              <div className="w-5 h-5"></div>
            )}
          </div>
          Objectives
        </button>
        <button
          onClick={() => setkillsActive(!killsActive)}
          className="flex items-center mx-4"
        >
          <div className="flex items-center justify-center p-2 mr-2 bg-blue-300">
            {killsActive ? (
              <FaCheck className="w-5 h-5 text-white" />
            ) : (
              <div className="w-5 h-5"></div>
            )}
          </div>
          Kills
        </button>
        <button
          onClick={() => setWardsActive(!wardsActive)}
          className="flex items-center"
        >
        <div className="flex items-center justify-center p-2 mr-2 bg-blue-300">
        {wardsActive ? (
          <FaCheck className="w-5 h-5 text-white" />
        ) : (
          <div className="w-5 h-5"></div>
        )}
      </div>
      Vision
        </button>
      </div>
      <div className="overflow-y-auto m-4 px-2" style={{ height:480 }}>
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
