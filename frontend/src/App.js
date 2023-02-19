
import './App.css';
import Header from './components/layout/header/header';
import Footer from './components/layout/footer/footer';
import {BrowserRouter as Routes, Route} from 'react-router-dom';
import webfont from 'webfontloader';
import React from 'react';
import Home from './components/Home/home';
import Loader from './components/layout/Loader/Loader';




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
    <Route exact path="/sad" component={Loader} />
    <Footer />
    </Routes>
    
  );
}

export default App;
