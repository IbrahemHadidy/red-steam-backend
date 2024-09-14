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
    // Get context and request
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();

    // Check if there is an access token
    const token = this.extractTokenFromCookies(request.cookies);
    if (!token) throw new UnauthorizedException('Access token not found');

    try {
      // Verify token
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, { secret: this.accessTokenSecret });

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
        accessToken: token,
      });

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromCookies(cookies: Record<string, string | undefined>): string | null {
    const accessTokenHeader = cookies['accessToken'];

    if (!accessTokenHeader || !accessTokenHeader.startsWith('Bearer ')) return null;

    const token = accessTokenHeader.split(' ')[1];
    return token;
  }
}
