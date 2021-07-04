import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import ChatScreenHeader from '../components/ChatScreenHeader';
import ChatScreenFooter from '../components/ChatScreenFooter';
import { msgFormat, msgType } from '../constants/common';
import { RightMsgBox } from '../components/MsgBoxes';

const Chat = (props) => {
    const user = props.route.params.user || {};
    const [chatList, setChatList] = useState([]);

    const navigateBack = () => {
        props.navigation.goBack();
    }

    const onSend = (msg) => {
        setChatList([{ id: Date.now(), type: msgType.SENT, format: msgFormat.TXT, data: msg}, ...chatList]);
    }

    const renderItem = ({ item }) => {
        const { type, format, data } = item;
        if (format == msgFormat.TXT) {
            if (type == msgType.SENT) {
               return <RightMsgBox msg={data} />
            }
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ChatScreenHeader user={user} navigateBack={navigateBack} />
            <FlatList
                style={{ marginBottom: 60 }}
                data={chatList}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                inverted
            />
            <ChatScreenFooter onSend={onSend} />
        </View>
    )
}

export default Chat;

