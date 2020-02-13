import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

const LogoutButton = (props) => {

    logout = () => {
        AsyncStorage.removeItem('user').then(res => {
            props.navigation.navigate('LoginScreen')
        })
    }

    return (
        <>
            <Icon name="logout" size={25} style={{ margin: 10 }} 
                onPress={logout} color="red" 
            />
        </>
    )
};

export default LogoutButton;

