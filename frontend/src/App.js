import React from 'react'
import Home from './views/Home';
import Product from './views/Product';
import { Route } from 'react-router-dom'
import Cart from './views/Cart';

function App() {
  return (

    <div className="grid-container">
      <header className="row">
        <div>
          <a href="/" className="brand">amazona</a>
        </div>
        <div>
          <a href="/cart">Cart</a>
          <a href="/signin">Sign in</a>
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
