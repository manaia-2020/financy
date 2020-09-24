import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signIn } from 'authenticare/client'
import { baseApiUrl as baseUrl } from '../config'

// Email = Username as authenticare requires a username field

const Login = () =>{
    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const handleChange = (event) =>{
        event.preventDefault()
        const {name , value} = event.target
        setUser({...user,[name]:value})
    }

    const handleClick = event => {
        event.preventDefault()
        const { email, password } = user
    
        signIn({ username: email, password }, { baseUrl })
          .then((token) => {
            if (isAuthenticated()) {
                console.log('Logged in');
            }
          })
      }

    return(
        <div >
            <input type="email" name='email' placeholder='Email address' value={user.username} onChange={handleChange}></input>
            <input type="password" id='password' name='password' placeholder="password" value={user.password} onChange={handleChange} ></input>
            <button type='button' onClick={handleClick}>Sign-In</button>
        </div>
    )

}

export default Login    
