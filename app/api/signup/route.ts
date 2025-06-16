import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { userId, gameId, teamId } = body;

    if (!userId || !gameId) {
        return NextResponse.json({
            message: "Paramètres manquants",
            status: 400,
        });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        return NextResponse.json({
            message: "Utilisateur non trouvé",
            status: 404,
        });
    }

    const game = await prisma.game.findUnique({
        where: {
            id: gameId,
        },
    });

    if (!game) {
        return NextResponse.json({
            message: "Jeu non trouvé",
            status: 404,
        });
    }

    if (teamId) {
        const team = await prisma.team.findUnique({
            where: {
                id: teamId,
            },
        });

        if (!team) {
            return NextResponse.json({
                message: "Équipe non trouvée",
                status: 404,
            });
        }
    }


    const existingSignup = await prisma.inscription.findFirst({
        where: {
            userId: userId,
            gameId: gameId,
        },
    });

    if (existingSignup) {
        return NextResponse.json({
            message: "Vous êtes déjà inscrit à ce jeu",
            status: 400,
        });
    }

    const newSignup = await prisma.inscription.create({
        data: {
            userId: userId,
            gameId: gameId,
            teamId: teamId || null,
        },
    });

    if (!newSignup) {
        return NextResponse.json({
            message: "Erreur lors de l'inscription au jeu",
            status: 500,
        });
    }

    return NextResponse.json({
        message: "Inscription au jeu réussie",
        signUp: newSignup,
    });
}
