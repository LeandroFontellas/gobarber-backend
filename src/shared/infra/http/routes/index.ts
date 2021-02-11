// src/routes/index.ts
import { Router } from 'express';
import appointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import providersRouter from 'modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/providers', providersRouter);

export default routes;
