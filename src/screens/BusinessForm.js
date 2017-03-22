import React, { Component } from 'react';
import { WebView, Content, Alert } from 'react-native';

export default class BusinessForm extends Component {
	state = {
		status: 'No Page Loaded',
		loading: true,
		scalesPageToFit: true,
		Height: 0
	};

	constructor (props) {
		super(props);
	}

	onNavigationChange(event) {
		if (event.title) {
			const htmlHeight = Number(event.title);
			this.setState({Height:htmlHeight});
		}
	}

	render() {
		return (
			<WebView
				style={{height: this.state.Height}}
				scrollEnabled={false}
				automaticallyAdjustContentInsets={false}
				source={{uri: 'http://talktotheownerapp.com/business-form/' + this.props.placeId}}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				startInLoadingState={true}
				scalesPageToFit={this.state.scalesPageToFit}
				onNavigationStateChange={this.onNavigationChange.bind(this)}
			/>
		);
	}
}