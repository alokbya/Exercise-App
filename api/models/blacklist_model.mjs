import { BlackList } from "../data/app.data.mjs";

/*
    * Add blacklisted jwt
*/
const addToken = (token) => {
    const b_jwt = new BlackList({token});
    return b_jwt.save();
}

/*
    * Get blacklisted jwt (check if jwt is blacklisted)
*/
const getToken = async (filter, projection, limit) => {
    const query = BlackList.find();
    if(Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
}

export { addToken, getToken };