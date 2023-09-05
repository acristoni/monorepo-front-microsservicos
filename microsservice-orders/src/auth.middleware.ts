import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
      const headersList = {
        Authorization: token,
      };

      const response = await fetch('http://localhost:3003/validate', {
        method: 'GET',
        headers: headersList,
      });

      const data = await response.text();
      const dataObj = await JSON.parse(data);
      if (dataObj && dataObj.statusCode && dataObj.statusCode === 200) {
        const decoded = this.jwtService.verify(token.replace('Bearer ', ''));
        req.user = decoded;
        next();
      } else {
        return res.status(401).json({ message: 'Token inválido' });
      }
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }
}
