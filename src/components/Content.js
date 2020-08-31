import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Keys from './pages/Keys/Keys';
import Permission from './pages/Permission/Permission';

const Content = () => {
  return (
    <Container>
      <Switch>
        <Route path="/" exact component={Keys} />
        <Route path="/connected-apps" component={Permission} />
      </Switch>
    </Container>
  );
};

export default Content;

const Container = styled.div`
  background-color: ${(props) => props.theme.contentColor};
  width: 100%;
  padding: 2rem 5rem;
`;
