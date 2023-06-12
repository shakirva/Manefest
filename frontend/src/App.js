
import './App.css';
import Header from './components/layout/Header/header';
import Footer from './components/layout/footer/footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import webfont from 'webfontloader';
import React,{Suspense} from 'react';
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






function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => { 
    webfont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }   
    });
    store.dispatch(loadUser());
  }, 
  []);
  
  return (
    <Suspense>
      <BrowserRouter>
    <Header />
    {isAuthenticated && <UserOptions user={user} />}

    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/login" element={<LoginSignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/account' element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/me/update' element={<UpdateProfile />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/password/update' element={<UpdatePassword />} />
          </Route>
          <Route exact path="/password/forgot" component={ForgotPassword} />

          <Route exact path="/password/reset/:token" component={ResetPassword} />

    </Routes>
        <Footer />
        </BrowserRouter>
        </Suspense >
  );
}

export default App;
