import { Component } from 'react';
import { SideBar, Entry, Separator, App as AppContainer, Content, ControlBar, Settings } from 'oc-react-components';
import { MainContent } from './components/mainContent/mainContent.js';


export class App extends Component {
	state = {
		page: 'home'
	};

	onClick (page) {
		this.setState({
			page: page
		});
	}

	render () {
		return (
			<AppContainer appId="react_oc_boilerplate">
				<SideBar withIcon={true}>
					<Entry key={'1'} icon="home" onClick={this.onClick.bind(this,'home')}>Favorite cards</Entry>
					<Entry key={'2'} icon="link" onClick={this.onClick.bind(this,'link')}>All cards</Entry>
					<Entry key={'3'} icon="folder" onClick={this.onClick.bind(this,'folder')}>Categories</Entry>
					<Separator/>
					<Entry key={'4'} icon="user" onClick={this.onClick.bind(this,'user')}>Disabled</Entry>

					<Settings>
						<h2>
							Here are all settings!
						</h2>
					</Settings>
				</SideBar>

				<ControlBar>
					<input type="text" placeholder="Find card"/>
				</ControlBar>

				<Content key={4}>
					<h1>{this.state.page}</h1>
					<MainContent name={this.state.page}/>
				</Content>
			</AppContainer>
		);
	}
}