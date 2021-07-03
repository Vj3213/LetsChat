import { createStore } from "redux";
import users from "./reducers/users";

const store = createStore(users);
export default store;