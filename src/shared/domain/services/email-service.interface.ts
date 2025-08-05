import type { MessageSendingResponse } from 'postmark/dist/client/models'
import type { SendEmailPostmark } from '../Types'

export const EMAIL_SERVICE = Symbol('IEmailService')

export interface IEmailService {
  sendEmailWithTemplate(
    sendEmail: SendEmailPostmark,
  ): Promise<MessageSendingResponse>
}
