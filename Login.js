'use strict';

var React = require('react');
var Component = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight
} = require('react-native');

class Login extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<View style={styles.container}>
				<Image style={styles.logo}
				source={require('image!Octocat')} />
				<Text style={styles.heading}>
					Github browser
				</Text>
				<TextInput
					onChangeText={(text)=>this.setState({username: text})}
				  style={styles.input}
					placeholoder="Github username"
			  />
				<TextInput
					onChangeText={(text)=>this.setState({password: text})}
				  style={styles.input}
					placeholoder="Github password"
					secureTextEntry={true}
				/>
				<TouchableHighlight
					onPress={this.onLoginPressed.bind(this)}
					style={styles.button}>
					<Text style={styles.buttonText}>
						Log in
					</Text>
				</TouchableHighlight>
			</View>
		);
	}
	onLoginPressed(){
		console.log('Attempting to log in with username ' + this.state.username);
	}
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  logo: {
  	width: 66,
  	height: 55
  },
  heading: {
  	fontSize: 30,
  	marginTop: 30
  },
  input: {
  	height: 50,
  	marginTop: 10,
  	padding: 4,
  	fontSize: 18,
  	borderWidth: 1,
  	borderColor: '#48bbec'
  },
  button: {
  	height: 50,
  	backgroundColor: '#48BBEC',
  	alignSelf: 'stretch',
  	marginTop: 10,
  	justifyContent: 'center'
  },
  buttonText: {
  	fontSize: 22,
  	color: '#FFF',
  	alignSelf: 'center'
  }
});
module.exports = Login;