// import React from 'react'
// import { useHistory } from 'react-router';

// function RegisterPage({loggedIn, setLoggedIn, 
//     email, setEmail, 
//     password, setPassword, 
//     firstName, setFirstName, 
//     lastName, setLastName}) {
    
//     const history = useHistory();

//     const [ userExists, setUserExists ] = useState(false);

//     const registerUser = async () => {
//         const user = { first_name: firstName,
//             last_name: lastName,
//             email: email,
//             password: password };
        
//         const response = await fetch('/auth/register', {
//             method: 'POST',
//             body: JSON.stringify(user),
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         });
//         if (response.status === 201) {
//             setLoggedIn(true);
//             history.push('/');
//         }
        
//     }

//     if (userExists) {
//         return (
//             <>
//                 <form id="register-form">
//                     <input
//                     type="text"
//                     placeholder="First Name"
//                     onChange={e => setFirstName(e.target.value)}
//                     required />
//                     <input
//                     type="text"
//                     placeholder="Last Name"
//                     onChange={e => setLastName(e.target.value)}
//                     required />
//                     <input
//                     type="email"
//                     placeholder="Email Address"
//                     onChange={e => setEmail(e.target.value)}
//                     required />
//                     <input
//                     type="password"
//                     placeholder="Password"
//                     onChange={e => setFirstName(e.target.value)}
//                     required />
//                     <button id="register-user-btn" onClick={registerUser}>Register</button>                
//                 </form>
//             </>
//         );
//     }
//     else {
//         return (
//             <>
//                 <form id="register-form">
//                     <input
//                     type="text"
//                     placeholder="First Name"
//                     onChange={e => setFirstName(e.target.value)}
//                     required />
//                     <input
//                     type="text"
//                     placeholder="Last Name"
//                     onChange={e => setLastName(e.target.value)}
//                     required />
//                     <input
//                     type="email"
//                     placeholder="Email Address"
//                     onChange={e => setEmail(e.target.value)}
//                     required />
//                     <input
//                     type="password"
//                     placeholder="Password"
//                     onChange={e => setFirstName(e.target.value)}
//                     required />
//                     <button id="register-user-btn" onClick={registerUser}>Register</button>                
//                 </form>
//                 <p>User already exists. </p>
//             </>
//         );
//     }
    
// }

// export default RegisterPage;