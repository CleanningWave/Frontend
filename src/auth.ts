import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { PATH } from "./constants/path"

interface AuthInfo {
	email: string
	password: string
}

declare module "next-auth" {
	/**
	 * The shape of the user object returned in the OAuth providers' `profile` callback,
	 * or the second parameter of the `session` callback, when using a database.
	 */

	interface User {
		id?: string
		name?: string | null
		email?: string | null
		image?: string | null
		role: string
		accessToken: string
		refreshToken: string
		tokenExpires: number
	}
	/**
	 * The shape of the account object returned in the OAuth providers' `account` callback,
	 * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
	 */
	interface Account {}

	/**
	 * Returned by `useSession`, `auth`, contains information about the active session.
	 */
	interface Session {}
	interface Session {
		user: {
			id?: string
			name?: string | null
			email: string
			image?: string | null
			role: string
		}
	}
}

declare module "@auth/core/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		accessToken: string
		refreshToken: string
		tokenExpires: number
		picture?: string | null
	}
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	secret: process.env.AUTH_SECRET,
	pages: {
		signIn: PATH.LOGIN,
		newUser: PATH.SIGN_UP,
		error: PATH.AUTH_ERROR,
	},
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				// Initial Login에만 user가 존재

				token.accessToken = user.accessToken
				token.refreshToken = user.refreshToken
				token.tokenExpires = Math.floor(Date.now() / 1000 + user.tokenExpires)

				return token
			} else if (Date.now() < token.tokenExpires * 1000) {
				console.log(Date.now(), token.tokenExpires * 1000)
				// 첫 로그인 이후 토큰 access
				return token
			} else {
				try {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/refresh`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token.refreshToken}`,
							},
							credentials: "include",
						}
					)

					const newTokens = await response.json()
					console.log("refreshToken", newTokens)

					if (!response.ok) throw response.body

					return {
						...token,
						accessToken: newTokens.accessToken,
						refreshToken: newTokens.refreshToken,
						tokenExpires: Math.floor(
							Date.now() / 1000 + newTokens.tokenExpires
						),
					}
				} catch (error) {
					console.error("Error refreshing access token", error)
					signOut({ redirect: false })
					return token
				}
			}
		},
		session({ session, token, user }) {
			session.user.image = token.picture

			return session
		},
	},
	events: {
		signOut(data) {
			console.log(
				"auth.ts events signout",
				"session" in data && data.session,
				"token" in data && data.token
			)
			fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/logout`, {
				method: "POST",
				credentials: "include",
			})
		},
		session(data) {
			console.log(
				"auth.ts events session",
				"session" in data && data.session,
				"token" in data && data.token
			)
		},
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
				cfPassword: {},
			},
			authorize: async credentials => {
				try {
					return _auth(credentials as AuthInfo)
				} catch (error) {
					console.error("authorize error", error)
					throw new Error("문제가 발생했습니다, 잠시 후 다시 시도하세요.")
				}
			},
		}),
	],
})

async function _auth(body: { email: string; password: string }) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/email/login`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}
	)

	if (!res.ok) {
		return null
	}

	const data = await res.json()

	const { user, ...tokenInfo } = data

	console.log("user", user)

	if (!user) {
		throw new Error("계정이 존재하지 않습니다.")
	}

	return {
		...tokenInfo,
		id: user.id,
		name: user.email,
		email: user.email,
		image: user?.photo?.path,
		role: user.role.name,
	}
}
