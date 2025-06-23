import React from "react";
import styled from "styled-components";

interface TopHeroProps {
    title: string;
    description: string;
    image: string;
}

const TopHeroContainer = styled.div<{image: string}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 20vh;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    text-align: center;
    padding: 20px;
    position: relative;
    z-index: 1;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: -1;
    }
`;

const TopHeroContent = styled.div`
    max-width: 800px;
    padding: 20px;
    text-align: center;
    z-index: 1;
`;


const TopHeroTitle = styled.h1`
    font-size: 3rem;
    margin-bottom: 1rem;
    @media (max-width: 768px) {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }
`;

const TopHeroDescription = styled.p`
    font-size: 1.5rem;
    margin-bottom: 2rem;
    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 1rem;
    }
`;

const TopHero = ({title, description, image}: TopHeroProps) => {
    return (
        <TopHeroContainer image={image}>
            <TopHeroContent>
                <TopHeroTitle>{title}</TopHeroTitle>
                <TopHeroDescription>{description}</TopHeroDescription>
            </TopHeroContent>
        </TopHeroContainer>
    )
}

export default TopHero;