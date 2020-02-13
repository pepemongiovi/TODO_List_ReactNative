import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Task  from './Task'

const TaskList = ({ tasks, navigation }) => {  
    if(tasks.length === 0) {
        return (
            <Text style={{ color: 'red', textAlign: 'center' }}>
                No tasks available. Click on the button bellow to create a new task!
            </Text>
        )
    }
    else {
        return (
            <View style={{ borderWidth: 1.5, padding: 5 }}>
                <FlatList
                    ItemSeparatorComponent={() =>
                        <View style={{ height: 1, width: '100%', color: 'grey', borderBottomWidth: 0.5 }} />
                    }
                    data={tasks}
                    renderItem={({item}) => 
                        <Task task={item} navigation={navigation} />
                    }
                />
            </View>
        )
    }        
    
};

export default TaskList;