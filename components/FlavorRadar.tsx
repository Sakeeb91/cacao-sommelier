import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

const data: ChartDataPoint[] = [
  { subject: 'Nutty', A: 120, fullMark: 150 },
  { subject: 'Floral', A: 98, fullMark: 150 },
  { subject: 'Earthy', A: 86, fullMark: 150 },
  { subject: 'Fruity', A: 99, fullMark: 150 },
  { subject: 'Spicy', A: 85, fullMark: 150 },
  { subject: 'Sweet', A: 65, fullMark: 150 },
];

const FlavorRadar: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#eaddd7" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#5d4037', fontSize: 10, fontFamily: 'Manrope' }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
          <Radar
            name="Flavor"
            dataKey="A"
            stroke="#d4af37"
            strokeWidth={2}
            fill="#d4af37"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
      <p className="text-center text-xs text-cocoa-900/40 font-medium uppercase tracking-widest mt-[-10px]">
        Flavor Complex
      </p>
    </div>
  );
};

export default FlavorRadar;