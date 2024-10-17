"use client"

import React from "react"
import { redirect } from "next/navigation"
import { PATH } from "@/constants/path"

import { useCurrentUser } from "@/hooks/use-current-user"

interface BeforLoginLayoutProps {
	children: React.ReactNode
}

export default function BeforLoginLayout({ children }: BeforLoginLayoutProps) {
	const user = useCurrentUser()
	if (user) {
		redirect(PATH.DASHBOARD)
	}

	return <>{children}</>
}
