import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/iFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/iFindAllInDayFromProviderDTO';

export default interface IAppointmentRepository {
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
}
