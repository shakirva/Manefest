import {
   createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import {productreducers} from "./reducer/productreducer";
import { composeWithDevTools } from "redux-devtools-extension";


const reducer = combineReducers({
  // Add reducers here
  products: productreducers,
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
