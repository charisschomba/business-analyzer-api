import jwt from 'jsonwebtoken';

import User from '../models/User';
// Checks if the user is logged in
const requireLogin = async (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization) {
        return res.status(401).json({
            error: 'you must be logged in'
        })
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
        if(error) {
            return res.status(401).json({
                error: 'you must be logged in'
            })
        }
        const user = await User.findById({_id: payload.id}, {password: 0, __v: 0})
        if(user) {
            req.user = user;
        }
        next();
    });

};

export default requireLogin;
