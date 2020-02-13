import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomButton = ({onClick, title, style, disabled, ...props}) => {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: disabled ? 'grey' : 'dodgerblue',
            borderRadius: 10,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            paddingVertical: 15,
        },
        label: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 15
        }
    });

    return (
        <>
            <TouchableOpacity 
                disabled={disabled}
                style={[styles.button, style]} 
                onPress={onClick} {...props}
            >
                <Text style={styles.label}>{title}</Text>
            </TouchableOpacity>
        </>
    );
};



export default CustomButton;