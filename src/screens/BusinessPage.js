import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Body, Text, Subtitle } from 'native-base';
import { Actions } from 'react-native-router-flux';
import BusinessForm from './BusinessForm';

export default class BusinessPage extends Component {

	render() {
		return (
			<Container>
				<Header>
					<Body>
					<Subtitle>Talk To The Owner Of</Subtitle>
					<Title>{this.props.item.name}</Title>
					</Body>
				</Header>

				<Content>
					<BusinessForm placeId={this.props.item.id} />
				</Content>

				<Footer>
					<FooterTab>
						<Button title="Cancel"  style={{alignSelf: 'flex-end'}} onPress={Actions.businessSearch} >
							<Text>Cancel</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		)
	}
}