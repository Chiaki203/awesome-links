import { PrismaClient } from '@prisma/client';
import prisma from '../lib/prisma';
import {Claims, getSession} from '@auth0/nextjs-auth0'

export type Context = {
  user?: Claims
  accessToken?: string
  prisma: PrismaClient
}

export async function createContext({req, res}):Promise<Context> {
  const session = getSession(req, res)
  if (!session) return {prisma}
  console.log('createContext auth0 getSession', session)
  const {user, accessToken} = session
  return {
    user,
    accessToken,
    prisma
  }
}