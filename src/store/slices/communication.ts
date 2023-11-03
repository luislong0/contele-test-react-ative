import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocationData } from "../../app/(tabs)";


export interface CommunicationState {
  storedLocations: LocationData[];
  currentCommunicationIntervalNumber: number;
  currentInterval: number;
}

const initialState: CommunicationState = {
  storedLocations: [],
  currentCommunicationIntervalNumber: 0,
  currentInterval: 10000,
};

export const CommunicationSlice = createSlice({
  name: "communication",
  initialState: initialState,
  reducers: {
    save: (state, action: PayloadAction<number[]>) => {
      state.currentCommunicationIntervalNumber = action.payload[0];
      state.currentInterval = action.payload[1];
    },

    storeLocation: (state, action: PayloadAction<LocationData>) => {
      state.storedLocations = [...state.storedLocations, action.payload];
    },

    clearStoreLocation: (state) => {
      state.storedLocations = []
    },
  },
});

export const communication = CommunicationSlice.reducer;
export const { save, clearStoreLocation, storeLocation } = CommunicationSlice.actions;