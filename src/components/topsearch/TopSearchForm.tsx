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

interface TopSearchFormProps {
  autoSubmit: boolean;
  filters?: [];
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
`;

const TravelPrePlanContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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

// Sample options for the multiselect
const sampleOptions = [
  { label: "Economy", value: "economy" },
  { label: "Business", value: "business" },
  { label: "First Class", value: "first" },
  { label: "Premium Economy", value: "premium" },
];

const TopSearchForm = ({ autoSubmit, filters }: TopSearchFormProps) => {
  const handleSubmit = () => {
    console.log("submit");
  };

  // State for selected options
  const [selectedClasses, setSelectedClasses] = useState<
    typeof sampleOptions
  >([]);
  const [selectedClasses2, setSelectedClasses2] = useState<any>({
    label: "Economy",
    value: "economy",
  });
  
  let todayDate = new Date();
  const [departureDate, setDepartureDate] = useState<Date|null>(todayDate);
  const [returnDate, setReturnDate] = useState<Date|null>(todayDate);
   
  return (
    <FormContainer>
      <h1>TopSearchForm</h1>
      <Form>
        <TravelPrePlanContainer>
          <OriginDropdown onChange={(selected) => console.log(selected)} />
          <DestinationDropdown
            onChange={(selected) => console.log(`destination>>`, selected)}
          />
          <DatePicker selected={departureDate} onChange={(date) => setDepartureDate(date)} />
          <DatePicker selected={returnDate} onChange={(date) => setReturnDate(date)} />
        </TravelPrePlanContainer>
        <TravelPlanContainer>Travel Planer</TravelPlanContainer>
        <FilterContainer>
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
        </FilterContainer>
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
