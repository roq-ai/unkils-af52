import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { tournamentValidationSchema } from 'validationSchema/tournaments';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getTournaments();
    case 'POST':
      return createTournament();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTournaments() {
    const data = await prisma.tournament
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'tournament'));
    return res.status(200).json(data);
  }

  async function createTournament() {
    await tournamentValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.team?.length > 0) {
      const create_team = body.team;
      body.team = {
        create: create_team,
      };
    } else {
      delete body.team;
    }
    const data = await prisma.tournament.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
