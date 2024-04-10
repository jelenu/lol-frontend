import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export const MatchAnalysisChart = ({ blueTeamData, redTeamData }) => {
  const data = [
    { name: "Blue side", value: blueTeamData },
    { name: "Red side", value: redTeamData },
  ];

  const COLORS = ["#60A5FA", "#F87171"];

 

  return (
    <div className="w-1/3">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={60}
            startAngle={90}
            endAngle={450}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
