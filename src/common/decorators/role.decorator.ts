import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const AllowedRole = (role: Role) => SetMetadata('AllowedRole', role);
