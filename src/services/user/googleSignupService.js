import { OAuth2Client } from "google-auth-library"
import { signAccessToken } from "@src/utils/jwt"
import { ServiceBase } from "@src/lib/serviceBase"
import { APIError } from '@src/errors/api.error'
import { appConfig } from '@src/configs'


const client = new OAuth2Client(
    appConfig.google.google_client_id
);

export class GoogleSignupService extends ServiceBase {
    async signup(data) {
        try {
            console.log("GoogleSignup service called successfully!.");

            const transaction = this.context.transaction
            const { user: User } = this.models;

            const ticket = await client.verifyIdToken({
                idToken: data.token,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const payload = ticket.getPayload();
            console.log("payload:", payload);

            const email = payload.email;

            let user = await User.findOne({ where: { email } });

            if (!user) {

                user = await User.create({
                    firstName: payload.given_name,
                    lastName: payload.family_name,
                    email: payload.email,
                    userName: payload.email.split("@")[0],
                    password: null,
                    isActive: true,
                    provider: 'GOOGLE',
                    googleId: payload.sub,
                }, { transaction });
            }

            const accessToken = signAccessToken({
                id: user.id,
                email: user.email
            });

            return {
                message: "google sign up successful",
                data: {
                    user,
                    accessToken,
                    refreshToken: null
                }
            }
        } catch (error) {
            console.log("=>error:", error);
            throw new APIError(error)
        }
    }
}
