import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Component to display team gold advantage over time using an area chart.
 * @param {Function} calculatePerTeam - Function to calculate gold per team.
 * @param {Function} calculatePerParticipantAndFrame - Function to calculate gold per participant and per frame.
 * @param {Function} xAxisFormatter - Function to format X-axis labels.
 * @param {Function} yAxisFormatter - Function to format Y-axis labels.
 * @returns {JSX.Element} - TeamGoldAdvantage component JSX.
 */
export const TeamGoldAdvantage = ({ calculatePerTeam, calculatePerParticipantAndFrame, xAxisFormatter, yAxisFormatter }) => {
  // Function to calculate gold difference between teams
  const calculateGoldDiff = (data) => {
    const goldDiff = data.map((entry, index) => ({
      frame: entry.frame,
      diff: entry.blueTeam - entry.redTeam,
    }));
    return goldDiff;
  };

  // Original data of gold per team
  const originalData = calculatePerTeam(calculatePerParticipantAndFrame('totalGold'));
  // Calculate gold difference between teams
  const goldDiff = calculateGoldDiff(originalData);

  // Function to calculate gradient offset
  const gradientOffset = () => {
    const dataMax = Math.max(...goldDiff.map((i) => i.diff));
    const dataMin = Math.min(...goldDiff.map((i) => i.diff));
  
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
  
    return dataMax / (dataMax - dataMin);
  };

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = Math.abs(payload[0].value);
  
      let teamLabel = '';
      if (payload[0].value >= 0) {
        teamLabel = 'BlueTeam';
      } else {
        teamLabel = 'RedTeam';
      }
  
      return (
        <div className="bg-white p-2 rounded-sm">
          <p>{`${teamLabel}`}</p>
          <p>{` Gold Difference: ${value}`}</p>
        </div>
      );
    }
  };

  return (
    <div className='text-xs'>
      <ResponsiveContainer width="100%" height={430}>
        {/* Area chart */}
        <AreaChart
          data={goldDiff}
          margin={{ right: 20 }}
        >
          <CartesianGrid vertical={false} />
          {/* X-axis */}
          <XAxis dataKey="frame" interval={1} tickFormatter={xAxisFormatter} />
          {/* Y-axis */}
          <YAxis tickFormatter={yAxisFormatter} />
          <Tooltip content={<CustomTooltip />} />
          {/* Gradient for area chart */}
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={gradientOffset()} stopColor="#60A5FA" stopOpacity={1} />
              <stop offset={gradientOffset()} stopColor="#F87171" stopOpacity={1} />
            </linearGradient>
          </defs>
          {/* Area chart */}
          <Area type="monotone" dataKey="diff" stroke="none" fill="url(#splitColor)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
