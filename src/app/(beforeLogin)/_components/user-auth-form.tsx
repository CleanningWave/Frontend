"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PATH } from "@/constants/path"
import { useFormState, useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

import { signInWithCredentials, signUpWithCredentials } from "../_actions/auth"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
	isLogin?: boolean
}

interface AuthFormState {
	email: string
	password: string
	cfPassword?: null | string
}

const defaultAuthFormState: AuthFormState = {
	email: "",
	password: "",
	cfPassword: null,
}

export function UserAuthForm({
	isLogin = false,
	className,
	...props
}: UserAuthFormProps) {
	const [state, action] = useFormState<
		{ message: AuthFormState | string },
		FormData
	>(
		(state, formData) =>
			isLogin
				? signInWithCredentials(formData)
				: signUpWithCredentials(formData),
		{ message: defaultAuthFormState }
	)
	const { pending } = useFormStatus()
	console.log("state", state)

	const [cfPassword, setCfPassword] = useState("")
	const router = useRouter()

	// const onSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
	// 	e.preventDefault()
	// 	setIsLoading(true)
	// 	setError(defaultErrors)
	// 	try {
	// 		const result = signInSchema.safeParse({ email, password })
	// 		if (!result.success || !result.data) {
	// 			const error = result.error.format()
	// 			console.error(error)
	// 			setError({
	// 				email: error.email?._errors[0] ?? "",
	// 				password: error.password?._errors[0] ?? "",
	// 			})
	// 			return
	// 		}

	// 		const response = await signInWithCredentials()

	// 		console.log(response)

	// 		if (!response?.ok) {
	// 			setError({
	// 				email: "아이디와 비밀번호가 일치하지 않습니다.",
	// 				password: "아이디와 비밀번호가 일치하지 않습니다.",
	// 			})
	// 		} else {
	// 			setError(defaultErrors)
	// 			router.replace(PATH.DASHBOARD)
	// 		}
	// 	} catch (error) {
	// 		console.error(error)
	// 		setError({
	// 			email: "아이디와 비밀번호가 일치하지 않습니다.",
	// 			password: "아이디와 비밀번호가 일치하지 않습니다.",
	// 		})
	// 	} finally {
	// 		setIsLoading(false)
	// 	}
	// }

	const onChangeCfPassword: React.ChangeEventHandler<HTMLInputElement> = e => {
		setCfPassword(e.target.value)
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">
						{isLogin ? "로그인" : "회원가입"}
					</CardTitle>
					<CardDescription>
						{isLogin
							? "계정에 로그인하려면 아래에 이메일을 입력하세요"
							: "회원가입 하려면 아래에 이메일과 비밀번호를 입력하세요"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={action}>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">이메일</Label>
								<Input
									id="email"
									placeholder="name@example.com"
									type="email"
									name="email"
									autoCapitalize="none"
									autoComplete="email"
									autoCorrect="off"
									required
									disabled={pending}
									className={
										typeof state.message !== "string" && state.message.email
											? "border-2 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-900 placeholder:text-red-500 focus:border-red-500 focus:outline-none"
											: ""
									}
								/>
								{typeof state.message !== "string" && state.message.email && (
									<p className="text-sm text-red-500">{state.message.email}</p>
								)}
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">비밀번호</Label>
									{isLogin && (
										<a
											className="ml-auto inline-block text-sm underline"
											href="#"
										>
											비밀번호를 잊어버리셨나요?
										</a>
									)}
								</div>
								<Input
									id="password"
									type="password"
									name="password"
									autoCapitalize="none"
									autoComplete="off"
									autoCorrect="off"
									required
									disabled={pending}
									className={
										typeof state.message !== "string" && state.message.password
											? "border-2 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-900 placeholder:text-red-500 focus:border-red-500 focus:outline-none"
											: ""
									}
								/>
								{typeof state.message !== "string" &&
									state.message.password && (
										<p className="text-sm text-red-500">
											{state.message.password}
										</p>
									)}
								{!isLogin && (
									<>
										<Label htmlFor="confirm-password">비밀번호 확인</Label>
										<Input
											id="confirm-password"
											type="password"
											name="cfPassword"
											autoCapitalize="none"
											autoComplete="off"
											autoCorrect="off"
											required
											disabled={pending}
											className={
												typeof state.message !== "string" &&
												state.message.cfPassword
													? "border-2 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-900 placeholder:text-red-500 focus:border-red-500 focus:outline-none"
													: ""
											}
										/>
										{typeof state.message !== "string" &&
											state.message.cfPassword && (
												<p className="text-sm text-red-500">
													{state.message.cfPassword}
												</p>
											)}
									</>
								)}
							</div>
							{typeof state.message === "string" && state.message && (
								<p className="text-sm text-red-500">{state.message}</p>
							)}
							<Button type="submit" disabled={pending}>
								{pending && (
									<Icons.spinner className="mr-2 size-4 animate-spin" />
								)}
								{isLogin ? "로그인" : "회원가입"}
							</Button>
						</div>
						{isLogin && (
							<div className="mt-4 text-center text-sm">
								계정이 없나요?{" "}
								<a className="underline" href={PATH.SIGN_UP}>
									회원가입
								</a>
							</div>
						)}
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
