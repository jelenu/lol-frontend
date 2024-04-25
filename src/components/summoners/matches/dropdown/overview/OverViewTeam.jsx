import React from "react";
import { useSummonerContext } from "../../../../../context/SummonerContext";

export const OverViewTeam = ({ participants, team }) => {
  const { summonerId } = useSummonerContext();
  const result = team.win;


  return (
    <div className="flex justify-center">
      <table className="w-full  text-xs">
        <thead>
          <tr
            className={`uppercase text-sm leading-normal ${
              result ? "bg-blue-400 text-blue-700" : "bg-red-400 text-red-700"
            }`}
          >
            <th className="py-2  text-center">
              {result ? "Victory" : "Defeat"}
            </th>
            <th className="py-2  text-center">KDA</th>
            <th className="py-2  text-center">Damage</th>
            <th className="py-2  text-center">Wards</th>
            <th className="py-2  text-center">CS</th>
            <th className="py-2  text-center">Build</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr
              key={index}
              className={`text-gray-600 text-center ${
                result
                  ? `${
                    summonerId === participant.summonerId ? "bg-blue-300" : "text-blue-600 bg-blue-200"
                  }  `
                  : `${
                    summonerId === participant.summonerId ? "bg-red-300" : "text-red-600 bg-red-200"
                  }`
              }  
               `}
            >
              {/* Summoner */}
              <td>
                <div key={index} className="flex items-center my-0.5 mr-3 ml-7 ">
                  <img
                    src={`http://192.168.1.133:8000/static/champion/icon/${participant.championName}.png`}
                    alt={participant.championName}
                    className="h-9 rounded-full mr-2"
                  />
                  <div className="flex flex-col">
                    {[1, 2].map((spellSlot) => (
                      <img
                        key={spellSlot}
                        src={`http://192.168.1.133:8000/static/summonerSpell/${
                          participant[`summoner${spellSlot}Id`]
                        }.png`}
                        alt={`Summoner Spell ${spellSlot}`}
                        className="h-4 rounded-md mb-1 mr-1"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col items-center ">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/img/${participant.perks.styles[0].selections[0].icon}`}
                      alt={`Primary Rune`}
                      className=" h-5 "
                    />
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/img/${participant.perks.styles[1].selections[0].rune_path.icon}`}
                      alt={`Primary Rune`}
                      className=" h-4 w-4 mb-1"
                    />
                  </div>
                  <div className="ml-3">{participant.riotIdGameName}</div>
                </div>
              </td>
              {/* KDA */}
              <td>
                <div className="mx-3">
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
              {/*DAMAGE*/}
              <td>
                <div className="mx-3">
                  {" "}
                  {participant.totalDamageDealtToChampions}
                </div>
              </td>
              {/*WARDS*/}
              <td>
                <div className="mx-3">{`${participant.detectorWardsPlaced} `}</div>
                <div>
                  {`${participant.wardsPlaced} / ${participant.wardsKilled}`}
                </div>
              </td>
              {/*CS*/}
              <td>
                <div className="mx-3">
                  {participant.totalMinionsKilled +
                    participant.totalEnemyJungleMinionsKilled +
                    participant.totalAllyJungleMinionsKilled}
                </div>
              </td>
              {/*BUILD*/}
              <td>
                <div className="flex items-center mx-3">
                  <div key={index} className="flex items-center">
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
                        className="items h-7 m-0.5 rounded-md"
                      />
                    ))}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
