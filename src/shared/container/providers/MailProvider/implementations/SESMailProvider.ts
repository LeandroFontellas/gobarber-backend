/* eslint-disable no-console */
import { inject, injectable } from 'tsyringe';
import aws from 'aws-sdk';
import mailConfig from '@config/mail';
import nodemailer, { Transporter } from 'nodemailer';

import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.email,
        address: to.email,
      },
      subject,
      text: 'teste',
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
