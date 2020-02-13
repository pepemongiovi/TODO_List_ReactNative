import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const CustomInput = ({placeholder, style, multiline, label, ...props}) => {
    return (
        <>
            <TextInput style={{ fontSize: 15, padding: 0, marginLeft: 5 }}>
                {label}
            </TextInput>
            <TextInput 
                multiline={multiline} 
                style={[styles.input]}
                placeholder={placeholder} 
                {...props}/>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderColor: '#D0CFCF',
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginVertical: 5,
        color: '#9C9495',
        borderRadius: 5,
        backgroundColor: '#FEFBFB',
    },
});

export default CustomInput;