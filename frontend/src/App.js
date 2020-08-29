import React, { useState } from 'react';

import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SigninScreen from './screens/SigninScreen';

import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen'
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import Checkorder from './screens/Checkorder';
import OrderScreen from './screens/OrderSCreen';
import ProfileScreen from './screens/ProfileScreen';
import RestaurentReg from './screens/RestaurentReg';
import RestaurentSignin from './screens/RestaurentSignin';
import OrdersScreen from './screens/Checkorder';
import Checkorderlist from './screens/Checkorderlist';
import Test from './screens/Test';


function App() {

  const [show, setShow] = useState(true);
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const restaurentSignin = useSelector(state => state.restaurentSignin);
  const { restInfo } = restaurentSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }


  return (
    <BrowserRouter>

      <div className="grd-container">
        <header className="header">
          <div className="brand">
            <button style={{ height: "40px", width: "20px" }} onClick={openMenu}>
              &#9776;
        </button>
            <Link to="/" style={{ marginLeft: "10px" }}>FoodShala</Link>

          </div>
          <div className="header-links">

            <Link to="/cart" style={{ marginRight: "7px" }}>Cart</Link>
            {

              userInfo || restInfo ? <Link to="/profile">Profile</Link> :
                <Link to="/signin">
                  Sign In
         </Link>
            }

            {userInfo && userInfo.isAdmin || restInfo && (
              <div className="dropdown">
                <a href="#"  >Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/checkorders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}


          </div>
        </header>

        <aside className="sidebar">
          <h3>Food catogaries</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>X</button>
          <ul className="side-ul">
            <li>
              <Link to="#">Sweets</Link>
            </li>
            <li>
              <Link to="#">Chinese</Link>
            </li>
            <li>
              <Link to="#">Indian</Link>
            </li>
            <li>
              <Link to="#">Thai</Link>
            </li>
          </ul>


        </aside>


        <main className="main">
          <div className="content>">
            {
              restInfo ?
                <div>
                  <Route path="/checkorders" component={Checkorder} />
                  <Route path="/order/:id" component={Checkorderlist} />

                </div>
                :
                <div>
                  <Route path="/orders" component={OrdersScreen} />,
                <Route path="/order/:id" component={OrderScreen} />
                </div>
            }

            <Route path="/profile" component={ProfileScreen} />
            <Route path="/test" component={Test} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/restaurentregister" component={RestaurentReg} />
            <Route path="/restaurentsignin" component={RestaurentSignin} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />

          </div>
        </main>
        <footer className="footer" style={{ marginTop: '200px' }} >
          All rights reserved
    </footer>
      </div>
    </BrowserRouter>

  );
}

export default App;
