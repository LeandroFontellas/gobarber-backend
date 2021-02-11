import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeEmailTemplateProvider
  implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}
