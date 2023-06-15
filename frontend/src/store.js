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
import { cartReducer } from "./reducer/cartReducer";
import { forgotPasswordReducer } from "./reducer/userReducer";


const reducer = combineReducers({
  // Add reducers here
  products: productReducers,
  productDetails: productDetailsReducer,
  user:userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  


});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
