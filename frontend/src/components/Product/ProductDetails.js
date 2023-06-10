import React, { Fragment, useEffect,useState} from 'react'
import "./ProductDetails.css"
import { useSelector, useDispatch } from 'react-redux'
import {getProductDetails} from '../../actions/productActions'
import Carousel from 'react-material-ui-carousel'
import Rating from '@material-ui/lab/Rating'


const ProductDetails = ({match}) => {

  const dispatch = useDispatch()
  const {product,loading,error, } = useSelector((state) => state.productDetails)
  
  
const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  
  useEffect(() => {
    dispatch(getProductDetails(match.params.id))
  }, [dispatch,match.params.id])

  

  return (
   <Fragment>
    <div className="ProductDetails"> 
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
    
    <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button >-</button>
                    <input  type="number" value="1" />
                    <button >+</button>
                  </div>
                  <button
                   
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button  className="submitReview">
                Submit Review
              </button>
            </div>
            </div>
          
    
    </Fragment>
  )
}

export default ProductDetails