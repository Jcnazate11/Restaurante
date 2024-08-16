const Reservation = require('../models/Reservation');

// Crear reserva (POST)
exports.createReservation = async (req, res) => {
  const { nombre_cliente, num_personas, fecha, hora, mesa } = req.body;
  try {
    const newReservation = await Reservation.create({ nombre_cliente, num_personas, fecha, hora, mesa });
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
  }
};

// Listar todas las reservas (GET)
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ message: 'Error al obtener reservas', error: error.message });
  }
};

// Obtener una reserva por ID (GET)
exports.getReservationById = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findByPk(id);
    if (reservation) {
      res.status(200).json(reservation);
    } else {
      res.status(404).json({ message: 'Reserva no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la reserva:', error);
    res.status(500).json({ message: 'Error al obtener la reserva', error: error.message });
  }
};

// Actualizar una reserva (PUT)
exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  const { nombre_cliente, num_personas, fecha, hora, mesa } = req.body;
  try {
    const reservation = await Reservation.findByPk(id);
    if (reservation) {
      await reservation.update({ nombre_cliente, num_personas, fecha, hora, mesa });
      res.status(200).json(reservation);
    } else {
      res.status(404).json({ message: 'Reserva no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    res.status(500).json({ message: 'Error al actualizar la reserva', error: error.message });
  }
};

// Eliminar una reserva (DELETE)
exports.deleteReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findByPk(id);
    if (reservation) {
      await reservation.destroy();
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: 'Reserva no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
    res.status(500).json({ message: 'Error al eliminar la reserva', error: error.message });
  }
};