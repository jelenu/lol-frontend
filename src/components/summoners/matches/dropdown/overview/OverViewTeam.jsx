import React from "react";
import { useSummonerContext } from "../../../../../context/SummonerContext";

/**
 * Component to display overview of a team including player information, KDA, damage, wards, CS, and build.
 * @param {Object[]} participants - Array of participants in the team.
 * @param {Object} team - Team object containing team details.
 * @returns {JSX.Element} - OverViewTeam component JSX.
 */
export const OverViewTeam = ({ participants, team }) => {
  // Get summonerId from context
  const { summonerId } = useSummonerContext();
  // Determine the result of the team (win or lose)
  const result = team.win;

  return (
    <div className="flex justify-center">
      {/* Table to display team overview */}
      <table className="w-full text-xs">
        <thead className="">
          {/* Table header */}
          <tr
            className={`uppercase text-sm max-md:text-xs leading-normal ${
              result ? "bg-blue-400 text-blue-700" : "bg-red-400 text-red-700"
            }`}
          >
            <th className="text-center">{result ? "Victory" : "Defeat"}</th>
            <th className="p-2 text-center max-sm:hidden">KDA</th>
            <th className="p-2 text-center  max-sm:hidden">Damage</th>
            <th className="p-2 text-center max-sm:hidden">Wards</th>
            <th className="p-2 text-center">CS</th>
            <th className="p-2 text-center">Build</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over participants to display individual player information */}
          {participants.map((participant, index) => (
            <tr
              key={index}
              className={`text-gray-600 text-center ${
                result
                  ? `${
                      summonerId === participant.summonerId
                        ? "bg-blue-300"
                        : "text-blue-600 bg-blue-200"
                    }`
                  : `${
                      summonerId === participant.summonerId
                        ? "bg-red-300"
                        : "text-red-600 bg-red-200"
                    }`
              }`}
            >
              {/* Summoner */}
              <td>
                <div className="flex items-center my-0.5  ml-7 max-lg:ml-4 max-md:ml-1">
                  <img
                    src={`http://192.168.1.133:8000/static/champion/icon/${participant.championName}.png`}
                    alt={participant.championName}
                    className="h-9 rounded-full mr-2 max-md:mr-1 max-sm:h-7 max-sm:mr-0.5"
                  />
                  <div className="flex flex-col">
                    {[1, 2].map((spellSlot) => (
                      <img
                        key={spellSlot}
                        src={`http://192.168.1.133:8000/static/summonerSpell/${
                          participant[`summoner${spellSlot}Id`]
                        }.png`}
                        alt={`Summoner Spell ${spellSlot}`}
                        className="h-4 rounded-md mb-1 mr-1 max-md:mr-0"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/img/${participant.perks.styles[0].selections[0].icon}`}
                      alt={`Primary Rune`}
                      className="h-5"
                    />
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/img/${participant.perks.styles[1].selections[0].rune_path.icon}`}
                      alt={`Primary Rune`}
                      className="h-4 w-4 mb-1"
                    />
                  </div>
                  <div className="ml-3 max-md:ml-1 truncate">
                    {participant.riotIdGameName}
                    {/* KDA Mobile */}
                <div className="flex justify-center sm:hidden">
                  <div className="mx-3 max-md:mx-1">
                    {`${participant.kills} / ${participant.deaths} / ${
                      participant.assists
                    }`}
                  </div>
                  <div className="font-bold">
                    {`${(
                      (participant.kills + participant.assists) /
                      (participant.deaths === 0 ? 1 : participant.deaths)
                    ).toFixed(2)}/1`}
                  </div>
                </div>
                  </div>
                </div>

                
              </td>
              {/* KDA */}
              <td className="max-sm:hidden">
                <div className="mx-3 max-md:mx-1">
                  {`${participant.kills} / ${participant.deaths} / ${
                    participant.assists
                  } (${Math.round(
                    ((participant.kills + participant.assists) /
                      team.objectives.champion.kills) *
                      100
                  )}%)`}
                </div>
                <div className="font-bold">
                  {`${(
                    (participant.kills + participant.assists) /
                    (participant.deaths === 0 ? 1 : participant.deaths)
                  ).toFixed(2)}/1`}
                </div>
              </td>
              {/* DAMAGE */}
              <td className=" max-sm:hidden">
                <div className="mx-3 max-md:mx-1">
                  {participant.totalDamageDealtToChampions}
                </div>
              </td>
              {/* WARDS */}
              <td className="max-sm:hidden">
                <div className="mx-3 max-md:mx-1">{`${participant.detectorWardsPlaced} `}</div>
                <div>{`${participant.wardsPlaced} / ${participant.wardsKilled}`}</div>
              </td>
              {/* CS */}
              <td>
                <div className="mx-3 max-md:mx-1">
                  {participant.totalMinionsKilled +
                    participant.totalEnemyJungleMinionsKilled +
                    participant.totalAllyJungleMinionsKilled}
                </div>
              </td>
              {/* BUILD */}
              <td>
                <div className="flex items-center justify-center mx-3 max-md:mx-1">
                  {/* Items */}
                  {[0, 1, 2, 3, 4, 5, 6].map((itemSlot) => (
                    <img
                      key={itemSlot}
                      src={
                        participant[`item${itemSlot}`]
                          ? `http://192.168.1.133:8000/static/item/${
                              participant[`item${itemSlot}`]
                            }.png`
                          : "http://192.168.1.133:8000/static/item/noItem.png"
                      }
                      alt={
                        participant[`item${itemSlot}`]
                          ? participant[`item${itemSlot}`]
                          : "noItem"
                      }
                      className="h-7 max-lg:h-6 m-0.5 max-sm:h-5 rounded-md"
                    />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
