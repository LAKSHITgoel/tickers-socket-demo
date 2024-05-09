import { Box } from "@mui/material";
import {useSelector} from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import NavigationBar from 'components/NavigationBar';

import {tickersDataSelector, currentTickerSelector, showQuantitySelector} from 'global/globalSlice';

const Home = () => {
  const tickersData = useSelector(tickersDataSelector);
  const showTradeVolume = useSelector(showQuantitySelector);
  const currentTicker = useSelector(currentTickerSelector);

  return (
    <Box sx={{pt: '5rem', pl: '2rem' }}>
      <NavigationBar />
      <Box>
        <LineChart width={1200} height={600} data={tickersData[currentTicker]}>
          <Line isAnimationActive={false} type="monotone" dataKey={showTradeVolume ? "quantity" : "price"} stroke={showTradeVolume ? "#8884d8" : "#82ca9d"} activeDot={{ r: 8 }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tickFormatter={(timestamp) => (new Date(timestamp * 1000)).toLocaleTimeString()} label={{ value: 'timestamp: (hh:mm:ss)', angle: 0, position: 'bottom' }} />
          <YAxis dataKey={showTradeVolume ? "quantity" : "price"} label={{ value: showTradeVolume ? "quantity" : "price", angle: -90, position: 'insideLeft' }} />
          <Legend stroke={showTradeVolume ? "#8884d8" : "#82ca9d"} align="left" />
          <Tooltip />
        </LineChart>
      </Box>
    </Box>
  );
};

export default Home;
