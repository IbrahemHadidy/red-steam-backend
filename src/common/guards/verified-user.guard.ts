// NestJS
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

//Services
import { UsersService } from '@repositories/sql/users/users.service';

@Injectable()
export class VerifiedUserGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request['userId'];

    // Verify if user exists
    if (!userId) throw new BadRequestException('User ID is missing');

    // Check if user exists
    const user = await this.usersService.getById(userId);
    if (!user) throw new NotFoundException('User not found');

    // Check if user is verified
    if (!user.isVerified) throw new UnauthorizedException('User is not verified');

    return true;
  }
}
