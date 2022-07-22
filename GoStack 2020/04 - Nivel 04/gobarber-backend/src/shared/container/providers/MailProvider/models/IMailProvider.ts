import ISendEmailDTO from '../dto/ISendEmailDTO';

export default interface IMailProvider {
  sendMail(data: ISendEmailDTO): Promise<void>;
}
