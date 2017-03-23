
import React, { Component, Navigator } from 'react';
import { Alert, AppRegistry, StyleSheet, Modal, Image, Platform, RefreshControl, View } from 'react-native';
import { Spinner, Item, Text, Container, Header, Title, Button, Icon, Subtitle, Input, ListItem, List, Thumbnail, Left, Right, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Config from '../Config';

class Index extends Component {
	watchID = (null: ?number);

	styles = StyleSheet.create({
		backgroundImage: {
			flex: 1,
			justifyContent: 'center',
			backgroundColor: 'transparent',
			width: null,
			height: null,
			resizeMode: 'cover'
		}
	});

	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			search: '',
			results: {
				items: []
			},
			lat: '',
			lon: ''
		}
	};

	_onRefresh() {
		this.setState({refreshing: true});
		this.search().then(() => {
			this.setState({refreshing: false});
		});
	}

	componentDidMount() {
		this.styles.backgroundImage.flex = 1;
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					lat: position.coords.latitude,
					lon: position.coords.longitude
				});

				this.search();
			},
			(error) => alert(error.message),
			{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
		);

		this.watchID = navigator.geolocation.watchPosition((position) => {
			this.setState({
				lat: position.coords.latitude,
				lon: position.coords.longitude
			});
		});
	};

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	};

	search() {
		// Set loading to true when the search starts to display a Spinner
		this.setState({
			loading: true
		});

		var me = this;

		return fetch(Config.api_url + Config.api_base + '/find/?name=' + this.state.search + '&lat=' + this.state.lat + '&lon=' + this.state.lon, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-Authorization': Config.api_key
			},
		})
			.then((response) => response.json())
			.then((responseJson) => {
				me.setState({
					results: responseJson,
					loading: false
				});

				return responseJson.Search;
			})
			.catch((error) => {
				Alert.alert(
					"Error",
					"" + error
				);
				me.setState({
					loading: false
				});
			});
	}

	listItemStyle( is_customer ) {
		styles = {opacity: 1, paddingLeft: 10, margin: 0,backgroundColor: 'rgba(0,0,0,.5)'};
		if ( true === is_customer ) {
			styles.backgroundColor = 'rgba(255,255,255,.5)';
		}
		return styles;
	}

	titleStyle( is_customer ) {
		styles = {color: '#fff', textAlign: 'left'};
		if ( true === is_customer ) {
			styles.color = '#000';
		}
		return styles;
	}

	goToBusiness(item) {
		Actions.businessPage({item: item});
	};

	render() {
		return (
			<Container>
				<Header searchBar>
					<Item>
						<Icon name="search"/>
						<Input placeholder="Search" value={this.state.search}
						       onChangeText={(text) => this.setState({search:text})}
						       onSubmitEditing={()=>this.search()}/>
					</Item>
					<Button title="Search" transparent onPress={()=>this.search()}>
						<Text style={{color: "#000" }}>Search</Text>
					</Button>
				</Header>

				<Image source={require('../images/app_background.jpg')} style={this.styles.backgroundImage}>
					{this.state.loading ? <Spinner color="#000" size="small"/> : <List
						refreshControl={<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh.bind(this)}
						/>}
						dataArray={this.state.results.businesses}
						renderRow={(item) =>
	                        <ListItem thumbnail onPress={()=>this.goToBusiness(item)} style={this.listItemStyle(item.is_customer)}>
								<Left>
	                                <Thumbnail style={{width: 40, height: 40, borderRadius: 20}} source={{uri: item.icon}} />
	                            </Left>
	                            <Body>
									<Title style={this.titleStyle(item.is_customer)}>{item.name}</Title>
									<Subtitle style={this.titleStyle(item.is_customer)}>{item.vicinity}</Subtitle>
	                            </Body>
	                            {true === item.is_customer? <Right>
	                                    <Icon name='ios-star' style={{color: "#FFD700", fontSize: 30}} />
	                                </Right> : <Text/>
	                            }
	                        </ListItem>
                        }/>
					}
				</Image>
			</Container>
		);
	}

}

module.exports = Index;