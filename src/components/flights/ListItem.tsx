import React from 'react';
import styled from 'styled-components';

export interface FlightListItemProps {
  airline: string;
  airlineLogoUrl?: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops?: number;
  price: string;
  onClick?: () => void;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 16px;
  margin: 8px 20px;
  cursor: pointer;
  transition: box-shadow 0.2s;
  width: -webkit-fill-available;

  &:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }
  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 32px;
  }
`;

const AirlineSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  @media (min-width: 600px) {
    margin-bottom: 0;
  }
`;

const AirlineLogo = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 50%;
  margin-right: 10px;
  background: #f5f5f5;
`;

const AirlineName = styled.div`
  font-weight: 500;
  font-size: 1rem;
`;

const FlightInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  @media (min-width: 600px) {
    margin-bottom: 0;
    min-width: 320px;
  }
`;

const TimeAirport = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Time = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;

const Airport = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const Arrow = styled.div`
  font-size: 1.2rem;
  margin: 0 10px;
  color: #bbb;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 90px;
`;

const Duration = styled.div`
  font-size: 0.95rem;
  color: #444;
`;

const Stops = styled.div`
  font-size: 0.85rem;
  color: #888;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #0b57d0;
  margin-top: 8px;
  @media (min-width: 600px) {
    margin-top: 0;
  }
`;

const ListItem: React.FC<FlightListItemProps> = ({
  airline,
  airlineLogoUrl,
  departureAirport,
  arrivalAirport,
  departureTime,
  arrivalTime,
  duration,
  stops = 0,
  price,
  onClick,
}) => {
  return (
    <Card onClick={onClick}>
      <AirlineSection>
        {airlineLogoUrl && <AirlineLogo src={airlineLogoUrl} alt={airline} />}
        <AirlineName>{airline}</AirlineName>
      </AirlineSection>
      <FlightInfo>
        <TimeAirport>
          <Time>{departureTime}</Time>
          <Airport>{departureAirport}</Airport>
        </TimeAirport>
        <Arrow>→</Arrow>
        <TimeAirport>
          <Time>{arrivalTime}</Time>
          <Airport>{arrivalAirport}</Airport>
        </TimeAirport>
      </FlightInfo>
      <Details>
        <Duration>{duration}</Duration>
        <Stops>{stops === 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`}</Stops>
        <Price>{price}</Price>
      </Details>
    </Card>
  );
};

export default ListItem;
