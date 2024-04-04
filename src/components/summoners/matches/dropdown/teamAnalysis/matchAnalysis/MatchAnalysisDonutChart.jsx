import React from 'react'
import { AgChartsReact } from "ag-charts-react";

export const MatchAnalysisChart = ({blueTeamData, redTeamData}) => {
  return (
    <div className="w-1/3 h-36 -mt-2 ">
      <AgChartsReact
        options={{
          data: [
            { asset: "Red side", amount: redTeamData },

            { asset: "Blue side", amount: blueTeamData },
          ],
          series: [
            {
              type: "donut",
              angleKey: "amount",
              innerRadiusRatio: 0.7,
              rotation: 360,
              fills:[
                 "#F87171", "#60A5FA"

              ],
              innerLabels: [
                {
                  text: blueTeamData.toString(),
                  margin: 8,
                  color: "#60a5fa",
                  fontWeight: "bold",

                },
                {
                  text: redTeamData.toString(),
                  margin: 8,
                  color: "#f87171",
                  fontWeight: "bold",


                },
              ],
              tooltip: {
              enabled: false
              },
              
            },
          ],
        }}
      />
    </div>
  )
}
