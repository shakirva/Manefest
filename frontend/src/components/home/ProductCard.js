import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-stars'


const    ProductCard =({product}) => {
  
    const options = {
        size: 20,
        value: product.ratings,
        edit: false,
        isHalf: true,
        activeColor: '#ffd700',
        };


    return (
    <Link className='productCard' to={`/product/${product._id}`
    } >
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <ReactStars {...options} /> <span>({product.numOfReviews}256 Reviews)</span>
        <span>{`₹${product.price}`}</span>
        
        </Link>
  )
}

export default ProductCard