import { createStore } from "redux";
import rootReducer from "../reducers/index.js";
// import { forbiddenWordsMiddleware } from "../middleware";
// const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
//   storeEnhancers
);
export default store;