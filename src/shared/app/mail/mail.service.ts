import { ServerClient } from 'postmark'
import type { MessageSendingResponse } from 'postmark/dist/client/models'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { SendEmailPostmark } from '@shared/domain/Types'
import type { EmailServiceInterface } from '@shared/domain/services/email-service.interface'

@Injectable()
export class MailService implements EmailServiceInterface {
  private readonly logger = new Logger(MailService.name)
  private readonly client: ServerClient
  private readonly from: string

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('postmark.api_key')
    this.from = this.configService.get<string>('postmark.from')
    this.client = new ServerClient(apiKey)
  }

  async sendEmailWithTemplate(
    sendEmail: SendEmailPostmark,
  ): Promise<MessageSendingResponse | null> {
    try {
      const response = await this.client.sendEmailWithTemplate({
        From: this.from,
        To: sendEmail.to,
        TemplateId: sendEmail.templateId,
        TemplateModel: sendEmail.templateModel,
      })

      return response
    } catch (error) {
      console.error(error)
      this.logger.error(`Error to send email with template: ${error.message}`)
      return null
    }
  }
}
