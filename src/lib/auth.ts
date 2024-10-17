"use server"

import { auth } from "@/auth"

export const currentUser = async () => {
	const session = await auth()

	console.warn("currentUser\n", `session: ${session}`)

	return session?.user
}
