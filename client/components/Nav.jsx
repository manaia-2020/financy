import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <header id="header" className="fixed-top ">
      <div className="container-fluid"></div>
      <h1 className="logo mr-auto">Financy</h1>
      <nav className="nav-menu d-none d-lg-block">
        <ul>
          <li className="active"><a href="">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Team</a></li>
          <li><a href="#login">Log In</a></li>
          <li><a href="#register">Register</a></li>
        </ul>
      </nav>
      <a href="#about" className="get-started-btn scrollto">Get Started</a>
    </header>
  )
}

export default Nav
