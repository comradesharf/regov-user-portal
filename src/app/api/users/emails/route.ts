import { createFirebaseApp } from "#root/_libs/FirebaseAdminUtils";
import * as Schemas from "#root/_libs/Schemas";
import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email } = Schemas.EmailValidation.parse(await request.json());
        const app = createFirebaseApp();
        const auth = getAuth(app);
        const user = await auth.getUserByEmail(email);
        const includePasswordProvider = user.providerData.some(
            ({ providerId }) => providerId === "password"
        );

        if (!includePasswordProvider) {
            const error = new Error("Require password provider");
            error.code = "auth/password-provider-required";
            throw error;
        }

        return NextResponse.json(
            Schemas.EmailValidationResponse.parse({
                valid: true,
                provider: true,
            })
        );
    } catch (e: any) {
        switch (e?.code) {
            case "auth/user-not-found":
                return NextResponse.json(
                    Schemas.EmailValidationResponse.parse({
                        valid: false,
                        provider: false,
                    })
                );
            case "auth/password-provider-required":
                return NextResponse.json(
                    Schemas.EmailValidationResponse.parse({
                        valid: true,
                        provider: false,
                    })
                );
            default:
                console.error("Unexpected error", e);
                return new Response("Unexpected error", {
                    status: 500,
                });
        }
    }
}
