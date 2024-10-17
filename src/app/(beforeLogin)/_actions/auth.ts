"use server"

import { redirect } from "next/navigation"
import { auth, signIn, signOut } from "@/auth"
import { PATH } from "@/constants/path"

import { signInSchema } from "../_lib/signin-zod"
import { signUpSchema } from "../_lib/signup-zod"

export const signInWithCredentials = async (formData: FormData) => {
	try {
		const result = signInSchema.safeParse({
			email: formData.get("email"),
			password: formData.get("password"),
		})
		if (!result.success || !result.data) {
			const error = result.error.format()
			console.error(error)
			return {
				message: {
					email: error.email?._errors[0] ?? "",
					password: error.password?._errors[0] ?? "",
				},
			}
		}
		const response = await signIn("credentials", {
			email: formData.get("email") || "",
			password: formData.get("password") || "",
			redirect: false,
		})

		console.log(response)

		if (!response?.ok) {
			return { message: "아이디와 비밀번호를 확인해주세요." }
		} else {
			redirect(PATH.ROOT)
			return { message: "" }
		}
	} catch (error) {
		console.error("error", error)
		return { message: "아이디와 비밀번호를 확인해주세요." }
	}
}

export const signUpWithCredentials = async (formData: FormData) => {
	const result = signUpSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
		cfPassword: formData.get("cfPassword"),
	})
	if (!result.success || !result.data) {
		const error = result.error.format()
		console.error(error)
		return {
			message: {
				email: error.email?._errors[0] ?? "",
				password: error.password?._errors[0] ?? "",
				cfPassword: error.cfPassword?._errors[0] ?? "",
			},
		}
	}

	let shouldRedirect = false
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/email/register`,
			{
				method: "post",
				body: JSON.stringify({
					email: formData.get("email") || "",
					password: formData.get("password") || "",
				}),
				credentials: "include",
			}
		)
		console.log(response.status)
		if (response.status === 403) {
			return { message: "user_exists" }
		}
		console.log(await response.json())
		shouldRedirect = true
		await signIn("credentials", {
			email: formData.get("email"),
			password: formData.get("password"),
			redirect: false,
		})
	} catch (err) {
		console.error(err)
		return { message: "" }
	}

	if (shouldRedirect) {
		redirect(PATH.ROOT) // try/catch문 안에서 X
	}
	return { message: "" }
}

export const signOutWithForm = async () => signOut({ redirect: false })
export { auth as getSession }
