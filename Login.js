'use strict';

var buffer = require('buffer');
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
		this.state = {
			showProgress: false
		}
	}
	render(){
		var errorCtrl = <View />;

		if(!this.state.success && this.state.badCredentials){
			errorCtrl = <Text style={styles.error}>
				That username and password combination did not work
			</Text>;
		}

		if(!this.state.success && this.state.unknownError){
			errorCtrl = <Text style={styles.error}>
				We experienced an unexpected issue
			</Text>;
		}

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
				{errorCtrl}
			</View>
		);
	}
	onLoginPressed(){
		console.log('Attempting to log in with username ' + this.state.username);

		var b = new buffer.Buffer(this.state.username + ':' + this.state.password);
		var encodedAuth = b.toString('base64');
		
		fetch('https://api.github.com/user',{
			headers: {
				'Authorization' : 'Basic ' + encodedAuth
			}
		})
		.then((response)=> {
			if(response.status >= 200 && response.status < 300){
				return response;
			}

			throw {
				badCredentials: response.status == 401,
				unknownError: response.status != 401
			}
		})
		.then((response)=> {
			return response.json();
		})
		.then((results)=> {
			console.log(results);
			this.setState({success: true});
		})
		.catch((err)=> {
			this.setState(err);
		});
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
  },
  error: {
  	color: 'red',
  	paddingTop: 10
  }
});
module.exports = Login;