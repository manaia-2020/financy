import React, { useState } from 'react'
import { connect } from 'react-redux'
import { register, isAuthenticated } from 'authenticare/client'
import { baseApiUrl as baseUrl } from '../config'

import {  } from '../actions'
import {  } from '../api/api'

function Register() {

    const [newUser] = useState({})


  return (
    <div>
        <input type='email' role='email' name='email' placeholder='example@gmail.com' onChange={emailHandler}></input>
        <input type='password' role='password' name='password' placeholder='password' onChange={passwordHandler}></input>
        <input type='password' role='confirmPassword' name='confirmPassword' placeholder='confirm password' onChange={confirmPasswordHandler}></input>
        <button type="submit" onClick={submitHandler}>Register</button>
    </div>
  )
}

export default connect()(Register)