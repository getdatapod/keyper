import React from 'react';
import styled from 'styled-components';
import Flex from '../Flex';

const DocumentPreview = ({ title, images, content, actions }) => {
  return (
    <Container>
      <ImageContainer>{images}</ImageContainer>
      <ContentContainer column>
        <Title>{title}</Title>
        {content}
      </ContentContainer>
      <ActionsContainer>{actions}</ActionsContainer>
    </Container>
  );
};

export default DocumentPreview;

const Container = styled(Flex)`
  width: 100%;
  padding: 0.8rem 0;
  border-top: 1px solid #ccc;
  background-color: #fff;

  &:last-child {
    border-bottom: 1px solid #ccc;
  }
`;

const ImageContainer = styled(Flex)`
  margin-right: 1rem;
  padding: 0 0.8rem;
  align-items: center;

  img {
    height: 3rem;
  }
`;

const ContentContainer = styled(Flex)`
  flex-grow: 1;
  font-size: 0.9rem;
  color: ${(props) => props.theme.grey500};
`;

const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${(props) => props.theme.primary};
`;

const ActionsContainer = styled(Flex)``;
