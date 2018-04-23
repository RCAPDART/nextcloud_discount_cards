import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MainContent } from './components/mainContent/mainContent.jsx';
import './App.less';
import {Container} from "./baseComponents/container/container";
window.process = { env: { PUBLIC_URL: 'public' } };
export class App extends Component {
    state = {
        page: "Main"
    };
	render () {
		return (
            <MuiThemeProvider>
				<Container className='discountCardsMainContainer'>
					<MainContent name={this.state.page}></MainContent>
				</Container>
			</MuiThemeProvider>
		);
	}
}