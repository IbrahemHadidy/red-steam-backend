// NestJS
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Services
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';

// Types
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

interface JwtPayload {
  id: string;
  email: string;
  username: string;
  admin: boolean;
  verified: boolean;
}

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
    // Get context and request
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();

    // Check if there is a refresh token
    const token = this.extractTokenFromCookies(request.cookies);
    if (!token) throw new UnauthorizedException('Refresh token not found');

    try {
      // Verify token
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, { secret: this.refreshTokenSecret });

      // Check if the token is blacklisted
      const isBlacklisted = await this.tokenBlacklist.isBlacklisted(token);
      if (isBlacklisted) throw new UnauthorizedException('Token is blacklisted');

      // Add payload to request
      Object.assign(request, {
        userId: payload.id,
        email: payload.email,
        username: payload.username,
        admin: payload.admin,
        isVerified: payload.verified,
        refreshToken: token,
      });

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromCookies(cookies: Record<string, string | undefined>): string | null {
    const refreshTokenCookie = cookies['refreshToken'];

    if (!refreshTokenCookie || !refreshTokenCookie.startsWith('Bearer ')) return null;

    const token = refreshTokenCookie.split(' ')[1];
    return token;
  }
}
