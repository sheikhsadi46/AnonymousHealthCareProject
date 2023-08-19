import express from 'express';
import Prescription from '../models/prescriptionModel.js';
import asyncHandler from 'express-async-handler';

import { isAuth, isDoctor, isAdmin } from '../utils.js';
const prescriptionRoute = express.Router();

prescriptionRoute.get(
  '/:id',
  isAuth,
  asyncHandler(async (req, res) => {
    const prescription = await Prescription.findById(req.params.id);

    if (prescription) {
      res.json(prescription);
    } else {
      res.status(404).json({ message: 'Prescription not found' });
    }
  })
);

prescriptionRoute.get(
  '/',
  isAuth,
  isDoctor,
  isAdmin, // You can also use isAdmin here if both should have the same access
  asyncHandler(async (req, res) => {
    const prescriptions = await Prescription.find({});
    res.json(prescriptions);
  })
);
prescriptionRoute.post(
  '/',
  isAuth,
  isDoctor,
  asyncHandler(async (req, res) => {
    const { patientName, medication, instructions,dosage } = req.body;

    // Get the user._id of the doctor from req.user
    const doctorId = req.user._id;

    const newPrescription = new Prescription({
      patientName,
      medication,
      instructions,
      dosage,
      doctor: doctorId, // Add the doctor's user._id to the prescription
      // Add any other fields you need here
    });

    const createdPrescription = await newPrescription.save();
    res.status(201).json(createdPrescription);
  })
);

export default prescriptionRoute;
