import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCartHandler = (id) => {
    const selectedProduct = products.find(product => product.id === id);
    setCart(cart => {
      if(!cart.includes(selectedProduct)){
        return [...cart, selectedProduct ]
      }
      else{
        return [...cart];
      }
    });
}

const productDeleteHandler = (id) => {
    const updatedCart = cart.filter(product => product.id !== id);
    setCart(updatedCart);
}
  return (
    <Switch>
      <Route path="/" exact>
        <Homepage />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/register" exact>
        <Register />
      </Route>
      <Route path="/products" exact>
        <Products addToCart={addToCartHandler} removeFromCart={productDeleteHandler} cart={cart} products={products} setProducts={setProducts}/>
      </Route>
      <Route path="/cart" exact>
        <Cart products={cart} deleteFromCart={productDeleteHandler}/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  );
}

export default App;