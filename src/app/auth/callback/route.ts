import * as AuthServerActions from "#root/_libs/AuthServerActions";
import { NextRequest } from "next/server";

const ExpiresIn = 60 * 60 * 24 * 5 * 1000;

export async function POST(request: NextRequest) {
    try {
        const idToken = await request.text();
        if (!idToken) {
            return new Response("Id token required!", {
                status: 400,
            });
        }

        const decodedIdToken = await AuthServerActions.verifyIdToken(idToken);
        if (!decodedIdToken) {
            return new Response("Recent sign in required!", {
                status: 401,
            });
        }

        const sessionCookie = await AuthServerActions.createSessionCookie(idToken, ExpiresIn);

        return new Response(null, {
            headers: {
                "Set-Cookie": `session=${sessionCookie}; Max-Age=${ExpiresIn}; HttpOnly; Secure; SameSite=Strict; Path=/;`,
            },
        });
    } catch (e) {
        return new Response("Unexpected error", {
            status: 500,
        });
    }
}

export async function DELETE() {
    return new Response(null, {
        headers: {
            "Set-Cookie": `session=; Max-Age=0; HttpOnly; Secure; SameSite=Strict; Path=/;`,
        },
    });
}
