import bookingService from "../services/bookingService.js";

const bookingController = {
  post: async (req, res, next) => {
    try {
      const { accommodationId, startDate, endDate, numberOfGuests } = req.body;
      const userId = req.user.id;

      const newBooking = await bookingService.create(userId, accommodationId, {
        startDate,
        endDate,
        numberOfGuests,
      });

      res.status(201).json(newBooking);
    } catch (err) {
      next(err);
    }
  },

  get: async (req, res, next) => {
    try {
      const booking = await bookingService.read(req.params.bookingId);
      res.json(booking);
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const bookings = await bookingService.readAll(req.query);
      res.json(bookings);
    } catch (err) {
      next(err);
    }
  },

  patch: async (req, res, next) => {
    try {
      const { startDate, endDate, numberOfGuests } = req.body;
      const updatedBooking = await bookingService.update(req.params.bookingId, {
        startDate,
        endDate,
        numberOfGuests,
      });
      res.json(updatedBooking);
    } catch (err) {
      next(err);
    }
  },


  delete: async (req, res, next) => {
    try {
      const deletedBooking = await bookingService.delete(req.params.bookingId);
      res.json(deletedBooking);
    } catch (err) {
      next(err);
    }
  },

  byUser: async (req, res, next) => {
    try {
      const bookings = await bookingService.readAllByUser(req.params.userId);
      res.json(bookings);
    } catch (err) {
      next(err);
    }
  },
};

export default bookingController;
