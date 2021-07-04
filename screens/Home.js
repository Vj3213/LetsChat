import React from 'react';
import { SafeAreaView, View, Text, StatusBar, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { RightMsgBox, LeftMsgBox } from '../components/MsgBoxes';
import { data } from '../constants/data';

const Home = (props) => {

    const navigateTo = () => {

    }

    const renderItem = ({ item }) => {
        const { id, name, image } = item;
        return (
            <TouchableOpacity style={styles.userContainer} onPress={() => props.navigation.navigate('Chat', { user: item })}>
                <Image
                    source={{ uri: image }}
                    style={styles.photo}
                />
                <View style={styles.userDetailsContainer}>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderItemSeparator = () => {
        return <View style={styles.itemSeparator} />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor='#2541B2' />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={renderItemSeparator}
            />
        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: 'row', 
        paddingHorizontal: 12, 
        paddingVertical: 7.5
    },
    photo: {
        width: 52,
        height: 52,
        borderRadius: 27.5,
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.2)'
    },
    userDetailsContainer: {
        flex: 1, 
        marginHorizontal: 16, 
        paddingVertical: 8
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.9
    },
    itemSeparator: {
        height: 1,
        backgroundColor: '#D1D9D9',
        marginRight: 12,
        marginLeft: 80,
        opacity: 0.4
    }
})
