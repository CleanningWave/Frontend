"use client"

import Link from "next/link"
import { PATH } from "@/constants/path"
import { Waves } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { UserAuthForm } from "../_components/user-auth-form"

export default function SignUpPage() {
	return (
		<div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
			<Link
				href={PATH.LOGIN}
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute right-4 top-4 md:right-8 md:top-8"
				)}
			>
				Login
			</Link>
			<div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
				<div className="absolute inset-0 bg-zinc-900" />
				<div className="relative z-20 flex items-center text-lg font-medium">
					<Link href={PATH.ROOT} className="flex items-center gap-2">
						<Waves className="mr-1 size-6" />
						<h1
							className={cn(
								"whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
								"translate-x-0 opacity-100"
							)}
						>
							{siteConfig.title}
						</h1>
					</Link>
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							&ldquo;This library has saved me countless hours of work and
							helped me deliver stunning designs to my clients faster than ever
							before.&rdquo;
						</p>
						<footer className="text-sm">Sofia Davis</footer>
					</blockquote>
				</div>
			</div>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<UserAuthForm />
					<p className="text-muted-foreground px-8 text-center text-sm">
						By clicking continue, you agree to our{" "}
						<Link
							href="/terms"
							className="hover:text-primary underline underline-offset-4"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							href="/privacy"
							className="hover:text-primary underline underline-offset-4"
						>
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	)
}
