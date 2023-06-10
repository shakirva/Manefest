# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


PRODUCT DETAILS LE CODUKAL

import React, { Fragment, useEffect } from 'react'
import { Carousel } from 'react-material-ui-carousel'
import "./ProductDetails.css"
import { useSelector, useDispatch } from 'react-redux'
import {getProductDetails} from '../../actions/productActions'



const ProductDetails = ({match}) => {

  const dispatch = useDispatch()
  const { product,loading,error } = useSelector((state) => state.productDetails)
  
  useEffect(() => {
    dispatch(getProductDetails(match.params.id))
  }, [dispatch,match.params.id])

  

  return (
   <Fragment>
    <div className="product-details"> 
    <div>
      <Carousel>
        {product.images && product.images.map((item, i) => (
          <img
          className='CarouselImage'
          key={item.url}
          src={item.url}
          alt={`${i} Slide`}
          />
        ))}
         </Carousel>
    </div>
    </div>
    
    </Fragment>
  )
}

export default ProductDetails











import React ,{Fragment,useEffect, useState} from 'react'
import "./Products.css"
import { useSelector,useDispatch } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import Loader from '../layout/Loader/Loader'    
import ProductCard from '../Home/ProductCard'
import Pagination from "react-js-pagination";
import { Typography, Slider } from "@material-ui/core";

const Products = ({match}) => {
    const dispatch = useDispatch();

    const keyword = match.params.keyword;
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    


    const {products,loading,error,productsCount, resultPerPage} = useSelector(state => state.products);
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };
    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
        };

        
    
    useEffect(() => {
        
        dispatch(getProducts(keyword, currentPage, price));
    }, [dispatch, keyword, currentPage, price]);


  return <Fragment> 
        {loading ? <Loader /> : 
        <Fragment>
            <h1 className="productsHeading">Latest Products</h1>
            <div className='products'>
                {products.map(product => (
                    <ProductCard key={product._id} product={product}  />
                ))}
            </div>

            <div className="filterBox">
            <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={50000}
                />
            </div>
            
            {
                resultPerPage <= productsCount && (
                    <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>)
            }
          
        </Fragment>
        }
    </Fragment>

}


export default Products 










import React ,{Fragment,useEffect, useState} from 'react'
import "./Products.css"
import { useSelector,useDispatch } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import Loader from '../layout/Loader/Loader'    
import ProductCard from '../Home/ProductCard'
import Pagination from "react-js-pagination";
import { Typography, Slider } from "@material-ui/core";

const Products = ({match}) => {
    const dispatch = useDispatch();

    const keyword = match.params.keyword;
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    


    const {products,loading,error,productsCount, resultPerPage} = useSelector(state => state.products);
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };
    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
        };

        
    
    useEffect(() => {
        
        dispatch(getProducts(keyword, currentPage, price));
    }, [dispatch, keyword, currentPage, price]);


  return <Fragment> 
        {loading ? <Loader /> : 
        <Fragment>
            <h1 className="productsHeading">Latest Products</h1>
            <div className='products'>
                {products.map(product => (
                    <ProductCard key={product._id} product={product}  />
                ))}
            </div>

            <div className="filterBox">
            <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={50000}
                />
            </div>
            
            {
                resultPerPage <= productsCount && (
                    <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>)
            }
          
        </Fragment>
        }
    </Fragment>

}


export default Products 