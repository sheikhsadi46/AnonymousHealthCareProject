import express from 'express';
import Doctor from '../models/doctorModel.js';

import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Doctor.remove({});
  const createdDoctors = await Doctor.insertMany(data.doctors);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdDoctors, createdUsers });
});
export default seedRouter;
