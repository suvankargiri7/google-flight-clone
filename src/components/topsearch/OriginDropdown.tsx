import React from 'react';
import SingleSelect from '../filters/types/SingleSelect';
import useGeoLocation from '../../hooks/useGeoLocation';
import { useQuery } from '@tanstack/react-query';

interface AirportOption {
  label: string;
  value: string;
  code: string;
  city: string;
  country: string;
  entityid: string;
}

interface OriginDropdownProps {
  onChange: (selected: AirportOption | null) => void;
  value?: AirportOption | null;
  placeholder?: string;
}

const fetchAirportsByLocation = async (lat: number, lng: number): Promise<AirportOption[]> => {
  const response = await fetch(
    `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${lat}&lng=${lng}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'c964ffcd23msh5c6156e0241de34p14e115jsn1c6f7238916c',
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
      },
    }
  );
  if (!response.ok) throw new Error('Failed to fetch airports');
  const data = await response.json();
  const options: AirportOption[] = [];
  // Add current airport if present and is an AIRPORT
  if (
    data?.data?.current?.navigation?.relevantFlightParams?.flightPlaceType === 'AIRPORT'
  ) {
    const curr = data.data.current;
    options.push({
      label: `${curr.presentation.title} (${curr.navigation.relevantFlightParams.skyId}) - ${curr.presentation.subtitle}`,
      value: curr.navigation.relevantFlightParams.skyId,
      code: curr.navigation.relevantFlightParams.skyId,
      city: curr.presentation.title,
      country: curr.presentation.subtitle,
      entityid: curr.navigation.relevantFlightParams.entityId
    });
  }
  // Add nearby airports
  if (Array.isArray(data?.data?.nearby)) {
    data.data.nearby.forEach((item: any) => {
      if (item.navigation?.relevantFlightParams?.flightPlaceType === 'AIRPORT') {
        options.push({
          label: `${item.presentation.title} (${item.navigation.relevantFlightParams.skyId}) - ${item.presentation.subtitle}`,
          value: item.navigation.relevantFlightParams.skyId,
          code: item.navigation.relevantFlightParams.skyId,
          city: item.presentation.title,
          country: item.presentation.subtitle,
          entityid: item.navigation.relevantFlightParams.entityId
        });
      }
    });
  }
  return options;
}

const OriginDropdown: React.FC<OriginDropdownProps> = ({ onChange, value, placeholder }) => {
  const { location, error: geoError, isLoading: geoLoading } = useGeoLocation();

  const { data: airports = [], isLoading, isError, error } = useQuery({
    queryKey: ['airports', location?.lat, location?.lang],
    queryFn: () => fetchAirportsByLocation(location!.lat, location!.lang),
    enabled: !!location,
  });

  if (geoLoading || isLoading) return <div>Loading nearby airports...</div>;
  if (geoError) return <div>Error: {geoError}</div>;
  if (isError) return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;

  return (
    <SingleSelect
      options={airports}
      selected={value || null}
      onChange={onChange}
      placeholder={placeholder || 'Select origin airport'}
      labelKey="label"
      valueKey="value"
    />
  );
};

export default OriginDropdown;
