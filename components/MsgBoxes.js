import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { msgFormat } from '../constants/common';
import FileViewer from 'react-native-file-viewer';

const deviceWidth = Dimensions.get('window').width;

const MsgContent = ({ msg, type, extraData }) => {
    const openFile = (uri) => {
        FileViewer.open(uri)
        .then(() => console.log("Success"))
        .catch(error => console.log(error))
    }

    if (type == msgFormat.TXT) {
        return <Text style={{ color: '#F0EBCC', margin: 5 }}>{msg}</Text>
    } else if (msgFormat[type] === msgFormat.IMG) {
        return (
            <TouchableOpacity onPress={() => openFile(msg)}>
                <Image
                    source={{ uri: msg }}
                    style={{ width: 250, height: 200 }}
                />
            </TouchableOpacity>
        )
    } else if (msgFormat[type] === msgFormat.VID) {
        return (
            <ImageBackground
                source={{ uri: msg }}
                style={{ width: 250, height: 200, justifyContent: 'center', alignItems: 'center' }}
            >
                <Icon.Button
                    name='play'
                    size={32}
                    color='rgba(255, 255, 255, 0.5)'
                    backgroundColor='transparent'
                    underlayColor='transparent'
                    onPress={() => openFile(msg)}
                />
            </ImageBackground>
        )
    } else if (msgFormat[type] === msgFormat.PDF) {
        return (
            <TouchableOpacity onPress={() => openFile(extraData)}>
                <Image
                    source={{ uri: msg }}
                    style={{ width: 250, height: 200 }}
                />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={() => openFile(msg)}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 3}}>
                    <Icon 
                        name='md-document-text-outline'
                        size={65}
                        color='#2541B2'
                    />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2541B2' }}>Document</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const RightMsgBox = (props) => {
    return (
        <View style={[styles.mainContainer, { justifyContent: 'flex-end' }]}>
            <View style={[styles.msgBox, { backgroundColor: '#2541B2', borderTopLeftRadius: 5 }]}>
                <MsgContent {...props} />
            </View>
            <View style={[styles.triangle, { borderTopColor: '#2541B2' }]} />
        </View>
    )
}

const LeftMsgBox = ({ msg }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={[styles.triangle, { borderTopColor: '#E8F0F2', transform: [{ rotate: '90deg' }] }]} />
            <View style={[styles.msgBox, { backgroundColor: '#E8F0F2', borderTopRightRadius: 5, marginLeft: -0.3 }]}>
                <Text style={{ color: '#125D98', margin: 5 }}>{msg}</Text>
            </View>
        </View>
    )
}

export { LeftMsgBox, RightMsgBox };

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 2
    },
    msgBox: {
        minWidth: deviceWidth * 0.2,
        minHeight: 40,
        maxWidth: deviceWidth * 0.75,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding: 3,
        justifyContent: 'center'
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 10,
        borderRightWidth: 10,
        borderRightColor: 'transparent'
    }
})