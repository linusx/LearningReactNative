/**
 * Talk To The Owner App
 * https://github.com/linusx/talk-to-the-owner-app
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';

import Index from './screens/Index';
import BusinessPage from './screens/BusinessPage';

export default class App extends Component {
	render() {
		return (
			<Router>
				<Scene key="root">
					<Scene
						key="index"
						hideNavBar="true"
						component={Index}
						title="Business Search"
						initial={true}
					/>

					<Scene
						key="businessPage"
						hideNavBar="true"
						component={BusinessPage}
						title="Business Page"
						direction="vertical"
						leftTitle="Cancel"
						onLeft={Actions.pop}
					/>
				</Scene>
			</Router>
		)
	}
}

AppRegistry.registerComponent('talktotheownerApp', () => App);