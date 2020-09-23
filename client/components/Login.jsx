import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signIn } from 'authenticare/client'
import { baseApiUrl as baseUrl } from '../config'


const Login = () =>{
    const [user] = useState({
        username:'',
        password:''
    })

    const handleClick = event => {
        event.preventDefault()
        const { email, password } = user
    
        signIn({ username: email, password }, { baseUrl })
          .then((token) => {
            if (isAuthenticated()) {
            }
          })
      }

    return(
        <div >
            <input type="email" id='email' name='email' placeholder='Email address'></input>
            <input type="password" id='password' name='password' placeholder="password" ></input>
            <button type='button' onClick={handleClick}>Sign-In</button>
        </div>
    )

}

export default Login    
