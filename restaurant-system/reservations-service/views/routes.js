const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Crear reserva
router.post('/reservas', reservationController.createReservation);

// Obtener todas las reservas
router.get('/reservas', reservationController.getReservations);

// Obtener una reserva por ID
router.get('/reservas/:id', reservationController.getReservationById);

// Actualizar una reserva
router.put('/reservas/:id', reservationController.updateReservation);

// Eliminar una reserva
router.delete('/reservas/:id', reservationController.deleteReservation);

module.exports = router;
