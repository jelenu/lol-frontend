import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const TeamGold = ({ totalGoldPerFrame, xAxisFormatter, yAxisFormatter }) => {

  

  return (
  <div className='text-xs'>
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={totalGoldPerFrame}
        margin={{ right: 20 }}
      >
        <CartesianGrid vertical={false}/>
        <XAxis dataKey="frame" interval={1} tickFormatter={xAxisFormatter} />
        <YAxis tickFormatter={yAxisFormatter} />
        <Tooltip />
        <Line type="monotone" dot={false} dataKey="blueTeam" stroke="#60A5FA" name="Blue Team" strokeWidth={3}/>
        <Line type="monotone" dot={false} dataKey="redTeam" stroke="#F87171" name="Red Team" strokeWidth={3}/>
      </LineChart>
    </ResponsiveContainer>
  </div>
    
  );
};
