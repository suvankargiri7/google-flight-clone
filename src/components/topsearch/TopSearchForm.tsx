/**
 * @summary Component: Top search form
 * @description props: autoSubmit, filters (optional)
 * @method onDestinationChange, onOriginChange, onFlightTypeChange
 *
 */
import React from "react";
import styled from "styled-components";
import FilterDropdown, { FilterType } from "../filters";
import Multiselect from "../filters/types/Multiselect";
import SingleSelect from "../filters/types/SingleSelect";

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
  align-items: center;
  justify-content: center;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
  const [selectedClasses, setSelectedClasses] = React.useState<typeof sampleOptions>([]);
  const [selectedClasses2, setSelectedClasses2] = React.useState<any>({ label: "Economy", value: "economy" });

  return (
    <FormContainer>
      <h1>TopSearchForm</h1>
      <Form>
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
