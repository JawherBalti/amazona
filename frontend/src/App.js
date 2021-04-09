import React from 'react'
import Home from './views/Home';
import Product from './views/Product';
import { Route } from 'react-router-dom'
import Cart from './views/Cart';
import {Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function App() {
  const cart = useSelector(state => state.cartReducer)
  return (

    <div className="grid-container">
      <header className="row">
        <div>
          <Link to="/" className="brand">amazona</Link>
        </div>
        <div>
          <Link to="/cart">Cart {cart.cartItems.length > 0 && (
            <span className="badge">{cart.cartItems.length}</span>
          )}</Link>
          <Link to="/signin">Sign in</Link>
        </div>
      </header>
      <main>
        <Route exact path="/cart/:id?" component={Cart}></Route>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/product/:id" component={Product}></Route>
      </main>
      <footer className="row center">All rights reserved</footer>
    </div>

  );
}

export default App;
