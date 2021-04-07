import React from 'react'
import Products from '../components/Products';
import data from '../data'

export default function Home() {
    return (
        <div>
          <div className="row center">
            {data.products.map(product => (
              <Products key={product._id} product={product}></Products>
            ))}
          </div>
        </div>
    )
}
