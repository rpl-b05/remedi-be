import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { IAuthenticate } from './interface/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { RegisterDTO } from './dto/register.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async getUser(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
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

    async authenticate(loginDto: LoginDTO): Promise<IAuthenticate> {
        const user = await this.getUser(loginDto.email)

        if (!user) {
            throw new NotFoundException(
                `User with email ${loginDto.email} is not found`,
            )
        }

        const isPasswordValid = await this.comparePassword(
            loginDto.password,
            user.password
        )

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid password')
        }

        const expiresIn = '1h'
        const token = sign(
            { id: user.id, email: user.email, role: user.role},
            "remedisukses",
            { expiresIn }
        )

        return { user, token };
    }

    async register(registerDto: RegisterDTO): Promise<User> {
        const {
            email,
            name,
            password,
            role
        } = registerDto

        const hashedPassword = await this.hashPassword(password)

        const user = await this.getUser(email)

        if (user) {
            throw new BadRequestException('Email is used')
        }

        const newUser = await this.prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword,
                role: role
            }
        })

        return newUser
    }
}
