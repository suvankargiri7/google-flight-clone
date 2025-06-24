/**
 * @summary Component: Top search form
 * @description props: autoSubmit, filters (optional)
 * @method onDestinationChange, onOriginChange, onFlightTypeChange
 *
 */
import React, { useState } from "react";
import styled from "styled-components";
import FilterDropdown, { FilterType } from "../filters";
import Multiselect from "../filters/types/Multiselect";
import SingleSelect from "../filters/types/SingleSelect";
import OriginDropdown from "./OriginDropdown";
import DestinationDropdown from "./DestinationDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setTripClass,
  setTripType,
  setOriginAirport,
  setDestinationAirport,
  setDepartureDate,
  setReturnDate,
} from "../../store/slices/TopSearchSlice";

import { RootState, AppDispatch } from "../../store";

interface TopSearchFormProps {
  autoSubmit: boolean;
  filters?: [];
}

interface TripClassOption {
  label: string;
  value: string;
}

interface TripType {
  label: string;
  value: string;
}

interface AirportOption {
  label: string;
  value: string;
  code: string;
  city: string;
  country: string;
  entityid: string;
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin: 20px;
`;
const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TravelPrePlanContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TravelPlanContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TravelTripTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const tripClassOptions: Array<TripClassOption> = [
  { label: "Economy", value: "economy" },
  { label: "Business", value: "business" },
  { label: "First Class", value: "first" },
  { label: "Premium Economy", value: "premium" },
];

const tripTypeOptions: Array<TripType> = [
  { label: "Oneway", value: "oneway" },
  { label: "Round Trip", value: "roundtrip" },
];

const TopSearchForm: React.FC<TopSearchFormProps> = ({
  autoSubmit,
  filters,
}: TopSearchFormProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const topsearchState = useSelector((state: RootState) => state.topSearch);

  const handleSubmit = () => {
    navigate("/search");
  };

  let todayDate = new Date();

  const handleTripType = (option: TripType) => {
    dispatch(setTripType(option));
  };

  const handleTripClass = (option: TripClassOption) => {
    dispatch(setTripClass(option));
  };

  const handleOriginAirportChange = (option: AirportOption | null) => {
    if (option) dispatch(setOriginAirport(option));
  };

  const handleDestinationAirportChange = (option: AirportOption | null) => {
    if (option) dispatch(setDestinationAirport(option));
  };

  const handleDepartureDateChange = (date: Date | null) => {
    if (date) dispatch(setDepartureDate(date.toLocaleDateString("en-US")));
  };

  const handleReturnDateChange = (date: Date | null) => {
    if (date) dispatch(setReturnDate(date.toLocaleDateString("en-US")));
  };

  return (
    <FormContainer>
      <h1>TopSearchForm</h1>
      <Form>
        <TravelPrePlanContainer>
          <TravelTripTypeContainer>
            {/** trip type */}
            <SingleSelect
              options={tripTypeOptions}
              selected={topsearchState.tripType}
              onChange={handleTripType}
              placeholder="Select trip type"
            />
          </TravelTripTypeContainer>

          {/** class */}
          <SingleSelect
            options={tripClassOptions}
            selected={topsearchState.tripClass}
            onChange={handleTripClass}
            placeholder="Select class(es)"
          />
        </TravelPrePlanContainer>
        <TravelPlanContainer>
          <OriginDropdown
            onChange={handleOriginAirportChange}
            value={topsearchState.originAirport}
          />
          <DestinationDropdown
            onChange={handleDestinationAirportChange}
            value={topsearchState.destinationAirport}
          />
          <DatePicker
            selected={
              topsearchState.departureDate
                ? new Date(topsearchState.departureDate)
                : null
            }
            onChange={(date) => handleDepartureDateChange(date)}
          />
          {topsearchState.tripType?.value !== "oneway" && (
            <DatePicker
              selected={
                topsearchState.returnDate
                  ? new Date(topsearchState.returnDate)
                  : null
              }
              onChange={(date) => handleReturnDateChange(date)}
            />
          )}
        </TravelPlanContainer>
        {/*<FilterContainer>
          <FilterDropdown label="Test">
            <Multiselect
              options={sampleOptions}
              selected={selectedClasses}
              onChange={setSelectedClasses}
              placeholder="Select class(es)"
            />
          </FilterDropdown>

          <FilterDropdown label="Test">
            <SingleSelect
              options={sampleOptions}
              selected={selectedClasses2}
              onChange={setSelectedClasses2}
              placeholder="Select class(es)"
            />
          </FilterDropdown>
        </FilterContainer>*/}
      </Form>
      {!autoSubmit && (
        <Button type="submit" onClick={handleSubmit}>
          Search
        </Button>
      )}
    </FormContainer>
  );
};

export default TopSearchForm;
