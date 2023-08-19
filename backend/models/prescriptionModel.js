import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema(
  {

    patientName: { type: String, required: false },
    medication: { type: String, required: false },
    dosage: { type: String, required: false },
    instructions: { type: String, required: false },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;
