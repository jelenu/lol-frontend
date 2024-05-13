import React, { useState, useEffect } from "react";
import { useSummonerContext } from "../../../../../context/SummonerContext";

export const Build = ({ match, timeLine }) => {
  const [selectedChampion, setSelectedChampion] = useState(null);
  const { summonerId } = useSummonerContext();

  const skillSlots = [
    { slot: 1, skill: "Q", color: "blue" },
    { slot: 2, skill: "W", color: "emerald" },
    { slot: 3, skill: "E", color: "orange" },
    { slot: 4, skill: "R", color: "red" },
  ];

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

  let itemPurchasedEvents = [];

  if (timeLine && timeLine.info && timeLine.info.frames) {
    timeLine.info.frames.forEach((frame) => {
      const events = frame.events;
      const itemEventsInFrame = events.filter(
        (event) =>
          event.type === "ITEM_PURCHASED" &&
          event.participantId === selectedChampion + 1
      );
      itemPurchasedEvents.push(itemEventsInFrame);
    });
  }

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
      <div className="mt-4">
        <div>
          <span> Build</span>
        </div>
        <div className=" flex flex-wrap">
          {itemPurchasedEvents.map(
            (frame, index) =>
              frame.length > 0 && (
                <div key={index} className=" mx-2">
                  <div  className="flex">
                    {frame.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-gray-200 p-2">
                        <img
                          src={`http://192.168.1.133:8000/static/item/${item.itemId}.png`}
                          alt={`${item.itemId}`}
                          className=" h-10"
                        />
                      </div>
                    ))}
                  </div>
                  <p> min {index}</p>
                </div>
              )
          )}
        </div>
      </div>

      <div className="mt-4">
        <div>
          <span> Skill Order</span>
        </div>
        <div className="flex">
          {skillLevelUpEvents
            .filter((levelUp) => levelUp.participantId - 1 === selectedChampion)
            .map((levelUp, index) => {
              const skill = skillSlots.find(
                (slot) => slot.slot === levelUp.skillSlot
              );
              return (
                <div
                  key={index}
                  className={`mx-1 h-7 w-7 bg-${skill.color}-500 rounded-md flex items-center justify-center`}
                >
                  <span className="">{skill.skill}</span>
                </div>
              );
            })}
        </div>
      </div>
      <div className="mt-4">
        <div>
          <span>Runes</span>
        </div>
        {selectedChampion !== null && (
          <div>
            <div className="flex items-center">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/${match.participants[selectedChampion].perks.styles[0].selections[0].icon}`}
                alt={`Primary Rune`}
                className=" h-12"
              />
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/${match.participants[selectedChampion].perks.styles[0].selections[1].icon}`}
                alt={`Primary Rune`}
                className=" h-7 "
              />
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/${match.participants[selectedChampion].perks.styles[0].selections[2].icon}`}
                alt={`Primary Rune`}
                className=" h-7 "
              />
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/${match.participants[selectedChampion].perks.styles[0].selections[3].icon}`}
                alt={`Primary Rune`}
                className=" h-7 "
              />
            </div>

            <div className="flex items-center">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/${match.participants[selectedChampion].perks.styles[1].selections[0].rune_path.icon}`}
                alt={`Secondary Rune`}
                className=" h-8 mb-1"
              />
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/${match.participants[selectedChampion].perks.styles[1].selections[0].icon}`}
                alt={`Primary Rune`}
                className=" h-7 "
              />
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/${match.participants[selectedChampion].perks.styles[1].selections[1].icon}`}
                alt={`Primary Rune`}
                className=" h-7 "
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
