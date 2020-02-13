import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import LogoutButton from '../components/LogoutButton'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { createTask } from '../api/api'
import AsyncStorage from '@react-native-community/async-storage';

class NewTaskScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: null,
            description: null,
            user: null
        }
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

    createNewTask = () => {
        const { title, description, user } = this.state
        const newTask = {
            title,
            description,
            userId: user.id
        }

        createTask(newTask, user.token).then(({ data }) => {
            user.tasks.push(data)
            AsyncStorage.setItem('user', JSON.stringify(user)).then(res => {
                this.props.navigation.navigate('TODOListScreen')
            })
        }).catch(err => console.log(err))
        
    }

    render() {
        const { title, description } = this.state
        return (
            <View style={{ margin: 10, marginTop: 70 }}>
            
                <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 10 }}>
                    New Task
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
               
                
                <CustomButton 
                    title="CREATE" 
                    onClick={this.createNewTask} 
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

export default NewTaskScreen;