import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet, TextInput } from 'react-native';
import LogoutButton from '../components/LogoutButton'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import { updateTask } from '../api/api'
import AsyncStorage from '@react-native-community/async-storage';

class TaskDetailsScreen extends Component {
    constructor(props) {
        super(props)
        
        this.state = props.navigation.state.params.task
        this.initialState = props.navigation.state.params.task
    }

    static navigationOptions = ({ navigation }) => ({ 
        title: "",
        headerTransparent: true,
        headerRight: () => (
            <LogoutButton navigation={navigation} />
        )
    })

    componentDidMount() {
        AsyncStorage.getItem('user').then(user => {
            this.setState({ user: JSON.parse(user)})
        })
    }

    getUpdatedAttributes = () => {
        let updatedTask = {}
        const atts = ['title', 'description', 'status']

        atts.forEach(att => {
            if(this.initialState[att] !== this.state[att]) {
                updatedTask[att] = this.state[att]
            }
        })

        return updatedTask
    }

    updateUserTasks = (updatedAttributes) => {
        const { user, id } = this.state

        user.tasks.forEach((task, index) => {
            if(task.id === id) {
                Object.keys(updatedAttributes).forEach(att => {
                    user.tasks[index][att] = this.state[att]
                })
            }  
        })
        this.setState({ user })
    }

    saveTask = () => {
        const { user, id } = this.state 
        const updatedAttributes = this.getUpdatedAttributes() 

        this.updateUserTasks(updatedAttributes)

        updateTask(id, updatedAttributes, user.token)
        .then(res => {
            AsyncStorage.setItem('user', JSON.stringify(user)).then(res => {
                this.props.navigation.navigate('TODOListScreen')
            })
        }).catch(err => console.log(err))
    }

    render() {
        const { title, description, status } = this.state
        
        return (
            <View style={{ margin: 10, marginTop: 70 }}>
                <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 10 }}>
                    Task Details
                </Text>

                <CustomInput 
                    label="Title"
                    value={title} 
                    placeholder="Choose a title" 
                    onChangeText={ title => this.setState({ title })} 
                />
                { title === "" ?
                    <Text style={{ color: 'red', marginLeft: 4 }}>
                        The title can't be empty
                    </Text> : null
                }

                <CustomInput 
                    label="Description"
                    value={description} 
                    multiline={true}
                    style={{ height: 300 }}
                    placeholder="Write a description" 
                    onChangeText={ description => this.setState({ description })} 
                />
                { description === "" ?
                    <Text style={{ color: 'red', marginLeft: 4 }}>
                        The description can't be empty
                    </Text> : null
                }

                <TextInput style={{ fontSize: 15, padding: 0, marginLeft: 5 }}>
                    Status
                </TextInput>
                <Picker
                    selectedValue={status}
                    style={[
                        styles.picker, 
                        { 
                            color: status === "PENDING" ? 'red' : 
                            status === "ONGOING" ? 'orange' : 'green' 
                        }
                    ]}
                    onValueChange={ status =>
                        this.setState({ status })
                    }
                >
                    <Picker.Item label="Pending" value="PENDING" />
                    <Picker.Item label="Ongoing" value="ONGOING" />
                    <Picker.Item label="Done" value="DONE" />
                </Picker>

                <CustomButton 
                    title="SAVE" 
                    onClick={this.saveTask}
                    disabled={ 
                        title === "" || 
                        description === "" ||
                        title === null ||
                        description === null
                    }
                />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    picker: {
        width: '100%',
        borderColor: '#D0CFCF',
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: '#FEFBFB',
    },
});

export default TaskDetailsScreen;
