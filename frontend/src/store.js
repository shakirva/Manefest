import {
   createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import {productReducers,productDetailsReducer} from "./reducer/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducer/userReducer";
import { profileReducer } from "./reducer/userReducer";


const reducer = combineReducers({
  // Add reducers here
  products: productReducers,
  productDetails: productDetailsReducer,
  user:userReducer,
  profile: profileReducer,

});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
