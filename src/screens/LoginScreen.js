import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { login } from '../api/api'
import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
    username: "",
    password: "",
    errorMessage: ""
}

class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    static navigationOptions = { 
        header: null 
    }

    login = () => {
        const user = { 
            username: this.state.username, 
            password: this.state.password 
        }
        login(user).then(({ data }) => {
            AsyncStorage.setItem('user', JSON.stringify(data)).then(res => {
                this.props.navigation.navigate('TODOListScreen')
            })
        }).catch(({ response }) => {
            this.setState({ errorMessage: response.data.message })
        })
    }

    goToRegisterScreen = () => {
        this.setState(INITIAL_STATE)
        this.props.navigation.navigate('RegisterScreen')
    }

    render() {
        let { username, password } = this.state

        return (
            <View style={{ margin: 10, marginTop: '40%' }}>
                <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 10 }}>
                    Login
                </Text>
                <CustomInput 
                    label="Username"
                    value={username} 
                    placeholder="Enter a username" 
                    onChangeText={ username => this.setState({username})} />
                <CustomInput 
                    label="Password"
                    value={password} 
                    placeholder="Enter a password"
                    onChangeText={ password => this.setState({ password })} 
                    secureTextEntry
                    autoCompleteType="password" />
                    
                { this.state.errorMessage === "" ? null :
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text> 
                }
                
                <CustomButton 
                    title="LOGIN"
                    disabled={this.state.username==="" || this.state.password ===""}
                    onClick={this.login} 
                />
                <CustomButton 
                    title="REGISTER" 
                    onClick={this.goToRegisterScreen} 
                />
            </View>
        )
    }
};



export default LoginScreen;


