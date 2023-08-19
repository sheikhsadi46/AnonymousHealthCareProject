import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Doctor from '../models/doctorModel.js';
import { isAuth, isAdmin } from '../utils.js';

const doctorRouter = express.Router();

doctorRouter.get('/', async (req, res) => {
  const doctors = await Doctor.find();
  res.send(doctors);
});

doctorRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newDoctor = new Doctor({
      name: 'sample doctor ' +Date.now(),
      slug: 'sample-doctor-' + Date.now(),
      image: '/images/p1.jpg',
      price: 0,
      category: 'sample category',
      university: 'sample university',
      availabilityStatus: true,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const doctor = await newDoctor.save();
    res.send({ message: 'Doctor Created', doctor });
  })
);

doctorRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);
    if (doctor) {
      doctor.name = req.body.name;
      doctor.slug = req.body.slug;
      doctor.price = req.body.price;
      doctor.image = req.body.image;
      doctor.images = req.body.images;
      doctor.category = req.body.category;
      doctor.university = req.body.university;
      doctor.availabilityStatus = req.body.availabilityStatus;
      doctor.description = req.body.description;
      await doctor.save();
      res.send({ message: 'Doctor Updated' });
    } else {
      res.status(404).send({ message: 'Doctor Not Found' });
    }
  })
);

doctorRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor) {
      await doctor.remove();
      res.send({ message: 'Doctor Deleted' });
    } else {
      res.status(404).send({ message: 'Doctor Not Found' });
    }
  })
);

doctorRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);
    if (doctor) {
      if (doctor.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }

      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      doctor.reviews.push(review);
      doctor.numReviews = doctor.reviews.length;
      doctor.rating =
        doctor.reviews.reduce((a, c) => c.rating + a, 0) /
        doctor.reviews.length;
      const updatedDoctor = await doctor.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedDoctor.reviews[updatedDoctor.reviews.length - 1],
        numReviews: doctor.numReviews,
        rating: doctor.rating,
      });
    } else {
      res.status(404).send({ message: 'Doctor Not Found' });
    }
  })
);

const PAGE_SIZE = 3;

doctorRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const doctors = await Doctor.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countDoctors = await Doctor.countDocuments();
    res.send({
      doctors,
      countDoctors,
      page,
      pages: Math.ceil(countDoctors / pageSize),
    });
  })
);

doctorRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const doctors = await Doctor.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countDoctors = await Doctor.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      doctors,
      countDoctors,
      page,
      pages: Math.ceil(countDoctors / pageSize),
    });
  })
);

doctorRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Doctor.find().distinct('category');
    res.send(categories);
  })
);

doctorRouter.get('/slug/:slug', async (req, res) => {
  const doctor = await Doctor.findOne({ slug: req.params.slug });
  if (doctor) {
    res.send(doctor);
  } else {
    res.status(404).send({ message: 'Doctor Not Found' });
  }
});
doctorRouter.get('/:id', async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (doctor) {
    res.send(doctor);
  } else {
    res.status(404).send({ message: 'Doctor Not Found' });
  }
});

export default doctorRouter;
