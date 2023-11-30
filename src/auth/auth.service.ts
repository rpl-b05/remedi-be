import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDTO } from './DTO/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { RegisterDTO } from './DTO/register.dto';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async hashPassword(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(plainText, salt);
    return hashPassword;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async authenticate(loginDto: LoginDTO) {
    const user = await this.getUser(loginDto.email);

    if (!user) {
      throw new NotFoundException(
        `User with email ${loginDto.email} is not found`,
      );
    }

    const isPasswordValid = await this.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const expiresIn = process.env.JWT_EXPIRY as string;
    const token = sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn },
    );

    return { user, token };
  }

  async register(registerDto: RegisterDTO) {
    const { email, name, password, role } = registerDto;

    const hashedPassword = await this.hashPassword(password);

    const user = await this.getUser(email);

    if (!!user) {
      throw new BadRequestException('Email is used');
    }

    const capitalizeRole = role.toUpperCase();
    if (capitalizeRole !== 'DOCTOR' && capitalizeRole !== 'PATIENT') {
      throw new BadRequestException('Invalid role');
    }

    await this.prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
        role: capitalizeRole === 'DOCTOR' ? Role.DOCTOR : Role.PATIENT,
      },
    });
  }
}
