import React from 'react'

export const OverView = ({match}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Vicotria</th>
            <th>KDA</th>
            <th>Damage</th>
            <th>Wards</th>
            <th>CS</th>
            <th>Build</th>


          </tr>
        </thead>
        <tbody>
          {match.participants.slice(0, 5).map((participant, index) => (
            <tr key={index}>
              <td>{participant.name}</td>
              <td>{`${participant.kills} / ${participant.deaths} / ${participant.assists}`}</td>
              <td>{participant.totalDamageDealtToChampions}</td>
              <td>{`${participant.detectorWardsPlaced} / ${participant.wardsPlaced} / ${participant.wardsKilled}`}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <table>
        <thead>
          <tr>
            <th>Vicotria</th>
            <th>KDA</th>
            <th>Damage</th>
            <th>Wards</th>
            <th>CS</th>
            <th>Build</th>


          </tr>
        </thead>
        <tbody>
          {match.participants.slice(5, 10).map((participant, index) => (
            <tr key={index}>
              <td>{participant.name}</td>
              <td>{`${participant.kills} / ${participant.deaths} / ${participant.assists}`}</td>
              <td>{participant.totalDamageDealtToChampions}</td>
              <td>{`${participant.detectorWardsPlaced} / ${participant.wardsPlaced} / ${participant.wardsKilled}`}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
