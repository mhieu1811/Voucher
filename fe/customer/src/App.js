import logo from './logo.svg';
import './App.css';
import Home from './Page/Home';
import Header from './Component/Header';
import {BrowserRouter as Router,Switch,Route, Link, BrowserRouter,useHistory,Redirect} from 'react-router-dom';
import Footer from './Component/Footer';
import Header_kh from './Component/Header_user';
import Detail from './Page/Detail';
import Login from './Page/Login';
import Payment  from './Page/Payment';
import ListV from './Page/ListVoucher_kh';
import Axios from 'axios'
import React, { useEffect, useState, useRef} from 'react'
import Paypal from './Component/PayPal';
import Detail_damua from './Page/Detail_damua';
function App() {
  const history =useHistory()
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={LoginAuth}/>
        <Route>
          <div>
            <PrivateHeader/>
          </div>
          <Switch>
            <Route path='/info' component={ListV}/>
            <Home path='/' exact/>
            <Route path='/detail/:id' component={Detail}/>
            <PrivateRoute path='/payment/:id' component={Payment}/>
            <PrivateRoute path='/detail_mua/:id/:ma' component={Detail_damua}/>
            <Route path='/checkout' component={Paypal}/>
          </Switch>
        
          <div>
            <Footer/>
          </div>
        </Route>  
      </Switch>
      
      
    </BrowserRouter>
      
    
  );
}
function PrivateRoute({component: Component,...rest})
{
  const tokenString = sessionStorage.getItem('token');
      const ma = sessionStorage.getItem('maUser');
      useEffect(()=>{
        Axios.post('http://localhost:9000/partner/getma',{ma:ma})
      },[])
      var bool
      if(tokenString=='true')
      {
        bool=true
      }
      else
      {
        bool=false
      }
      return (
        <Route
      {...rest}
      render={props =>
        
        bool ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
      );
}
function PrivateHeader({  ...rest })
    {
      const history=useHistory()
      const tokenString = sessionStorage.getItem('token');
      const type = sessionStorage.getItem('type');
      
      var bool
      if(tokenString=='true')
      {
        bool=true
      }
      return (
        <Route
      {...rest}
      render={props =>

        {if( bool==true)
        {
            return <Header_kh/>
        }
        else
        {
          return <Header/>
        }
      }
      }
    />
      );
    }


    function LoginAuth (){
      
      const log=(e,type)=>{
        sessionStorage.setItem('token', true);
        sessionStorage.setItem('maUser', e);
        sessionStorage.setItem('type', type);
        
      }    
      const noti=(type)=>{
        
      }
      return(
        <Login setLogin={log} />
      )
      
      
    }
export default App;
