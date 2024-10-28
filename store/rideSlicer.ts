import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export interface CounterState {
    id: string,
    userId: string,
    driverId: string,
    pickupLocation: {
        latitude: Float, 
        longitude: Float, 
        },
    destination: {
      latitude: Float, 
      longitude: Float, 
      },
    status : string,
    pickupTime: string,
    timestamp: string,
}

const initialState: CounterState = {
  id: '',
  userId: '',
  driverId: '',
  pickupLocation: {
    latitude: 0,
    longitude: 0, 
    },
  destination: {
    latitude: 0,
    longitude: 0, 
    },
  status : '',
  pickupTime: '',
  timestamp: '',
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    acceptRide: (state, action: PayloadAction<{ 
        id: string; userId: string; driverId: string; latpick: Float; longpick: Float; latdest: Float; longdest: Float;
        status: string;pickupTime: string;timestamp: string;
    }>) => {
      state.id = action.payload.id
      state.userId = action.payload.userId
      state.driverId = action.payload.driverId
      state.pickupLocation.latitude = action.payload.latpick
      state.pickupLocation.longitude = action.payload.longpick
      state.destination.latitude = action.payload.latdest
      state.destination.longitude = action.payload.longdest
      state.status = action.payload.status
      state.pickupTime = action.payload.pickupTime
      state.timestamp = action.payload.timestamp
    },
  },
})

// Action creators are generated for each case reducer function
export const { acceptRide } = counterSlice.actions

export default counterSlice.reducer