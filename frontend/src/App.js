import React from 'react'
import Home from './views/Home';
import Product from './views/Product';
import Signin from './views/Signin'
import Register from './views/Register'
import { Route } from 'react-router-dom'
import Cart from './views/Cart';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/user';
import Shipping from './views/Shipping';
import Payment from './views/Payment';
import PlaceOrder from './views/PlaceOrder';
import Order from './views/Order';
import OrderHistory from './views/OrderHistory';
import Profile from './views/Profile';

function App() {
  const cart = useSelector(state => state.cartReducer)
  const currentUser = useSelector(state => state.userSignInReducer)

  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout())
  }
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
          {
            currentUser.userInfo ? (
              <div className="dropdown">
                <Link to="#">{currentUser.userInfo.data.user.name} <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                  </li>
                </ul>
              </div>
            ) : <Link to="/signin">Sign in</Link>
          }
        </div>
      </header>
      <main>
        <Route exact path="/cart/:id?" component={Cart}></Route>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/product/:id" component={Product}></Route>
        <Route exact path="/signin" component={Signin}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/shipping" component={Shipping}></Route>
        <Route exact path="/payment" component={Payment}></Route>
        <Route exact path="/placeorder" component={PlaceOrder}></Route>
        <Route exact path="/order/:id" component={Order}></Route>
        <Route exact path="/orderhistory" component={OrderHistory}></Route>
        <Route exact path="/profile" component={Profile}></Route>

      </main>
      <footer className="row center">All rights reserved</footer>
    </div>

  );
}

export default App;
