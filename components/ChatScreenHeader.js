import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatScreenHeader = ({ user, navigateBack }) => {
    const { name, image } = user;
    return (
        <View style={styles.container}>
            <Icon.Button
                name='arrow-back'
                size={24}
                color='#fff'
                backgroundColor='transparent'
                underlayColor='transparent'
                onPress={navigateBack}
            />
            <Image
                source={{ uri: image }}
                style={styles.photo}
            />
            <Text style={styles.name}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60, 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2541B2'
    },
    photo: {
        width: 40,
        height: 40,
        borderRadius: 27.5
    },
    name: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 16
    }
})

export default ChatScreenHeader;

