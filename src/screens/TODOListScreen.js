import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import TaskList from '../components/TaskList'
import CustomButton from '../components/CustomButton'
import LogoutButton from '../components/LogoutButton'
import AsyncStorage from '@react-native-community/async-storage';

class TODOListScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
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

    setUser = () => {
        AsyncStorage.getItem('user').then(user => {
            this.setState({ user: JSON.parse(user) })
        })
    }

    componentDidMount() {
        this.setUser()
        this.willFocusListener = this.props.navigation.addListener(
            'willFocus',
            () => this.setUser()
        )
    }

    componentWillUnmount() {
        this.willFocusListener.remove()
    }
    
    render() {
        return (
            <View style={{ margin: 10, marginTop: 70 }}>
                <View style={{ height: Dimensions.get("window").height - 200 }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 17 }}>
                        My Tasks
                    </Text>
                    { !this.state.user ? null :
                        <TaskList 
                            navigation={this.props.navigation}
                            tasks={this.state.user.tasks} 
                        />
                    }
                </View>
                <View style={{ bottom: 0, width: '100%', marginTop: 60 }}>
                    <CustomButton 
                        title="NEW TASK" 
                        onClick={() => this.props.navigation.navigate('NewTaskScreen')} 
                    />
                </View>
            </View>
        )
    }
};

export default TODOListScreen;
