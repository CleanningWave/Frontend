"use client"

import { redirect } from "next/navigation"
import { PATH } from "@/constants/path"

import { useCurrentUser } from "@/hooks/use-current-user"

export default function BeforLoginPage() {
	const user = useCurrentUser()
	if (user) {
		redirect(PATH.DASHBOARD)
	}
	redirect(PATH.ROOT)
}
