import { Router } from 'express';
import userSchema, {loginSchema} from "../utils/validations/auth";
import errorParser from "../utils/handleValidationErrors";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
// handles user registration
router.post('/signup', async(req, res) => {
  const {username, email, password, fullname} = req.body;
  const { error, value } = userSchema.validate({ username, email, password, fullname });
  if (error) {
    const resErrors = errorParser(error);
    return res.status(401).json({errors: resErrors});
  }
  const userExists = await User.findOne({email});
  if(userExists){
    return res.status(409).json({
      errors: {
        message: 'user with provided email exists',
        context: {
          key: 'email'
        }
      }
    })
  }
  // hashes password
  bcrypt.hash(password, 12, async(err, hash) => {
    const user = new User({username, email, fullname, password: hash})
    await user.save();
    return res.status(201).json({message: 'user created successfully'})
  })
});

// handles logging in users
router.post('/signin', async (req, res, next) => {
  const {email, password} = req.body;
  const {error, user} = loginSchema.validate({password, email});
  if(error) {
    const resError = errorParser(error);
    return res.status(422).json({
      errors: resError
    })
  }
  const userExists = await User.findOne({email})
  if(!userExists) {
    return res.status(409).json({
      errors: 'check your password or email'
    })
  }
  const match = await bcrypt.compare(password, userExists.password)
  if(match) {
    const token = jwt.sign({id: userExists._id}, process.env.JWT_SECRET);
    return res.status(200).json({
      user: {
        username: userExists.username,
        email: userExists.email,
        token
      },
    })
  }
  return res.status(401).json({
    errors: {
      message: 'check your password and email'
    }
  })
});

export default router;

