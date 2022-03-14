import React, { useState } from 'react'
import { useHistory } from 'react-router';

function RegisterPage({loggedIn, setLoggedIn, 
    email, setEmail, 
    password, setPassword, 
    firstName, setFirstName, 
    lastName, setLastName,
    loginUser, setLoginUser,
    registerUser, setRegisterUser,
    authenticating, setAuthenticating}) {
    
    const history = useHistory();

    const [ userExists, setUserExists ] = useState(false);
    const [ invalidLogin, setInvalidLogin ] = useState(false)


    const createAndAuthenticateUser = async () => {
        setAuthenticating(true);
        const user = { first_name: firstName,
            last_name: lastName,
            email: email,
            password: password };
        
        const response = await fetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 201) {
            setLoggedIn(true);
            setInvalidLogin(false);
            setAuthenticating(false);
            history.push('/');
        } else if (response.status === 400) {
            setInvalidLogin(true);
            setAuthenticating(false);
        }        
    }

    const loginRedirect = () => {
        setLoginUser(true);
        setRegisterUser(false);
    }

    // JSX
    const invalidLoginJSX = <p class="invalid-auth-text">Invalid email or password.</p>
    
    
    return (
        <>
        <form id="auth-form">
            <h2>Register</h2>
            <input
            className="auth-input"
            type="text"
            placeholder="First name"
            onChange={e => setFirstName(e.target.value)}
            required />
            <input
            className="auth-input"
            type="text"
            placeholder="Last name"
            onChange={e => setLastName(e.target.value)}
            required />
            <input
            className="auth-input"
            type="email"
            placeholder="Email address"
            onChange={e => setEmail(e.target.value)}
            required />
            <input
            className="auth-input"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required />
            <button id="register-btn" className="auth-btn" onClick={createAndAuthenticateUser}>Register</button>     
            <p className="redirect" id="login-redirect">Already have an account? <a className="auth-link" onClick={loginRedirect}>Login here!</a></p>       
        </form>
        {invalidLogin ? invalidLoginJSX : <></>}
    </>
    )
    
}

export default RegisterPage;