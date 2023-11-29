import { Body, Controller, HttpCode, HttpStatus, Res, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseUtil } from 'src/common/utils/response.util';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { Roles } from './roles/roles.decorator';
import { JwtAuthGuard } from './jwt.guard';
import { RoleGuard } from './role/role.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private responseUtil: ResponseUtil
  ) {}

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/test')
  testHello() {
    return "hello"
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Res() res: any, @Body() loginDto: LoginDTO) {
    try {
      const response = await this.authService.authenticate(loginDto);
      const data = this.responseUtil.response(
        { message: 'Successfully logged in', responseCode: 200 },
        { ...response },
      );
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res() res: any, @Body() registerDto: RegisterDTO) {
    try {
      await this.authService.register(registerDto);
      const data = this.responseUtil.response({
        responseCode: 201,
        message: `Email ${registerDto.email} is successfully registered`,
      });
      return res.status(HttpStatus.CREATED).json(data);
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }
}
