import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import INotificationDTO from '@modules/notifications/dtos/iNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export default class NotificationsRepository
  implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: INotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ content, recipient_id });

    await this.ormRepository.save(notification);

    return notification;
  }
}
