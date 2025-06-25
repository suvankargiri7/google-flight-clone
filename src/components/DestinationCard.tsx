import React from 'react';
import styled from 'styled-components';

interface DestinationCardProps {
  imageUrl: string;
  location: string;
  price: string | number;
  dateRange: string;
}

const Card = styled.div`
  width: 100%;
  max-width: 350px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: #fff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 480px) {
    max-width: 95vw;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  @media (max-width: 480px) {
    height: 140px;
  }
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Location = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #222;
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #0071c2;
`;

const Date = styled.span`
  font-size: 14px;
  color: #666;
`;

const DestinationCard: React.FC<DestinationCardProps> = ({ imageUrl, location, price, dateRange }) => {
  return (
    <Card>
      <Image src={imageUrl} alt={location} />
      <Content>
        <Location>{location}</Location>
        <Price>₹{price}</Price>
        <Date>{dateRange}</Date>
      </Content>
    </Card>
  );
};

export default DestinationCard;
