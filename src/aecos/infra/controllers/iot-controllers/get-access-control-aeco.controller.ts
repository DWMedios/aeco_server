import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common'
// import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager'
import {
  ACCESS_CONTROL_AECO_SERVICE,
  type IAccessControlAecoService,
} from '@aecos/domain/services/iot-services/IAccessControlAecoService'
import { AccessControlAeco } from '@shared/app/decorators/current-logged.decorator'
import { AccessControlAecosGuard } from '@shared/app/guards/access-control-aecos.guard'
import { IAecoPayload } from '@aecos/domain/Types'

@ApiTags('AECOS - IoT')
@Controller('aecos')
export class GetAccessControlAecoController {
  logger = new Logger(GetAccessControlAecoController.name)

  constructor(
    @Inject(ACCESS_CONTROL_AECO_SERVICE)
    private readonly service: IAccessControlAecoService,
  ) {}

  @Get('access-control')
  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(60)
  @UseGuards(AccessControlAecosGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get access control for AECO',
    description:
      'Retrieves the access control information for an authenticated AECO device',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Access control information retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          description: 'Operation success status',
          example: true,
        },
        message: {
          type: 'string',
          description: 'Response message',
          example: 'Access control information retrieved successfully',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Invalid or missing AECO credentials',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - AECO does not have sufficient permissions',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error occurred',
  })
  async getAccessControlAeco(
    @AccessControlAeco() payload: IAecoPayload,
  ): Promise<{
    success: boolean
    message: string
  }> {
    return await this.service.run(payload)
  }
}
