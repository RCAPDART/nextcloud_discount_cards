import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Container } from './baseComponents/container/container';
import { MainContent } from './components/mainContent/mainContent.jsx';

import './App.scss';

window.process = { env: { PUBLIC_URL: 'public' } };

export class App extends Component {
  state = {
    page: 'Main',
  };

  render() {
    const { page } = this.state;

    return (
      <MuiThemeProvider>
        <Container className="discountCardsMainContainer">
          <MainContent name={page} />
        </Container>
      </MuiThemeProvider>
    );
  }
}
