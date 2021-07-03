const initialState = {
    isLoading: true,
    data: null,
    isErrorOccurred: false
}

const users = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_USERS_DATA': {
            return {
                ...state,
                isLoading: true
            }
        }

        case 'FETCH_USERS_DATA_SUCCEED': {
            const { users: data } = action;
            return {
                ...state,
                isLoading: false,
                data
            }
        }

        case 'FETCH_USERS_DATA_FAILED': {
            return {
                ...state,
                isLoading: false,
                isErrorOccurred: true
            }
        }

        case 'DELETE_USER': {
            const { userId } = action;
            const filteredUser = state.data.filter(({ id }) => id != userId)
            return {
                ...state,
                data: filteredUser
            }
        }

        default:
            return state;
    }
}

export default users;