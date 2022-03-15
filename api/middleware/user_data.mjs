// import * as userProfiles from '../models/user_profile_model.mjs'

// const verifyToken = async (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.status(403).json({Error: 'A token is required for authentication'});
//     }
//     try {
//         const matchingToken = await blackList.getToken({ token });
//         if (matchingToken.length > 0) {
//             return res.status(403).json({Error: 'A token is required for authentication'}); 
//         }

//         const decoded = jwt.verify(token, process.env.TOKEN_KEY);
//         req.user = decoded;
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({Error: `${error}`});
//     }
//     return next();
// }



// const getUserProfile = async (req, res, next) => {
//     const user = req.user.user_id;
//     const user_profile = await userProfiles.getUserProfile({ user });

//     if (user_profile.length > 0) {
//         req.user_profile = user_profile;
//     } else {
//         res.status(404).json({Error: 'User not found'});
//     }
//     return next();
// }