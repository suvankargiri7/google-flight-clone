import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TopSearchForm from "../components/topsearch/TopSearchForm";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useQuery } from "@tanstack/react-query";

interface SearchParams {
    originSkyId?: string;
    destinationSkyId?: string;
    originEntityId?: string;
    destinationEntityId?: string;
    cabinClass?: string;
    date?: string;
}

const fetchFlights = async (passObject: SearchParams): Promise<any[]> => {
    const params = new URLSearchParams(Object.entries(passObject).reduce((pob, [key, value]) => {
        if (value) {
            pob[key] = value;
        }
        return pob;
    }, {} as Record<string, string>));
    const response = await fetch(
        `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?${params}`
    )
    if (!response.ok) throw new Error('Failed to fetch airports');
    const data = await response.json();
    return data;
    //TODO: need to parse properly for listing
}

const Search: React.FC<{}> = () => {
  const [searchParams] = useSearchParams();
  const topsearchState = useSelector((state: RootState) => state.topSearch);
  console.log("search parameters", topsearchState);

  const {
    data: any = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "flights",
      topsearchState?.originAirport?.code,
      topsearchState?.destinationAirport?.code,
    ],
    queryFn: () => fetchFlights({
        originSkyId: topsearchState?.originAirport?.code,
        destinationSkyId: topsearchState?.destinationAirport?.code,
        originEntityId: topsearchState?.originAirport?.entityid,
        destinationEntityId: topsearchState?.destinationAirport?.entityid,
        cabinClass: topsearchState?.tripClass?.value,
        //date: topsearchState?.departureDate
    }),
    enabled: !!topsearchState,
  });
  return (
    <div>
      <h1>Search</h1>
      {/*navigation.state === 'loading' && <h2>Loading...</h2>*/}
      <TopSearchForm autoSubmit={true} />
    </div>
  );
};

export default Search;
