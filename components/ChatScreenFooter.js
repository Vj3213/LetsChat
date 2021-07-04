import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatScreenFooter = ({ onSend }) => {
    const [msg, setMsg] = useState('');
    const shouldSendMsgDisable = msg.length === 0;

    const onPressSend = () => {
        onSend(msg);
        setMsg('')
    }

    return (
        <View style={styles.container}>
                <View style={styles.inputBoxContainer}>
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Type a message'
                        placeholderTextColor='#C0C0C0'
                        value={msg}
                        onChangeText={setMsg}
                        multiline
                    />
                    <TouchableOpacity style={styles.attachmentIcon}>
                        <Icon
                            name='attachment'
                            size={30}
                            color='#808080'
                        />
                    </TouchableOpacity>
            </View>
            <View style={{opacity: shouldSendMsgDisable ? 0.6 : 1}}>
                <TouchableOpacity 
                    disabled={shouldSendMsgDisable} 
                    style={styles.sendBtnCont}
                    onPress={onPressSend}
                >
                    <Icon
                        name='send'
                        size={24}
                        color='#fff'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 8
    },
    inputBoxContainer: {
        flex: 1,
        minHeight: 44,
        maxHeight: 100,
        flexDirection: 'row',
        borderWidth: 1,
        backgroundColor: 'rgba(192,192,192, 0.3)',
        borderColor: '#A9A9A9',
        borderRadius: 22,
        marginRight: 5
    },
    sendBtnCont: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#2541B2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        flex: 1, 
        marginLeft: 8, 
        color: '#000000',
        fontSize: 16
    },
    attachmentIcon: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft: 8, 
        marginRight: 8
    }
})

export default ChatScreenFooter;

