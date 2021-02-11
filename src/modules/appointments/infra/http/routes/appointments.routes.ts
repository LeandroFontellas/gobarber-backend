/* eslint-disable camelcase */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticated';

const appointmentRouter = Router();

const appointmentsController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentRouter.use(ensureAuthenticated); // ativando o middleware

// Cria um appointment
appointmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
// Lista todos os appointments do provider logado
appointmentRouter.get('/me', providerAppointmentsController.index);

export default appointmentRouter;
