import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';

@Injectable()
export class JwtRefreshAuthGuard implements CanActivate {
  private readonly refreshTokenSecret: string;

  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly tokenBlacklist: TokenBlacklistService,
  ) {
    this.refreshTokenSecret = this.config.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers);

    if (!token) throw new UnauthorizedException('Refresh token not found');

    try {
      // Verify token
      const payload = this.jwtService.verify(token, { secret: this.refreshTokenSecret });

      // Check if the refresh token is blacklisted
      const isBlacklisted = await this.tokenBlacklist.isBlacklisted(token);
      if (isBlacklisted) throw new UnauthorizedException('Token is blacklisted');

      // Add payload to request
      request.userId = payload.id;
      request.email = payload.email;
      request.username = payload.username;
      request.admin = payload.admin;
      request.isVerified = payload.verified;
      request.refreshToken = token;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(headers: Record<string, string>): string | null {
    const refreshTokenHeader = headers['x-refresh-token'];

    if (!refreshTokenHeader || !refreshTokenHeader.startsWith('Bearer ')) return null;

    const token = refreshTokenHeader.split(' ')[1];
    return token;
  }
}
