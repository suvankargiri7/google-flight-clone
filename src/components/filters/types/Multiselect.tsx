import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface OptionType {
  label: string;
  value: string;
}

interface MultiselectProps<T extends OptionType> {
  options: T[];
  selected: T[];
  onChange: (selected: T[]) => void;
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
  min-height: 40px;
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
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
`;

const SelectedTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Tag = styled.span`
  background: #e0e7ff;
  color: #3730a3;
  border-radius: 12px;
  padding: 2px 10px;
  font-size: 13px;
  margin-right: 4px;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
`;

const RemoveTag = styled.span`
  margin-left: 6px;
  cursor: pointer;
  font-weight: bold;
`;

export function Multiselect<T extends OptionType>({
  options,
  selected,
  onChange,
  placeholder = 'Select...',
  labelKey = 'label',
  valueKey = 'value',
  width,
}: MultiselectProps<T>) {
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

  const isSelected = (option: T) =>
    selected.some(sel => sel[valueKey] === option[valueKey]);

  const handleSelect = (option: T) => {
    if (isSelected(option)) {
      onChange(selected.filter(sel => sel[valueKey] !== option[valueKey]));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleRemoveTag = (option: T) => {
    onChange(selected.filter(sel => sel[valueKey] !== option[valueKey]));
  };

  return (
    <DropdownContainer ref={ref} width={width}>
      <DropdownHeader onClick={() => setOpen(o => !o)}>
        <SelectedTags>
          {selected.length === 0 ? (
            <span style={{ color: '#888' }}>{placeholder}</span>
          ) : (
            selected.map(option => (
              <Tag key={String(option[valueKey])}>
                {String(option[labelKey])}
                <RemoveTag onClick={e => { e.stopPropagation(); handleRemoveTag(option); }}>×</RemoveTag>
              </Tag>
            ))
          )}
        </SelectedTags>
        <span style={{ marginLeft: 'auto', color: '#888' }}>{open ? '▲' : '▼'}</span>
      </DropdownHeader>
      {open && (
        <DropdownList>
          {options.map(option => (
            <DropdownListItem
              key={String(option[valueKey])}
              onClick={e => { e.stopPropagation(); handleSelect(option); }}
            >
              <Checkbox
                checked={isSelected(option)}
                onChange={() => {}}
                tabIndex={-1}
                readOnly
              />
              {String(option[labelKey])}
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

export default Multiselect;
