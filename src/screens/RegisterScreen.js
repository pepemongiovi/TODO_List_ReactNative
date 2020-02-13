import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { register } from '../api/api'

class RegisterScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            passwordConfirmation: ""
        }
    }

    static navigationOptions = { 
        title: "",
        headerTransparent: true 
    }

    registerUser = () => {
        const { username, password } = this.state
        register({ username, password }).then(res => {
            this.props.navigation.navigate('LoginScreen')
        }).catch(err => console.log(err))
    }

    render() {
        let { username, password, passwordConfirmation } = this.state

        return (
            <View style={{ margin: 10, marginTop: '40%' }}>
                <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 10 }}>
                    Register
                </Text>
                <CustomInput
                    label="Username" 
                    value={username} 
                    placeholder="Choose a username" 
                    onChangeText={ username => this.setState({username})} 
                />
                { username.length !== 0 && username.length < 6 ?
                    <Text style={{ color: 'red', marginLeft: 4 }}>
                        Username needs to have at least 5 characters
                    </Text> : null
                }

                <CustomInput 
                    label="Password"
                    value={password} 
                    secureTextEntry
                    placeholder="Choose a password"
                    onChangeText={ password => this.setState({ password })} 
                    autoCompleteType="password" 
                />
                { password.length !== 0 && password.length < 6 ? 
                    <Text style={{ color: 'red', marginLeft: 4 }}>
                        Password needs to have at least 5 characters
                    </Text> : null
                }
                
                <CustomInput 
                    label="Confirm password"
                    value={passwordConfirmation} 
                    secureTextEntry
                    placeholder="Confirm your password"
                    onChangeText={ passwordConfirmation => this.setState({ passwordConfirmation })} 
                    autoCompleteType="password" 
                />
                { password !== "" && password !== passwordConfirmation ?
                    <Text style={{ color: 'red', marginLeft: 4 }}>
                        Passwords needs to match
                    </Text> : null
                }

                <CustomButton 
                    title="REGISTER"
                    disabled={
                        username==="" || 
                        password ==="" || 
                        password!==passwordConfirmation ||
                        password.length < 6 ||
                        username.length < 6
                    }
                    onClick={this.registerUser} 
                />
            </View>
        )
    }
};

export default RegisterScreen;
