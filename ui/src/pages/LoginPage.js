// import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

// function LoginPage({loggedIn, setLoggedIn}) {
//     // User information
//     const [ email, setEmail ] = useState();
//     const [ password, setPassword ] = useState();

//     // Cookie information
//     const [ cookies, setCookie ] = useCookies(['token']);

//     const history = useHistory();

//     const loginUser = async () => {
//         const response = await fetch('/auth/login', {
//             method: 'POST',
//             body: JSON.stringify({email, password}),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (response.status === 200) {
//             setLoggedIn(true);
//             history.push('/');
//         }
//     }

//     return (
//         <>
//             <div id="login-form">
//                 <input
//                     type="text"
//                     placeholder="Email address"
//                     onChange={e => setEmail(e.target.value)}
//                     required    
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     onChange={e => setPassword(e.target.value)}
//                     required
//                 />
//                 <button id="submit-login" onClick={loginUser}>Login</button>
//             </div>
//         </>
//     );
// }

// export default LoginPage;