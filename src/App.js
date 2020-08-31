import React from 'react';
import { ThemeProvider as Theme } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content';
import Flex from './components/Flex';

import { light } from './styles/theme';

function App() {
  return (
    <Theme theme={light}>
      <Flex>
        <Router>
          <Sidebar />
          <Content />
        </Router>
      </Flex>
    </Theme>
  );
}

export default App;
