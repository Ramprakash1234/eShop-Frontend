import * as actions from './actions/cartAction'
import {BrowserRouter as Router, Route, Switch, Link, useParams} from 'react-router-dom';
import Navbar from './components/Navbar';
import AllProducts from './components/AllProducts';
import Cart from './components/Cart';
import SingleProduct from './components/SingleProduct';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';
import { useState } from "react";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
const App=(props) => {
  //const [cart,updateCart]=useState([]);
  const [searchPattern,changeSearchPattern]=useState('');
  const [sortType,changeSortType]=useState('none')
  // console.log(searchPattern)
  const filterProducts = (e) =>{
    changeSearchPattern(e.target.value)
  }
  const sortProducts=(sortType)=>{
    changeSortType(sortType);
  }
  const modifyCart =async(prod,op)=>{
    //console.log(prod)
    const isAvailable=await props.cart.find((cartItem)=>cartItem.id==prod._id);
    //console.log(isAvailable)
    if(isAvailable){
      
      let newCart=await props.cart.map((cartItem)=>{
        if(cartItem.id==prod._id && op=='add'){
          return {...cartItem,qty:cartItem.qty+1}
        }else if(cartItem.id==prod._id && op=='sub'){
          return {...cartItem,qty:cartItem.qty-1}
        }else if(cartItem.id==prod._id && op=='remove'){
          return 'empty'
        }
        return {...cartItem}
      })
      // console.log(newCart)
      newCart=newCart.filter((item)=>item!='empty');
      updateCart([...newCart])
    }else{
      //console.log(prod)
      console.log('going to idspatch')
      props.dispatch(actions.newAction(prod))
      //updateCart([...cart,{id:prod._id,title:prod.title,description:prod.description,image:prod.image,price:prod.price,qty:1}]);
    }
  }
  return (
    <Router>
      {console.log(props)}
      <Navbar filterProducts={filterProducts} sortProducts={sortProducts}/>
      <Switch>
        <Route path="/" exact >
          <AllProducts searchPattern={searchPattern} sortType={sortType}/>
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path="/login">
          <h1>Login page</h1>
        </Route>
        <Route path="/signup">
          <h1>sign up page</h1>
        </Route>
        <Route path="/checkout" exact> 
          <Checkout /> 
        </Route>
        <Route path="/payment" exact> 
          <Payment /> 
        </Route>
        <Route path="/confirm" exact> 
          <Confirmation /> 
        </Route>
        <Route path="/:id" exact> 
          <SingleProduct/> 
        </Route>
        
        <p className="ui center aligned">
          <h1>
            Wrong route <Link to="/login">Go Home</Link>
          </h1>
        </p>
      </Switch>
    </Router>
  );
}

const stateToProps=(cartState)=>({
    cart:cartState.cartReducer
})

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps)(App);
