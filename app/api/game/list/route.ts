import { NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
    const games = await prisma.game.findMany();
    return NextResponse.json(games);
}
