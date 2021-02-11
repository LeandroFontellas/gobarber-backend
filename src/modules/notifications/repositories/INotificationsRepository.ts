import ICreateNotificationDTO from '@modules/notifications/dtos/iNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
