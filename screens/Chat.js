import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, ToastAndroid, AlertIOS, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ChatScreenHeader from '../components/ChatScreenHeader';
import ChatScreenFooter from '../components/ChatScreenFooter';
import { generateResponse, msgFormat, msgType } from '../constants/common';
import { LeftMsgBox, RightMsgBox } from '../components/MsgBoxes';
import DocumentPicker from 'react-native-document-picker';
import PdfThumbnail from "react-native-pdf-thumbnail";
import RNFS from 'react-native-fs';

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
        if (chatList[0]?.type == msgType.SENT && chatList[0]?.format == msgFormat.TXT) {
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

    const onFileSelected = (fileFormat, filePath, extraData) => {
        setChatList([{ id: Date.now(), type: msgType.SENT, format: fileFormat, data: filePath, extraData }, ...chatList]);
    }

    const onVideoSelected = (fileName, contentURI, fileFormat) => {
        try {
            const tempPath = `file://${RNFS.DocumentDirectoryPath }/${fileName}`
            RNFS.copyFile(contentURI, tempPath);
            onFileSelected(fileFormat, tempPath);
        } catch (error) {
            console.log(error)
        }
    }

    const showToast = (msg, title) => {
        if (Platform.OS == 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            AlertIOS.alert(title, msg);
        }
    }

    const onPressAttachment = async () => {
        try {
            const pickedFile = await DocumentPicker.pick({
                type: [
                    DocumentPicker.types.images, 
                    DocumentPicker.types.plainText, 
                    DocumentPicker.types.pdf, 
                    DocumentPicker.types.doc, 
                    DocumentPicker.types.docx, 
                    DocumentPicker.types.ppt, 
                    DocumentPicker.types.pptx,
                    DocumentPicker.types.video,
                    DocumentPicker.types.audio
                ]
            });
            if (pickedFile) {
                const { type, uri, size } = pickedFile;
                const fileFormat = msgFormat[type];

                if (fileFormat === msgFormat.VID) {
                    if (size < 30000000) {
                        onVideoSelected(pickedFile.name, pickedFile.uri, pickedFile.type)
                    } else {
                        showToast('Video size is greater than 30 MB', 'Error');
                    }
                } else if (fileFormat === msgFormat.PDF) {
                    const { uri: thumbnailURI } = await PdfThumbnail.generate(uri, 0);
                    onFileSelected(type, thumbnailURI, uri);
                } else if (fileFormat || type.startsWith('application/')) {
                    onFileSelected(type, uri);
                } else {
                    showToast('This type of file is not supported', 'Error');
                }
            }            
            
        } catch(error) {
            console.log(error)
        }
    }

    const renderItem = ({ item }) => {
        const { type, format, data, extraData } = item;
        if (type == msgType.SENT) {
            return <RightMsgBox msg={data} type={format} extraData={extraData} />
        } else {
            return <LeftMsgBox msg={data} />
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
            {/* {
                <View style={styles.modal}>
                    <View style={styles.attachOptionsCont}>
                        <View>

                        </View>
                    </View>
                </View>
            } */}
        </View>
    )
}

export default connect()(Chat);

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 32,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    attachOptionsCont: {
        width: '100%',
        height: 200
    },
    options: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

