import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TopSearchForm from "../components/topsearch/TopSearchForm";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import ListItem from "../components/flights/ListItem";

interface SearchParams {
  originSkyId?: string;
  destinationSkyId?: string;
  originEntityId?: string;
  destinationEntityId?: string;
  cabinClass?: string;
  date: string | null;
  sortBy?: string;
}

const SearchListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const fetchFlights = async (passObject: SearchParams): Promise<any[]> => {
  const params = new URLSearchParams(
    Object.entries(passObject).reduce((pob, [key, value]) => {
      if (value) {
        pob[key] = value;
      }
      return pob;
    }, {} as Record<string, string>)
  );
  const response = await fetch(
    `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?${params}`,
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
  return data;
  //TODO: need to parse properly for listing
};

const Search: React.FC<{}> = () => {
  const topsearchState = useSelector((state: RootState) => state.topSearch);

  const {
    data: fightData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "flights",
      topsearchState?.originAirport?.code,
      topsearchState?.destinationAirport?.code,
    ],
    queryFn: () =>
      fetchFlights({
        originSkyId: topsearchState?.originAirport?.code,
        destinationSkyId: topsearchState?.destinationAirport?.code,
        originEntityId: topsearchState?.originAirport?.entityid,
        destinationEntityId: topsearchState?.destinationAirport?.entityid,
        cabinClass: topsearchState?.tripClass?.value,
        date: topsearchState?.departureDate,
        sortBy: "best",
      }),
    enabled: !!topsearchState,
  });
  return (
    <div>
      <h1>Search</h1>
      {/*navigation.state === 'loading' && <h2>Loading...</h2>*/}
      <TopSearchForm autoSubmit={true} />
      <SearchListContainer>
        
        {
        //@ts-ignore
        fightData?.data?.itineraries.map((itinerary) => {
          const leg = itinerary.legs[0];
          const marketingCarrier = leg.carriers.marketing[0];
          return (
            <ListItem
              key={itinerary.id}
              airline={marketingCarrier.name}
              airlineLogoUrl={marketingCarrier.logoUrl}
              departureAirport={leg.origin.displayCode}
              arrivalAirport={leg.destination.displayCode}
              departureTime={new Date(leg.departure).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              arrivalTime={new Date(leg.arrival).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              duration={
                Math.floor(leg.durationInMinutes / 60) +
                "h " +
                (leg.durationInMinutes % 60) +
                "m"
              }
              stops={leg.stopCount}
              price={itinerary.price.formatted}
            />
          );
        })}
      </SearchListContainer>
    </div>
  );
};

export default Search;
