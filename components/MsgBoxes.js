import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const RightMsgBox = ({ msg }) => {
    return (
        <View style={[styles.mainContainer, { justifyContent: 'flex-end' }]}>
            <View style={[styles.msgBox, { backgroundColor: '#2541B2', borderTopLeftRadius: 5 }]}>
                <Text style={{ color: '#F0EBCC' }}>{msg}</Text>
            </View>
            <View style={[styles.triangle, { borderTopColor: '#2541B2' }]} />
        </View>
    )
}

const LeftMsgBox = ({ msg }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={[styles.triangle, { borderTopColor: '#E8F0F2', transform: [{rotate: '90deg'}] }]} />
            <View style={[styles.msgBox, { backgroundColor: '#E8F0F2', borderTopRightRadius: 5, marginLeft: -0.3 }]}>
                <Text style={{ color: '#125D98' }}>{msg}</Text>
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
        padding: 8,
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