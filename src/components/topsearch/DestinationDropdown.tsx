import React, { useEffect, useState } from "react";
import SingleSelect from "../filters/types/SingleSelect";
import useGeoLocation from "../../hooks/useGeoLocation";
import { useQuery } from "@tanstack/react-query";

interface AirportOption {
  label: string;
  value: string;
  code: string;
  city: string;
  country: string;
  entityid: string;
}

interface DestinationDropdownProps {
  onChange: (selected: AirportOption | null) => void;
  value?: AirportOption | null;
  placeholder?: string;
}

const fetchAirports = async (): Promise<AirportOption[]> => {
  const response = await fetch(
    `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=new&locale=en-US`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY ?? "",
        "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST ?? "",
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch airports");
  const data = await response.json();
  const options: AirportOption[] = [];
  // Add airports
  if (Array.isArray(data?.data)) {
    data.data.forEach((item: any) => {
      if (
        item.navigation?.relevantFlightParams?.flightPlaceType === "AIRPORT"
      ) {
        options.push({
          label: `${item.presentation.title} (${item.navigation.relevantFlightParams.skyId}) - ${item.presentation.subtitle}`,
          value: item.navigation.relevantFlightParams.skyId,
          code: item.navigation.relevantFlightParams.skyId,
          city: item.presentation.title,
          country: item.presentation.subtitle,
          entityid: item.navigation.relevantFlightParams.entityId,
        });
      }
    });
  }
  return options;
};

const DestinationDropdown: React.FC<DestinationDropdownProps> = ({
  onChange,
  value,
  placeholder,
}) => {
  const { location, error: geoError, isLoading: geoLoading } = useGeoLocation();

  const {
    data: airports = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["airports", "new", "en-US"],
    queryFn: () => fetchAirports(),
    enabled: !!location,
  });

  return (
    <SingleSelect
      options={airports}
      selected={value || null}
      onChange={onChange}
      placeholder={placeholder || "Select Destination airport"}
      labelKey="label"
      valueKey="value"
      width="auto"
    />
  );
};

export default DestinationDropdown;
