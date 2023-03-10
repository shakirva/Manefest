import React, { Fragment, useEffect } from "react";

import "./home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProducts } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

function Home () {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading,error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                <MetaData title="MANeFEST" />
      
                <div className="banner">
                  <p>Welcome to MANeFEST</p>
                  <h1>FIND AMAZING FASHIONS BELOW</h1>
      
                  <a href="#container">
                    <button>Scroll</button>
                  </a>
                </div>
      
                <h2 className="homeheading">Featured Products</h2>
      
                <div className="container" id="container">
                  {products &&
                    products.map((product) => (
                      <ProductCard  product={product} />
                      
                    ))}
                
                </div>
              </Fragment>
            
            )}
        </Fragment>
  );
};

export default Home;
