import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do token
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // como nao vamos usar o tipo do token entao vamos deixar em branco msm e só vamos pegar o token
  const [, token] = authHeader.split(' ');

  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as ITokenPayload; // forçando o decoded a ter um formato desejado pq se vc passar o mouse em cima ele pode ser um objeto ou uma string

    // Aqui estamos adicionando o id do usuario que startou uma sessao
    // no request, assim todas as outras rotas vao ter acesso tambem atraves
    // de request.user
    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
