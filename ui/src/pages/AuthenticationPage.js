import React, { useState } from 'react'
import { useHistory } from 'react-router';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm'

function AuthenticationPage({loggedIn, setLoggedIn}) {
    const history = useHistory();
    // Hooks
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ firstName, setFirstName ] = useState();
    const [ lastName, setLastName ] = useState();
    const [ loginUser, setLoginUser ] = useState(true);
    const [ registerUser, setRegisterUser ] = useState(false);
    const [ authenticating, setAuthenticating ] = useState(false);

    if (loggedIn) {
        history.push('/');
    } if (authenticating) {
        return (
            <>
                <p className="sign-in-transition">Signing in...</p>
            </>
        )
    } else if (loginUser && !registerUser) {
        return (
            <>
                <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                    loginUser={loginUser} setLoginUser={setLoginUser}
                    registerUser={registerUser} setRegisterUser={setRegisterUser}
                    authenticating={authenticating} setAuthenticating={setAuthenticating}
                />
            </>
        )
    } else if (!loginUser && registerUser) {
        return (
            <>
                <RegisterForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                    firstName={firstName} setFirstName={setFirstName}
                    lastName={lastName} setLastName={setLastName}
                    loginUser={loginUser} setLoginUser={setLoginUser}
                    registerUser={registerUser} setRegisterUser={setRegisterUser}
                    authenticating={authenticating} setAuthenticating={setAuthenticating}
                    />
            </>
        )
    }
    
}

export default AuthenticationPage;