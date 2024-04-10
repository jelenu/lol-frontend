import React from "react";
import baron100 from "../../../../../../assets/objectives/baron-100.png";
import baron200 from "../../../../../../assets/objectives/baron-200.png";
import dragon100 from "../../../../../../assets/objectives/dragon-100.png";
import dragon200 from "../../../../../../assets/objectives/dragon-200.png";
import herald100 from "../../../../../../assets/objectives/herald-100.png";
import herald200 from "../../../../../../assets/objectives/herald-200.png";
import inhibitor100 from "../../../../../../assets/objectives/inhibitor-100.png";
import inhibitor200 from "../../../../../../assets/objectives/inhibitor-200.png";
import tower100 from "../../../../../../assets/objectives/tower-100.png";
import tower200 from "../../../../../../assets/objectives/tower-200.png";
import vilemaw100 from "../../../../../../assets/objectives/vilemaw-100.png";
import vilemaw200 from "../../../../../../assets/objectives/vilemaw-200.png";

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

  const objectives = {
    HORDE: [vilemaw100, vilemaw200],
    RIFTHERALD: [herald100, herald200],
    DRAGON: [dragon100, dragon200],
    BARON_NASHOR: [baron100, baron200],
    INHIBITOR_BUILDING: [inhibitor100, inhibitor200],
    TOWER_BUILDING: [tower100, tower200],
  };

  const renderEvent = (event) => {
    switch (event.type) {
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
                    src={`http://localhost:8000/static/champion/icon/${
                      match.participants[event.creatorId - 1].championName
                    }.png`}
                    className="h-7 mr-2 rounded"
                  />
                  <div className="mr-2">
                    {match.participants[event.creatorId - 1].riotIdGameName} #
                    {match.participants[event.creatorId - 1].riotIdTagline}
                  </div>
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
      case "CHAMPION_KILL":
        const killer = match.participants[event.killerId - 1];
        const victim = match.participants[event.victimId - 1];
        return (
          <div className="flex w-full">
            <div className="w-1/12 p-2">
              {millisecondsToMinutes(event.timestamp)} min{" "}
            </div>

            <div
              className={`flex w-11/12 p-2  my-0.5 ${
                killer
                  ? event.killerId - 1 >= 5
                    ? "bg-red-300"
                    : "bg-blue-300"
                  : victim >= 5
                  ? "bg-blue-300"
                  : "bg-red-300"
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
                    ? `${killer.riotIdGameName} #${killer.riotIdTagline}`
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

      case "ELITE_MONSTER_KILL":
        return (
          <div className="flex w-full">
            <div className="w-1/12 p-2">
              {millisecondsToMinutes(event.timestamp)} min{" "}
            </div>

            <div
              className={`flex w-11/12 p-2  my-0.5 ${
                event.killerId - 1 >= 5 ? "bg-red-300" : "bg-blue-300"
              }`}
            >
              <div className="w-1/2 flex">
                <img
                  alt="killer"
                  src={`http://localhost:8000/static/champion/icon/${
                    match.participants[event.killerId - 1].championName
                  }.png`}
                  className="h-7 mr-2 rounded"
                />
                <div className="mr-2">
                  {match.participants[event.killerId - 1].riotIdGameName} #
                  {match.participants[event.killerId - 1].riotIdTagline}
                </div>
              </div>
              <div className="w-1/2 justify-end flex">
                <div>Killed</div>
                <img
                  alt="objective"
                  src={`${
                    objectives[event.monsterType][
                      event.killerId - 1 >= 5 ? 1 : 0
                    ]
                  }`}
                  className="h-7 ml-2"
                />
              </div>
            </div>
          </div>
        );
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
                  src={`http://localhost:8000/static/champion/icon/${
                    match.participants[event.killerId - 1].championName
                  }.png`}
                  className="h-7 mr-2 rounded"
                />
                <div className="mr-2">
                  {match.participants[event.killerId - 1].riotIdGameName} #
                  {match.participants[event.killerId - 1].riotIdTagline}
                </div>
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

      case "BUILDING_KILL":
        return (
          <div className="flex w-full">
            <div className="w-1/12 p-2">
              {millisecondsToMinutes(event.timestamp)} min{" "}
            </div>

            <div
              className={`flex w-11/12 p-2  my-0.5 ${
                event.killerId - 1 >= 5 ? "bg-red-300" : "bg-blue-300"
              }`}
            >
              {console.log(event)}
              <div className="w-1/2 flex">
                <img
                  alt="killer"
                  src={
                    event.killerId === 0
                      ? event.killerId <= 4
                        ? "http://localhost:8000/static/champion/icon/RedMinion.png"
                        : "http://localhost:8000/static/champion/icon/BlueMinion.png"
                      : `http://localhost:8000/static/champion/icon/${
                          match.participants[event.killerId - 1].championName
                        }.png`
                  }
                  className="h-7 mr-2 rounded"
                />
                <div className="mr-2">
                  {event.killerId === 0
                    ? event.killerId <= 4
                      ? "Red Minion"
                      : "Blue Minion"
                    : `${
                        match.participants[event.killerId - 1].riotIdGameName
                      } #${
                        match.participants[event.killerId - 1].riotIdTagline
                      }`}
                </div>
              </div>
              <div className="w-1/2 justify-end flex">
                <div>Killed</div>
                <img
                  alt="objective"
                  src={`${
                    objectives[event.buildingType][
                      event.killerId - 1 >= 5 ? 1 : 0
                    ]
                  }`}
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
