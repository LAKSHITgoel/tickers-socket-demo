import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

import {Ticker} from 'types';

type InitiaState = {
  currentTicker: string;
  tickerNameList: string[];
  tickersData: Record<string, Ticker[]>
  showQuantity: boolean
}

const initialState: InitiaState = {
  currentTicker: '',
  tickerNameList: [],
  tickersData: {},
  showQuantity: false
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCurrentTicker: (state, action: PayloadAction<string>) => ({
      ...state,
      currentTicker: action.payload,
    }),
    setTickerNameList: (state, action: PayloadAction<string>) => {
      const tickerList = [...state.tickerNameList];

      if (!tickerList.includes(action.payload)) tickerList.push(action.payload);
      return ({
        ...state,
        tickerNameList: tickerList
      })
    },
    initializeTickerData: (state, action: PayloadAction<Record<string, Ticker[]>>) => ({
      ...state,
      tickersData: action.payload
    }),
    setTickersData: (state, action: PayloadAction<Ticker>) => {
      const tickerData = {...state.tickersData};

      if (tickerData[action.payload.symbol] !== undefined) tickerData[action.payload.symbol] = [...state.tickersData[action.payload.symbol], action.payload];
      else tickerData[action.payload.symbol] = [action.payload];

      return ({
      ...state,
      tickersData: tickerData
    })},
    setShowQuantity: (state, action: PayloadAction<boolean>) => ({
      ...state,
      showQuantity: action.payload
    }),
  }
});

export const currentTickerSelector = (state: RootState) => state.global.currentTicker;
export const tickerNameListSelector = (state: RootState) => state.global.tickerNameList;
export const tickersDataSelector = (state: RootState) => state.global.tickersData;
export const showQuantitySelector = (state: RootState) => state.global.showQuantity;

export const {setCurrentTicker, setTickerNameList, initializeTickerData, setTickersData, setShowQuantity} = globalSlice.actions;
export default globalSlice.reducer;