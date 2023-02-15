import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-stars'


function Product({product}) {
  
    const options = {
        size: 20,
        value: 4,
        edit: false,
        isHalf: true,
        activeColor: '#ffd700',
        };


    return (
    <Link className='productCard' to={product._id} >
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <ReactStars {...options} /> <span>(256 Reviews)</span>
        <span>{product.price}</span>
        
        </Link>
  )
}

export default Product