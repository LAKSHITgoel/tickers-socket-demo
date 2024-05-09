import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import {io} from 'socket.io-client';
import axios from 'axios';

import {setTickerNameList, setCurrentTicker, setTickersData, initializeTickerData} from 'global/globalSlice';
import { Ticker } from 'types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useHandleIncomingMessage = () => {
  const dispatch = useDispatch();
  const [allowScocketConnection, setAllowScocketConnection] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setCurrentTicker("HDFC"))
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('http://localhost:8080/ticker-data');
        const data = await result.data;
        dispatch(initializeTickerData(data));
      } catch (e) {
        console.error('error', e);
      }
      setAllowScocketConnection(true);
    })();
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:8080');
    if (allowScocketConnection) {
      socket.on("connect", () => {
        console.log('Connect to server');
      });
      
      socket.on('stock_channel', (message: string) => {
        const parsedMassage: Ticker = JSON.parse(message);
        dispatch(setTickerNameList(parsedMassage?.symbol));      
        dispatch(setTickersData(parsedMassage));
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [allowScocketConnection]);
  
};

export default useHandleIncomingMessage;
