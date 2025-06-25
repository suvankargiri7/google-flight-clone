/**
 * @summary Component: Top search form
 * @description props: autoSubmit, filters (optional)
 * @method onDestinationChange, onOriginChange, onFlightTypeChange
 *
 */
import React, { useState } from "react";
import styled from "styled-components";
import FilterDropdown, { FilterType } from "../filters";
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
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  padding: 16px;
  margin: 8px 20px;
  width: -webkit-fill-available;
  transition: box-shadow 0.2s;
  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 32px;
  }
`;

const Button = styled.button`
  background-color: #0b57d0;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 16px;
  width: 100%;
  transition: background 0.2s;
  &:hover {
    background-color: #003580;
  }
  @media (min-width: 600px) {
    width: auto;
    margin-top: 0;
    margin-left: 24px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const TravelPrePlanContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
  align-items: flex-start;
`;

const TravelPlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  justify-content: center;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const TravelTripTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledDateInput = styled.input`
  height: 30px;
`

const SearchButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
      <Form>
        <TravelPrePlanContainer>
          <TravelTripTypeContainer>
            {/** trip type */}
            <SingleSelect
              options={tripTypeOptions}
              selected={topsearchState.tripType}
              onChange={handleTripType}
              placeholder="Select trip type"
              width={'120px'}
            />
          </TravelTripTypeContainer>

          {/** class */}
          <SingleSelect
            options={tripClassOptions}
            selected={topsearchState.tripClass}
            onChange={handleTripClass}
            placeholder="Select class(es)"
            width={'168px'}
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
            customInput={<StyledDateInput />}
            popperPlacement="bottom-start"

          />
          {topsearchState.tripType?.value !== "oneway" && (
            <DatePicker
              selected={
                topsearchState.returnDate
                  ? new Date(topsearchState.returnDate)
                  : null
              }
              onChange={(date) => handleReturnDateChange(date)}
              customInput={<StyledDateInput />}
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
        {!autoSubmit && (
          <SearchButtonContainer>
            <Button type="submit" onClick={handleSubmit}>
              Search
            </Button>
          </SearchButtonContainer>
        )}
      </Form>
    </FormContainer>
  );
};

export default TopSearchForm;
