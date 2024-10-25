// features/solar/solarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  investments: [],
  analytics: {
    totalInvestment: 0,
    totalEnergy: 0,
    totalSavings: 0,
    carbonOffset: 0
  },
  loading: false,
  error: null
};

const solarSlice = createSlice({
  name: 'solar',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setInvestments: (state, action) => {
      state.investments = action.payload;
    },
    setAnalytics: (state, action) => {
      state.analytics = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setProjects, 
  setInvestments, 
  setAnalytics, 
  setLoading, 
  setError 
} = solarSlice