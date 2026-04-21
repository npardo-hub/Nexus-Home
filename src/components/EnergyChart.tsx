import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useHomeStore } from '../store';

export default function EnergyChart() {
  const { history, mode } = useHomeStore();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={history}>
        <defs>
          <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis 
          dataKey="time" 
          hide 
        />
        <YAxis 
          hide 
          domain={['dataMin - 10', 'dataMax + 10']}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#0a0a0c', 
            border: '1px solid #1a1a1f',
            borderRadius: '8px',
            fontSize: '10px',
            fontFamily: 'monospace'
          }}
          itemStyle={{ color: '#fff' }}
          labelStyle={{ display: 'none' }}
        />
        <Area 
          type="monotone" 
          dataKey="consumption" 
          stroke="#f97316" 
          strokeWidth={2}
          fillOpacity={1} 
          fill="url(#colorCons)" 
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

