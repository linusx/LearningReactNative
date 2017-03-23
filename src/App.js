/**
 * Talk To The Owner App
 * https://github.com/linusx/talk-to-the-owner-app
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import BusinessSearch from './screens/BusinessSearch';
import BusinessPage from './screens/BusinessPage';

export default class App extends Component {
	render() {
		return (
			<Router>
				<Scene key="root">
					<Scene key="businessSearch" hideNavBar="true" component={BusinessSearch} title="Business Search" initial={true} />
					<Scene key="businessPage" hideNavBar="true" component={BusinessPage} title="Business Page" direction="vertical" />
				</Scene>
			</Router>
		)
	}
}

AppRegistry.registerComponent('talktotheownerApp', () => App);