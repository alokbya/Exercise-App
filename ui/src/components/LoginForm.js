import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function LoginForm({loggedIn, setLoggedIn, email, setEmail, password, setPassword, loginUser, setLoginUser, registerUser, setRegisterUser, authenticating, setAuthenticating}) {

    // Cookie information
    const [ cookies, setCookie ] = useCookies(['token']);
    const [ invalidLogin, setInvalidLogin ] = useState(false)
    const history = useHistory();

    const authenticateUser = async () => {
        const response = fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.status === 200) {
                setLoggedIn(true);
                setInvalidLogin(false);
                history.push('/');
            } else if (response.status === 400) {
                setInvalidLogin(true);
                setPassword('');
            }
        })
        .catch(error => {
            console.error(error);
            alert(error);
        });
        
    }

    const registrationRedirect = () => {
        setLoginUser(false);
        setRegisterUser(true);
    }

    const invalidLoginJSX = <p class="invalid-auth-text">Invalid email or password.</p>

    return (
        <>
            <div id="auth-form">
            <h2>Login</h2>
                <input
                    className="auth-input"
                    type="text"
                    value={email}
                    placeholder="Email address"
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    className="auth-input"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button id="login-btn" className="auth-btn" onClick={authenticateUser}>Login</button>
                <p className="redirect" id="register-redirect">Don't have an account? <a className="auth-link" onClick={registrationRedirect}>Sign up here!</a></p>
            </div>
            {invalidLogin ? invalidLoginJSX : <></>}
        </>
    );
}

export default LoginForm;