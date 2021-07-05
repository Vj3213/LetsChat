import React from 'react';
import { SafeAreaView, View, Text, StatusBar, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { data } from '../constants/data';

const Home = (props) => {
    const { chats, navigation: { navigate } } = props;

    const renderItem = ({ item }) => {
        const { id, name, image } = item;
        const lastMsg = chats[id] && chats[id][0] && chats[id][0].data;
        return (
            <TouchableOpacity style={styles.userContainer} onPress={() => navigate('Chat', { user: item, chats: chats[id] })}>
                <Image
                    source={{ uri: image }}
                    style={styles.photo}
                />
                <View style={styles.userDetailsContainer}>
                    <Text style={styles.name}>{name}</Text>
                    {
                        lastMsg ? <Text style={{color: 'gray'}}>{lastMsg}</Text> : null
                    }
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

const mapStateToProps = (state) => ({ chats: state.data })

export default connect(mapStateToProps)(Home);

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
        justifyContent: 'center'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.9,
        marginBottom: 3
    },
    itemSeparator: {
        height: 1,
        backgroundColor: '#D1D9D9',
        marginRight: 12,
        marginLeft: 80,
        opacity: 0.4
    }
})

