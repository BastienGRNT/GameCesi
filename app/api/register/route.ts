import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { email, password, pseudo } = body;

    if (!email || !password || !pseudo) {
        return NextResponse.json(
            { error: "Merci de remplir tous les champs" },
            { status: 400 }
        );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return NextResponse.json(
            {
                error: "Email déjà utilisé",
                status: 400
            }
        )
    }

    const user = await prisma.user.create({
        data: { email, password, pseudo }
    });

    return NextResponse.json({
        message: "Inscription réussite",
        user: {
            id: user.id,
            email: user.email,
            pseudo: user.pseudo,
        },
        status: 200,
    });
}
