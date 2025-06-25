import React, { useContext } from 'react';
import TopHero from '../components/TopHero';
import TopSearchForm from '../components/topsearch/TopSearchForm';
import DestinationCard from '../components/DestinationCard';
import styled from 'styled-components';
import useGeoLocation from "../hooks/useGeoLocation";
import { NearByAirportContext } from '../contexts/NearByAirportProvider';

const DestinationCardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
    margin-top: 32px;
`;

const StyledH2 = styled.h2`
    padding: 20px;
`;


const Home: React.FC<{}> = () => {
    const { location } = useGeoLocation();
    const { airport, isLoading, error } = useContext(NearByAirportContext);
    console.log('location:', location);
    console.log('nearby airport:', airport);
    console.log('airport loading:', isLoading);
    console.log('airport error:', error);

    return (
        <div>
            <TopHero title="Find the best flights" description="Find the best flights for your next trip" image="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <TopSearchForm autoSubmit={false} />
            <StyledH2> Find Cheap Fights from to anywhere</StyledH2>
            <DestinationCardsContainer>
                <DestinationCard
                    imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                    location="Goa"
                    price={4999}
                    dateRange="12 Apr - 18 Apr"
                />
                <DestinationCard
                    imageUrl="https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80"
                    location="Manali"
                    price={5999}
                    dateRange="20 Apr - 25 Apr"
                />
                <DestinationCard
                    imageUrl="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80"
                    location="Jaipur"
                    price={3999}
                    dateRange="15 May - 20 May"
                />
                <DestinationCard
                    imageUrl="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
                    location="Kerala"
                    price={6999}
                    dateRange="10 Jun - 16 Jun"
                />
            </DestinationCardsContainer>
            
        </div>
    )
}

export default Home;