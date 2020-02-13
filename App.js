import React, { Component } from 'react';
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import TODOListScreen from './src/screens/TODOListScreen'
import NewTaskScreen from './src/screens/NewTaskScreen'
import TaskDetailsScreen from './src/screens/TaskDetailsScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import AsyncStorage from '@react-native-community/async-storage';

const AuthenticatedStackNavigator = createStackNavigator({
  TODOListScreen,
  NewTaskScreen,
  TaskDetailsScreen
})

const UnauthenticatedStackNavigator = createStackNavigator({
  LoginScreen,
  RegisterScreen
})

const createMainNavigation = (authenticated = false) => {
  return createAppContainer(
    createSwitchNavigator({
        AuthenticatedStackNavigator,
        UnauthenticatedStackNavigator
      }, 
      { initialRouteName: authenticated ? 
        'AuthenticatedStackNavigator' : 
        'UnauthenticatedStackNavigator'
      }
    )
  )
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then(user => {
      this.setState({ user })
    })
  }

  render () {
    const Root = createMainNavigation(!!this.state.user)
    
    return (
      <Root />
    );
  }
};

