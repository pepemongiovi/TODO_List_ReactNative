import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get("window").width

class Task extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hideDescription: true
        }
    }

    viewTaskDetails = () => {
        this.props.navigation.navigate('TaskDetailsScreen', {
            task: this.props.task
        })
    }

    render() {
        const { task } = this.props
        return (
            <View style={{ flexDirection:"row" }}>
                    <Icon name="edit" size={25} style={{ marginTop: 10 }} 
                        onPress={this.viewTaskDetails} color="#999" 
                    />

                    <TouchableOpacity onPress={() => this.setState({ hideDescription: !this.state.hideDescription})}>
                        <Text 
                            style={{ 
                                fontSize: 20, 
                                margin: 10,
                                color: task.status === "PENDING" ? 'red' : 
                                task.status === "ONGOING" ? 'orange' : 'green' 
                                
                            }}
                        >
                            {task.title}
                        </Text>
                        { this.state.hideDescription ? null :
                            <Text style={{ marginLeft: 10, marginBottom: 5, 
                                color: 'grey', width: windowWidth*0.8 }}
                            >
                                {task.description}
                            </Text>
                        }
                    </TouchableOpacity>
            </View>
        )
    }
};

export default Task;