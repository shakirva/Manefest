import React, { Fragment } from 'react'
import './home.css'
import Product from './product.js'

const product= {
    name: 'white shirt',
    images: [{url:"https://i.ibb.co/DRST11n/1.webp"}],
    price: 1000,
    _id:"shakir",
}


function home() {
  return (
   <Fragment>
        <div className="banner">
            <p> Welcome To MANeFEST</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href="#container">
                    <button>
                        Scroll 
                    </button>
                </a>
            
            </div>
            <h2 className='homeheading'>Featured Products</h2>
            <div className='container' id='container'>
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />

            </div>

           </Fragment>
  )
}

export default home