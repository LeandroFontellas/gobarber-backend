import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplate';

interface IMailContext {
  name: string;
  email: string;
}
export default interface ISendMailDTO {
  to: IMailContext;
  from?: IMailContext;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
