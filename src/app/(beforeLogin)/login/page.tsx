"use client"

import { UserAuthForm } from "../_components/user-auth-form"

export default function LoginPage() {
	return (
		<div className="container relative flex h-screen flex-col items-center justify-center lg:px-0">
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<UserAuthForm isLogin />
				</div>
			</div>
		</div>
	)
}
