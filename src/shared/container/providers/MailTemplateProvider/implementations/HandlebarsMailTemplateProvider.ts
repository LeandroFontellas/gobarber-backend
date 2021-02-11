import handlebars from 'handlebars';
import fs from 'fs';

import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplate';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandleBarsEmailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileCOntent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileCOntent);

    return parseTemplate(variables);
  }
}
