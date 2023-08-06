import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: false },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    images: [String],
    university: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availabilityStatus: { type: Boolean, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
