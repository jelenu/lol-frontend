import React, { useState, useEffect } from "react";
import { useSummonerContext } from "../../../../../context/SummonerContext";

export const Build = ({ match, timeLine }) => {
  const [selectedChampion, setSelectedChampion] = useState(null);
  const { summonerId } = useSummonerContext();

  useEffect(() => {
    const participantIndex = match.participants.findIndex(
      (participant) => participant.summonerId === summonerId
    );
    if (participantIndex !== -1) {
      setSelectedChampion(participantIndex);
    }
    // eslint-disable-next-line
  }, []);

  let skillLevelUpEvents = [];

  if (timeLine && timeLine.info && timeLine.info.frames) {
    timeLine.info.frames.forEach((frame) => {
      const events = frame.events;
      const skillLevelUpEventsInFrame = events.filter(
        (event) => event.type === "SKILL_LEVEL_UP"
      );
      skillLevelUpEventsInFrame.forEach((event) => {
        const { participantId, skillSlot } = event;
        skillLevelUpEvents.push({ participantId, skillSlot });
      });
    });
  }


  const handleSelectedChampion = (index) => {
    setSelectedChampion(index);
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-center ">
        {match.participants.map((participant, index) => (
          <div
            key={index}
            className={`p-2 mx-1 cursor-pointer ${
              selectedChampion === index ? "bg-gray-600" : "bg-gray-400"
            }`}
            onClick={() => handleSelectedChampion(index)}
          >
            <img
              src={`http://192.168.1.133:8000/static/champion/icon/${participant.championName}.png`}
              alt={participant.championName}
              className="w-9"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {skillLevelUpEvents
          .filter((levelUp) => levelUp.participantId -1 === selectedChampion)
          .map((levelUp, index) => (
            <div key={index} className="mx-1">
              {levelUp.skillSlot}
            </div>
          ))}
      </div>
    </div>
  );
};
