import 'server-only';
import { SignJWT, jwtVerify } from "jose";
import { PrelimSessionPayload, SessionPayload } from './types';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
};

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        })

        return payload;
    } catch(error) {
        console.log("Failed to verify session");
    }
}

export async function createSession(sessionPayload: PrelimSessionPayload) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ session: sessionPayload, expiresAt })

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    })
}

export async function updateSession(sessionPayload: PrelimSessionPayload) {
    const session = cookies().get("session")?.value;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const payload = await encrypt({ session: sessionPayload, expiresAt });

    if(!session) {
        return null;
    }

    cookies().set('session', payload, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    })
}

export function deleteSession() {
    cookies().delete('session')
}

export async function verifySession() {
    const cookie = cookies().get('session')?.value;
    let session = await decrypt(cookie);

    if(!session?.session) {
        return { isAuth: false };
    }

    return { isAuth: true, session: session?.session };
}