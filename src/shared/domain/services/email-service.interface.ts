import type { MessageSendingResponse } from 'postmark/dist/client/models'
import type { SendEmailPostmark } from '../Types'

export const EMAIL_SERVICE = Symbol('EmailServiceInterface')

export interface EmailServiceInterface {
  sendEmailWithTemplate(
    sendEmail: SendEmailPostmark,
  ): Promise<MessageSendingResponse>
}
