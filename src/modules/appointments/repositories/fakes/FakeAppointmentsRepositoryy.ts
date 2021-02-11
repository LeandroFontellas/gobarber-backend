import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/iFindAllInMonthFromProviderDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/iFindAllInDayFromProviderDTO';

class AppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findAllInDayFromProvider({
    provider_id,
    day,
    year,
    month,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const findAppointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day
      );
    });

    return findAppointments;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    year,
    month,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const findAppointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return findAppointments;
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );
    return findAppointment;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
