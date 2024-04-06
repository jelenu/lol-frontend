import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export const MatchAnalysisChart = ({ blueTeamData, redTeamData }) => {
  const data = [
    { name: "Red side", value: redTeamData },
    { name: "Blue side", value: blueTeamData },
  ];

  const COLORS = ["#60A5FA", "#F87171"];

  const renderCustomizedLabel = () => {
    return (
      <React.Fragment>
        <text x={78} y={60} textAnchor="middle" fill={COLORS[0]}>
          {data[0].value}
        </text>
        <text x={78} y={90} textAnchor="middle" fill={COLORS[1]}>
          {data[1].value}
        </text>
      </React.Fragment>
    );
  };

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
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
