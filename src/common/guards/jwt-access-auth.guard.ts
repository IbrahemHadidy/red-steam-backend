import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';

@Injectable()
export class JwtAccessAuthGuard implements CanActivate {
  private readonly accessTokenSecret: string;
  
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly tokenBlacklist: TokenBlacklistService,
  ) {
    this.accessTokenSecret = this.config.get<string>('JWT_ACCESS_TOKEN_SECRET');
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers);

    if (!token) throw new UnauthorizedException('Access token not found');

    try {
      // Verify token
      const payload = this.jwtService.verify(token, { secret: this.accessTokenSecret });

      // Check if the refresh token is blacklisted
      const isBlacklisted = await this.tokenBlacklist.isBlacklisted(token);
      if (isBlacklisted)  throw new UnauthorizedException('Token is blacklisted');

      // Add payload to request
      request.userId = payload.id;
      request.email = payload.email;
      request.username = payload.username;
      request.admin = payload.admin;
      request.isVerified = payload.verified;
      request.accessToken = token;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(headers: Record<string, string>): string {
    const authHeader = headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    
    const token = authHeader.split(' ')[1];
    return token;
  }
}
