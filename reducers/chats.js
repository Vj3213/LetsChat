const initialState = {
    data: {}
}

const chats = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_CHATS': {
            const { userId, chatList } = action.payload;
            return {
                ...state,
                data: {
                    ...state.data,
                    [userId]: chatList
                }
            }
        }

        default:
            return state;
    }
}

export default chats;