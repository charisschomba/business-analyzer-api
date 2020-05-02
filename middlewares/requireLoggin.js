import jwt from 'jsonwebtoken';

import User from '../models/user';

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
        const user = await User.findById({_id: payload.id})
        if(user) {
            req.user = user;
        }
    });
    next();
};

export default requireLogin;