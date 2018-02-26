import React, { Component } from 'react';
import { MainContent } from './components/mainContent/mainContent.jsx';
import './App.less';

export class App extends Component {
    state = {
        page: "Main"
    };
	render () {
		return (
			<div className='discountCardsMainContainer'>
				<h1>{this.state.page}</h1>
				<MainContent name={this.state.page}/>
			</div>
		);
	}
}