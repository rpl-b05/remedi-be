import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Res,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseUtil } from 'src/common/utils/response.util';
import { LoginDTO } from './DTO/login.dto';
import { RegisterDTO } from './DTO/register.dto';
import { AuthGuard } from './auth.guard';
import { IsPublic } from 'src/common/decorators/isPublic.decorator';
import { Role } from 'src/common/decorators/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private responseUtil: ResponseUtil,
  ) {}

  @IsPublic()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDTO) {
    const response = await this.authService.authenticate(loginDto);
    return this.responseUtil.response(
      { message: 'Successfully logged in', responseCode: 200 },
      { ...response },
    );
  }

  @IsPublic()
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDTO) {
    await this.authService.register(registerDto);
    return this.responseUtil.response({
      responseCode: 201,
      message: `Email ${registerDto.email} is successfully registered`,
    });
  }
}
