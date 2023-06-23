
import './App.css';
import Header from './components/layout/Header/header';
import Footer from './components/layout/footer/footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import webfont from 'webfontloader';
import React,{Suspense,useState,useEffect} from 'react';
import Home from './components/Home/home';
import Loader from './components/layout/Loader/Loader';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from './components/User/profile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpadatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/cart/Cart.js";
import Shipping from "./components/cart/Shipping.js";
import ConfirmOrder from "./components/cart/ConfirmOrder.js";
import Payment from "./components/cart/Payment.js";
import axios from 'axios';
import ElementsLayout from './components/Route/ElementsLayout';
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess.js";
import OrderDetails from './components/Order/OrderDetails';
import MyOrders  from './components/Order/MyOrder';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/newProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import UserList from './components/Admin/UserList';
import Contact from './components/layout/Contact/Contact';
import About from './components/layout/About/About';
import NotFound from './components/layout/Not Found/NotFound';






function App() {
  // const BASE_URL = "http://localhost:4000"
  const { isAuthenticated, user } = useSelector((state) => state.user);

  //Get our Stripe(Payment Api)
  // const stripePromise = loadStripe('pk_test_51MnnMiSJSEx7GAMC1U3hdu6Idm0QiXAZ6m8twER2eOm2azGqit0AjNGIT6fL1wazxIt0A96K0Q0r5Q4AXIVUY6pE00vXjtHIdC');
  const [stripeApiKey, setStripeApiKey] = useState(process.env.STRIPE_API_KEY);
  async function getStripeApiKey() {
    const { data } = await axios.get(`/api/v1/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();

  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Suspense>
      <BrowserRouter>
    <Header />
    {isAuthenticated && <UserOptions user={user} />}

    <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          


          <Route exact path="/password/reset/:token" element={<ResetPassword />} />


          <Route element={<ProtectedRoute />}>
            <Route path='/account' element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/me/update' element={<UpdateProfile />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/password/update' element={<UpdatePassword />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path='/shipping' element={<Shipping />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/order/confirm' element={<ConfirmOrder />} />
          </Route>
        
          {stripeApiKey && (
            <Route
              element={<ElementsLayout stripe={loadStripe(stripeApiKey)} />}
            >
              <Route path="/process/payment" element={<Payment />} />
            </Route>
          )}
           <Route element={<ProtectedRoute />}>
            <Route path='/success' element={<OrderSuccess />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/orders' element={<MyOrders />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/order/:id' element={<OrderDetails/>} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/products' element={<ProductList />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/product' element={<NewProduct />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/product/:id' element={<UpdateProduct />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path='/admin/orders' element={<OrderList />} />
        </Route>
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path='/admin/order/:id' element={<ProcessOrder />} />
        </Route> <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path='/admin/users' element={< UserList />} />
        </Route>
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path='/admin/user/:id' element={<UpdateUser />} />
        </Route> <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path='/admin/reviews' element={<ProductReviews />} />
        </Route>

        <Route
          element={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
          
          
          
       

    </Routes>
        <Footer />
        </BrowserRouter>
        </Suspense >
  );
}

export default App;
