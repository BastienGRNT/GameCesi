import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return NextResponse.json({
            error: 'Utilisateur introuvable',
        }, { status: 404 });
    }

    if (user.password !== password) {
        return NextResponse.json({
            error: 'Mot de passe incorrect',
        }, { status: 401 });
    }

    return NextResponse.json({
        message: 'Connexion réussie',
        user: {
            id: user.id,
            email: user.email,
            pseudo: user.pseudo,
        }
    });
}
