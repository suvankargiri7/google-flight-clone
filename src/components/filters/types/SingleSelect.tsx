import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface OptionType {
  label: string;
  value: string;
}

interface SingleSelectProps<T extends OptionType> {
  options: T[];
  selected: T | null;
  onChange: (selected: T) => void;
  placeholder?: string;
  labelKey?: keyof T;
  valueKey?: keyof T;
  width?: string;
}

const DropdownContainer = styled.div<{ width?: string }>`
  position: relative;
  width: ${({ width }) => width || '250px'};
  font-family: inherit;
`;

const DropdownHeader = styled.div`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 20px;
  justify-content: space-between;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  max-height: 220px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const DropdownListItem = styled.li`
  list-style: none;
  padding: 10px 12px;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

const DropdownListItemLabel = styled.span`
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
`;

const DropdownHeaderLabel = styled.span`
   color: #888;
   font-size: 12px;
`;

const Radio = styled.input.attrs({ type: 'radio' })`
  margin-right: 10px;
`;

export function SingleSelect<T extends OptionType>({
  options,
  selected,
  onChange,
  placeholder = 'Select...',
  labelKey = 'label',
  valueKey = 'value',
  width,
}: SingleSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: T) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <DropdownContainer ref={ref} width={width}>
      <DropdownHeader onClick={() => setOpen(o => !o)}>
        {selected ? (
          <DropdownHeaderLabel>{String(selected[labelKey])}</DropdownHeaderLabel>
        ) : (
          <DropdownHeaderLabel>{placeholder}</DropdownHeaderLabel>
        )}
        <span style={{ marginLeft: 'auto', color: '#888' }}>{open ? '▲' : '▼'}</span>
      </DropdownHeader>
      {open && (
        <DropdownList>
          {options.map(option => (
            <DropdownListItem
              key={String(option[valueKey])}
              onClick={e => { e.stopPropagation(); handleSelect(option); }}
            >
              <Radio
                checked={selected ? selected[valueKey] === option[valueKey] : false}
                onChange={() => {}}
                tabIndex={-1}
                readOnly
              />
              <DropdownListItemLabel>{String(option[labelKey])}</DropdownListItemLabel>
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

export default SingleSelect;
