import React, { ReactNode } from "react";
import styled from 'styled-components';

export enum FilterType {
  MultiSelect = "multiselect",
  SingleSelect = "singleselect",
  Slider = "slider",
  RangeSlider = "rangeslider",
}

interface FilterDropdownProps {
  children: ReactNode;
  label?: string;
}

const FilterWrapper = styled.div<{ width?: string }>`
   width:  ${({ width }) => width || '250px'};
`;

const FilterDropdown: React.FC<FilterDropdownProps> = ({ children, label }) => {
  return (
    <FilterWrapper>
      {label && <label className="filter-label">{label}</label>}
      {children}
    </FilterWrapper>
  );
};

export default FilterDropdown; 