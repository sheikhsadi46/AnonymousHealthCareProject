import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import {
  isAuth,
  isAdmin,
  generateToken,
  baseUrl,
  mailgun,
  isDoctor,
} from '../utils.js';

const searchRoute = express.Router();

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $OR: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
searchRoute.get('/', isAuth, allUsers);



export default searchRoute;
