import React from "react";

export const TimeLine = ({ timeLine, match }) => {
  console.log(timeLine);
  console.log(match);

  const millisecondsToMinutes = (milliseconds) => {
    return Math.floor(milliseconds / 60000);
  };

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

  const renderObjectiveImage = (objectiveType, killerId) => {
    const index = killerId - 1 >= 5 ? 1 : 0;
    return `http://localhost:8000/static/objectives/${objectivesImages[objectiveType][index]}`;
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
                      ? `http://localhost:8000/static/champion/icon/${killer.championName}.png`
                      : event.killerId <= 4
                      ? "http://localhost:8000/static/champion/icon/RedMinion.png"
                      : "http://localhost:8000/static/champion/icon/BlueMinion.png"
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
                  src={`http://localhost:8000/static/champion/icon/${victim.championName}.png`}
                  className="h-7 ml-2"
                />
              </div>
            </div>
          </div>
        );
      case "WARD_PLACED":
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
                    src={`http://localhost:8000/static/champion/icon/${creator.championName}.png`}
                    className="h-7 mr-2 rounded"
                  />
                  <div className="mr-2">{getParticipantName(creator)}</div>
                </div>

                <div className="flex justify-end w-1/2">
                  <div> Placed</div>
                  <img
                    alt="ward"
                    src={`http://localhost:8000/static/item/${
                      wardImages[event.wardType]
                    }`}
                    className="h-7 ml-2"
                  />
                </div>
              </div>
            </div>
          );
        }

      case "WARD_KILL":
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
                  src={`http://localhost:8000/static/champion/icon/${killer.championName}.png`}
                  className="h-7 mr-2 rounded"
                />
                <div className="mr-2">{getParticipantName(killer)}</div>
              </div>

              <div className="flex justify-end w-1/2">
                <div> Killed</div>
                <img
                  alt="ward"
                  src={`http://localhost:8000/static/item/${
                    wardImages[event.wardType]
                  }`}
                  className="h-7 ml-2"
                />
              </div>
            </div>
          </div>
        );

      case "ELITE_MONSTER_KILL":
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
                  src={`http://localhost:8000/static/champion/icon/${killer.championName}.png`}
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
      case "BUILDING_KILL":
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
                        ? "http://localhost:8000/static/champion/icon/RedMinion.png"
                        : "http://localhost:8000/static/champion/icon/BlueMinion.png"
                      : `http://localhost:8000/static/champion/icon/${killer.championName}.png`
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
    <div className="overflow-y-auto" style={{ height: 530 }}>
      {timeLine.info.frames.slice(1).map((frame, frameIndex) => (
        <div key={frameIndex}>
          {frame.events.map((event, eventIndex) => (
            <div key={eventIndex}>{renderEvent(event, eventIndex)}</div>
          ))}
        </div>
      ))}
    </div>
  );
};
