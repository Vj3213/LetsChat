import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ChatScreenHeader from '../components/ChatScreenHeader';
import ChatScreenFooter from '../components/ChatScreenFooter';
import { generateResponse, msgFormat, msgType } from '../constants/common';
import { LeftMsgBox, RightMsgBox } from '../components/MsgBoxes';
import DocumentPicker from 'react-native-document-picker';

const Chat = (props) => {
    const { dispatch, route: { params } } = props;
    const user = params.user || {};
    const chats = params.chats || [];

    const chatListValue = useRef();
    const [chatList, setChatList] = useState(chats);

    useEffect(() => {
        return saveChats;
    }, [])

    useEffect(() => {
        chatListValue.current = chatList;
        if (chatList[0]?.type == msgType.SENT) {
            setTimeout(showDummyResponse, 500);
        }
    }, [chatList])

    const saveChats = () => {
        dispatch({ type: 'UPDATE_CHATS', payload: { userId: user.id, chatList: chatListValue.current }})
    }

    const navigateBack = () => {
        props.navigation.goBack();
    }

    const showDummyResponse = () => {
        const sentMsg = chatList[0]?.data;
        if (sentMsg) {
            const dummyRes = generateResponse(sentMsg);
            setChatList([dummyRes, ...chatList])
        }
    }

    const onSend = (msg) => {
        setChatList([{ id: Date.now(), type: msgType.SENT, format: msgFormat.TXT, data: msg}, ...chatList]);
    }

    const onPressAttachment = async () => {
        try {
            const pickedFile = await DocumentPicker.pick();
            console.log("Picked---", pickedFile)
        } catch(error) {
            console.log(error)
        }
    }

    const renderItem = ({ item }) => {
        const { type, format, data } = item;
        if (format == msgFormat.TXT) {
            if (type == msgType.SENT) {
               return <RightMsgBox msg={data} />
            } else {
                return <LeftMsgBox msg={data} />
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
            <ChatScreenFooter onSend={onSend} onPressAttachment={onPressAttachment} />
        </View>
    )
}

export default connect()(Chat);

