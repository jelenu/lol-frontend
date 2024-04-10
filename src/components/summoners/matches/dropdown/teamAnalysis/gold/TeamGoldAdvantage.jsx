import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const TeamGoldAdvantage = ({ calculatePerTeam, calculatePerParticipantAndFrame, xAxisFormatter, yAxisFormatter }) => {
  
  const calculateGoldDiff = (data) => {
    const goldDiff = data.map((entry, index) => ({
      frame: entry.frame,
      diff: entry.blueTeam - entry.redTeam,
    }));
    return goldDiff;
  }

  const originalData = calculatePerTeam(calculatePerParticipantAndFrame('totalGold'));
  const goldDiff = calculateGoldDiff(originalData);

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
        <AreaChart
          data={goldDiff}
          margin={{ right: 20 }}

        >
        <CartesianGrid vertical={false}/>
        <XAxis dataKey="frame" interval={1} tickFormatter={xAxisFormatter} />
        <YAxis tickFormatter={yAxisFormatter} />
        <Tooltip content={<CustomTooltip />}  />
          <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={gradientOffset()} stopColor="#60A5FA" stopOpacity={1} />
              <stop offset={gradientOffset()} stopColor="#F87171" stopOpacity={1} />
            </linearGradient>
          </defs>
            
          <Area type="monotone" dataKey="diff" stroke="none" fill="url(#splitColor)" />
        </AreaChart>
      </ResponsiveContainer>
      
    </div>
  );
};
