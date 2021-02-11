import { Response, Request } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar';
import { classToClass } from 'class-transformer';

export default class UpdateAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const avatarFileName = req.file.filename;

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id,
      avatarFileName,
    });

    return res.status(200).json(classToClass(user));
  }
}
