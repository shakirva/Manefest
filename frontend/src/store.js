import {
   createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import {productReducers,productDetailsReducer} from "./reducer/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";


const reducer = combineReducers({
  // Add reducers here
  products: productReducers,
  productDetails: productDetailsReducer
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
