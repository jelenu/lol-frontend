import React, { useState, useEffect } from "react";
import { useSummonerContext } from "../../../../../context/SummonerContext";

/**
 * Component to display the build information of a selected champion.
 * @param {Object} match - Match object containing match details.
 * @param {Object} timeLine - Timeline object containing match timeline data.
 * @returns {JSX.Element} - Build component JSX.
 */
export const Build = ({ match, timeLine }) => {
  // State to track the selected champion
  const [selectedChampion, setSelectedChampion] = useState(null);
  // Accessing summonerId from context
  const { summonerId } = useSummonerContext();

  // Array containing skill slots information
  const skillSlots = [
    { slot: 1, skill: "Q", color: "blue" },
    { slot: 2, skill: "W", color: "emerald" },
    { slot: 3, skill: "E", color: "orange" },
    { slot: 4, skill: "R", color: "red" },
  ];

  // Effect hook to set the selected champion when the component mounts
  useEffect(() => {
    // Finding the index of the participant that matches the summonerId
    const participantIndex = match.participants.findIndex(
      (participant) => participant.summonerId === summonerId
    );
    // Setting the selected champion if found
    if (participantIndex !== -1) {
      setSelectedChampion(participantIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Array to store skill level up events
  let skillLevelUpEvents = [];

  // Populating skillLevelUpEvents array if timeLine data is available
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

  // Function to handle click on a champion avatar
  const handleSelectedChampion = (index) => {
    setSelectedChampion(index);
  };

  // Array to store item purchased events
  let itemPurchasedEvents = [];

  // Populating itemPurchasedEvents array if timeLine data is available
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
    <div className="bg-white p-4 max-md:p-1 rounded-md">
      <div className="flex justify-center ">
        {/* Render champion avatars */}
        {match.participants.map((participant, index) => (
          <div
            key={index}
            className={`p-2 max-md:p-1 mx-1 cursor-pointer ${
              selectedChampion === index ? "bg-gray-600" : "bg-gray-400"
            }`}
            onClick={() => handleSelectedChampion(index)}
          >
            <img
              src={`http://127.0.0.1:8000/static/champion/icon/${participant.championName}.png`}
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
          {/* Render item build */}
          {itemPurchasedEvents.map(
            (frame, index) =>
              frame.length > 0 && (
                <div key={index} className=" m-2">
                  <div className="flex">
                    {frame.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="bg-gray-200 p-2 max-md:p-1"
                      >
                        <img
                          src={`http://127.0.0.1:8000/static/item/${item.itemId}.png`}
                          alt={`${item.itemId}`}
                          className=" h-10 max-lg:h-9 max-md:h-7 max-sm:h-6"
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
          {/* Render skill order */}
          {skillLevelUpEvents
            .filter((levelUp) => levelUp.participantId - 1 === selectedChampion)
            .map((levelUp, index) => {
              const skill = skillSlots.find(
                (slot) => slot.slot === levelUp.skillSlot
              );
              return (
                <div
                  key={index}
                  className={`mx-1 h-7 w-7 max-md:h-5 max-md:w-5 max-sm:h-4  max-sm:w-4 max-sm:text-xs bg-${skill.color}-500 rounded-md flex items-center justify-center`}
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
        {/* Render runes */}
        {selectedChampion !== null && (
          <div>
            <div className="flex items-center">
              <img
                src={`http://127.0.0.1:8000/static/perks/${match.participants[
                  selectedChampion
                ].perks.styles[0].selections[0].icon
                  .split("/")
                  .pop()}`}
                alt={`Primary Rune`}
                className=" h-12"
              />
              <img
                src={`http://127.0.0.1:8000/static/perks/${match.participants[
                  selectedChampion
                ].perks.styles[0].selections[1].icon
                  .split("/")
                  .pop()}`}
                alt={`Primary Rune`}
                className=" h-7 "
              />
              <img
                src={`http://127.0.0.1:8000/static/perks/${match.participants[
                  selectedChampion
                ].perks.styles[0].selections[2].icon
                  .split("/")
                  .pop()}`}
                alt={`Primary Rune`}
                className=" h-7 "
              />
              <img
                src={`http://127.0.0.1:8000/static/perks/${match.participants[
                  selectedChampion
                ].perks.styles[0].selections[3].icon
                  .split("/")
                  .pop()}`}
                alt={`Primary Rune`}
                className=" h-7 "
              />
            </div>

            <div className="flex items-center">
              <img
                src={`http://127.0.0.1:8000/static/perks/${match.participants[
                  selectedChampion
                ].perks.styles[1].selections[0].rune_path.icon
                  .split("/")
                  .pop()}`}
                alt={`Secondary Rune`}
                className=" h-8 mb-1"
              />
              <img
                src={`http://127.0.0.1:8000/static/perks/${match.participants[
                  selectedChampion
                ].perks.styles[1].selections[0].icon
                  .split("/")
                  .pop()}`}
                alt={`Primary Rune`}
                className=" h-7 "
              />
              <img
                src={`http://127.0.0.1:8000/static/perks/${match.participants[
                  selectedChampion
                ].perks.styles[1].selections[1].icon
                  .split("/")
                  .pop()}`}
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
