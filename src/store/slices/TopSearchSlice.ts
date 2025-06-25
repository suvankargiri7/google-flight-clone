import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTodayDate } from "../../helpers/function";
interface AirportOption {
  label: string;
  value: string;
  code: string;
  city: string;
  country: string;
  entityid: string;
}

interface tripClassOption {
  label: string;
  value: string;
}

interface tripType {
  label: string;
  value: string;
}

interface State {
  originAirport: AirportOption | null;
  destinationAirport: AirportOption | null;
  departureDate: string | null;
  returnDate?: string | null;
  tripType: tripType | null;
  tripClass: tripClassOption | null;
}

const initialState: State = {
  originAirport: null,
  destinationAirport: null,
  departureDate: getTodayDate(),
  returnDate: null,
  tripClass: {label: "Economy", value: "economy"},
  tripType: {label: "Oneway", value: "oneway"},
};

const TopSearchSlice = createSlice({
  name: "topsearch",
  initialState,
  reducers: {
    setTripClass: (state, action: PayloadAction<tripClassOption>) => {
      state.tripClass = action.payload;
    },
    resetTripClass: (state) => {
      state.tripClass = null;
    },
    setTripType: (state, action: PayloadAction<tripType>) => {
      state.tripType = action.payload;
    },
    resetTripType: (state) => {
      state.tripType = null;
    },
    setDepartureDate: (state, action: PayloadAction<string>) => {
      state.departureDate = action.payload;
    },
    resetDepartureDate: (state) => {
      state.departureDate = null;
    },
    setReturnDate: (state, action: PayloadAction<string>) => {
      state.returnDate = action.payload;
    },
    resetReturnDate: (state) => {
      state.returnDate = null;
    },
    setOriginAirport: (state, action: PayloadAction<AirportOption>) => {
      state.originAirport = action.payload;
    },
    resetOriginAirport: (state) => {
      state.originAirport = null;
    },
    setDestinationAirport: (state, action: PayloadAction<AirportOption>) => {
      state.destinationAirport = action.payload;
    },
    resetDestinationAirport: (state) => {
      state.destinationAirport = null;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setDepartureDate,
  setDestinationAirport,
  setOriginAirport,
  setReturnDate,
  setTripClass,
  setTripType,
  resetDepartureDate,
  resetDestinationAirport,
  resetOriginAirport,
  resetReturnDate,
  resetTripClass,
  resetTripType,
} = TopSearchSlice.actions;

export default TopSearchSlice;
