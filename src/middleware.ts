import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"

import { PATH } from "./constants/path"

const withAuthList = [
	`${PATH.DASHBOARD}`,
	`${PATH.ACCOUNT}`,
	`${PATH.REPORTS}`,
	`${PATH.USERS}`,
]

const withOutAuthList = [`${PATH.LOGIN}`, `${PATH.SIGN_UP}`]

export async function middleware(req: NextRequest) {
	const session = await auth()

	console.warn(
		"MIDDLEWARE\n",
		`pathname: ${req.nextUrl.pathname}`,
		`session: ${session}`
	)

	if (req.nextUrl.pathname === PATH.ROOT) {
		return NextResponse.next()
	}

	const isCanAccessSession = session && session.user.email

	if (isMatch(req.nextUrl.pathname, withAuthList)) {
		return isCanAccessSession // 세션 정보 확인
			? NextResponse.next()
			: NextResponse.redirect(new URL(PATH.LOGIN, req.url))
	}
	// 인증 후 회원가입 및 로그인 접근 제어!
	if (isMatch(req.nextUrl.pathname, withOutAuthList)) {
		return isCanAccessSession
			? NextResponse.redirect(new URL(PATH.DASHBOARD, req.url))
			: NextResponse.next()
	}
}

// 경로 일치 확인!
function isMatch(pathname: string, urls: string[]) {
	return urls.some(url => url.startsWith(pathname))
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		// "/((?!api|_next/static|_next/image|favicon).*)",
		`/dashboard/:path*`,
		`/account/:path*`,
		`/reports/:path*`,
		`/users/:path*`,
		`/login/:path*`,
		`/signup/:path*`,
	],
}
