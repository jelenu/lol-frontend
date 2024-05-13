import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Component to display team gold over time using a line chart.
 * @param {Function} calculatePerTeam - Function to calculate gold per team.
 * @param {Function} calculatePerParticipantAndFrame - Function to calculate gold per participant and per frame.
 * @param {Function} xAxisFormatter - Function to format X-axis labels.
 * @param {Function} yAxisFormatter - Function to format Y-axis labels.
 * @returns {JSX.Element} - TeamGold component JSX.
 */
export const TeamGold = ({ calculatePerTeam, calculatePerParticipantAndFrame, xAxisFormatter, yAxisFormatter }) => {
  // Log calculated team gold data
  console.log(calculatePerTeam(calculatePerParticipantAndFrame('totalGold')));

  return (
    <div className='text-xs'>
      <ResponsiveContainer width="100%" height={430}>
        {/* Line chart */}
        <LineChart
          data={calculatePerTeam(calculatePerParticipantAndFrame('totalGold'))}
          margin={{ right: 20 }}
        >
          <CartesianGrid vertical={false} />
          {/* X-axis */}
          <XAxis dataKey="frame" interval={1} tickFormatter={xAxisFormatter} />
          {/* Y-axis */}
          <YAxis tickFormatter={yAxisFormatter} />
          <Tooltip />
          {/* Blue team gold line */}
          <Line type="monotone" dot={false} dataKey="blueTeam" stroke="#60A5FA" name="Blue Team" strokeWidth={3} />
          {/* Red team gold line */}
          <Line type="monotone" dot={false} dataKey="redTeam" stroke="#F87171" name="Red Team" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
