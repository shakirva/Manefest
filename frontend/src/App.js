
import './App.css';
import Header from './components/layout/header/header';
import Footer from './components/layout/footer/footer';
import {BrowserRouter as Routes, Route} from 'react-router-dom';
import webfont from 'webfontloader';
import React from 'react';
import Home from './components/Home/home';
import Loader from './components/layout/Loader/Loader';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';




function App() {
  React.useEffect(() => { 
    webfont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }   
    });
  }, []);
  
  return (
    <Routes>
    <Header />
    <Route exact path="/" component={Home} />
    <Route exact path="/product/:id" component={ProductDetails} />
    <Route exact path="/products" component={Products} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/products/:keyword" component={Products} />
    <Footer />
    </Routes>
    
  );
}

export default App;
