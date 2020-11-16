import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

const middlewares = [logger, thunk];
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
