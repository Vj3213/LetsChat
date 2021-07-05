import { createStore } from "redux";
import chats from "./reducers/chats";

const store = createStore(chats);
export default store;