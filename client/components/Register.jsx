import React, { useState } from 'react'
import { connect } from 'react-redux'
import { register, isAuthenticated } from 'authenticare/client'
import { baseApiUrl as baseUrl } from '../config'

// import {  } from '../actions'
// import {  } from '../api/api'

function Register() {

    const [newUser, setNewUser] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const handleChange = (event) =>{
        event.preventDefault()
        const {name, value} = event.target
        setNewUser({...newUser,[name]:value})
    }
    
    const submitHandler = (event) => {
        event.preventDefault()
        const { firstName, lastName ,email, password, confirmPassword } = newUser
    
        if (password === confirmPassword) {
          register({ firstName, lastName, username: email, password }, { baseUrl })
            .then((token) => {
              if (isAuthenticated()) {
                  console.log('user added');
              }
            })
        }
    }
    return (
    <div>
        <input type='email' role='email' name='firstName' placeholder='Name' onChange={handleChange}></input>
        <input type='email' role='email' name='lastName' placeholder='Last Name' onChange={handleChange}></input>
        <input type='email' role='email' name='email' placeholder='example@gmail.com' onChange={handleChange}></input>
        <input type='password' role='password' name='password' placeholder='password' onChange={handleChange}></input>
        <input type='password' role='confirmPassword' name='confirmPassword' placeholder='confirm password' onChange={handleChange}></input>
        <button type="submit" onClick={submitHandler}>Register</button>
    </div>
  )
}

export default connect()(Register)