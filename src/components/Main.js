import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const Heading = styled.h1`
  color: #333;
`;

const StyledLink = styled(Link)`
  display: block;
  margin: 10px 0;
  color: #007bff;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const Main = () => {
  return (
    <MainContainer>
      <Heading>Main Page</Heading>
      <StyledLink to="/gerir-monitores">Gerir Monitores</StyledLink>
      <StyledLink to="/gerir-disciplinas">Disciplinas</StyledLink>
      <StyledLink to="/gerir-horario">Horário</StyledLink>
    </MainContainer>
  );
};

export default Main;
