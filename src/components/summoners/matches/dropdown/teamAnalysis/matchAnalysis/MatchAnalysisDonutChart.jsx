import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

/**
 * Component to display a pie chart for match analysis.
 * @param {Object} props - Props passed to the component.
 * @param {number} props.blueTeamData - Data for the Blue team.
 * @param {number} props.redTeamData - Data for the Red team.
 * @returns {JSX.Element} - MatchAnalysisChart component JSX.
 */
export const MatchAnalysisDonutChart = ({ blueTeamData, redTeamData }) => {
  // Prepare data for the pie chart
  const data = [
    { name: "Blue side", value: blueTeamData },
    { name: "Red side", value: redTeamData },
  ];

  // Define colors for the pie chart
  const COLORS = ["#60A5FA", "#F87171"];

  return (
    <div className="w-1/3 max-md:hidden">
      {/* ResponsiveContainer to make the chart responsive */}
      <ResponsiveContainer width="100%" height="100%">
        {/* PieChart component */}
        <PieChart>
          {/* Pie component */}
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
            {/* Customizing each pie slice */}
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {/* Tooltip for displaying information */}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
