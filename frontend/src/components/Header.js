import logo from '../images/Vector.svg';
import React from "react";
import { Route, Link, Switch } from "react-router-dom";

function Header({ email, onSignOut }) {

    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="логотип" />

        <Switch>
        <Route exact path='/'>
          <div className='header__auth-container'>
            <p className='header__auth-email'>{email}</p> 
            <button className='header__logout-link' onClick={onSignOut}>Выйти</button>
          </div>
        </Route>

        <Route path='/sign-up'>
          <Link className='header__login-link' to='sign-in'>Войти</Link>
        </Route>
        <Route path='/sign-in'>
          <Link className='header__login-link' to='sign-up'>Регистрация</Link>
        </Route>
      </Switch>

      </header>
    )
  }
  
export default Header