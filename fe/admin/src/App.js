import logo from './logo.svg';
import './App.css';
import Header from './Component/Header';
import Header_kh from './Component/Header_user';
import {BrowserRouter as Router,Switch,Route, Link, BrowserRouter,Redirect} from 'react-router-dom';
import Login from './Page/Login'; 
import Manage from './Page/Manage';
import {useHistory} from 'react-router-dom'
import Axios from 'axios'
import React ,{useState,useEffect}from 'react';

function App() {
  return (
    
      <BrowserRouter>
      <Switch>
        <LoginAuth path='/login' exact/>
        <Route>
          <div>
            <PrivateHeader/>
          </div>
          <Switch>
            <PrivateRoute path="/" component={Manage}exact/>
          </Switch>
        
         
        </Route>  
      </Switch>
    </BrowserRouter>

  );
}
function PrivateRoute({component: Component,...rest})
{
  const tokenString = sessionStorage.getItem('token');
      const ma = sessionStorage.getItem('maUser');
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
