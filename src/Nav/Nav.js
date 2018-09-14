import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import './style.css';

class Nav extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="sidenav">
        <div className="sidenavbar">
          <NavLink to='/page/home' activeClassName="active">Home </NavLink>
          <NavLink to='/page/intro' activeClassName="active">Get Started </NavLink>
          <NavLink to='/page/concepts' activeClassName="active">Main Concepts </NavLink>
          <NavLink to='/page/reference' activeClassName="active">API Reference </NavLink>
          <NavLink to='/page/libraries' activeClassName="active">Libraries </NavLink>
          <NavLink to='/page/contributors' activeClassName="active">Contributors </NavLink>
        </div>
      </div>
    )
  }
}

export default Nav;
