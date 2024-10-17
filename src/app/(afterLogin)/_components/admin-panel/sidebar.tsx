"use client"

import Link from "next/link"
import { PATH } from "@/constants/path"
import { Waves } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/hooks/use-sidebar"
import { useStore } from "@/hooks/use-store"
import { Button } from "@/components/ui/button"
import { Menu } from "@/app/(afterLogin)/_components/admin-panel/menu"
import { SidebarToggle } from "@/app/(afterLogin)/_components/admin-panel/sidebar-toggle"

export function Sidebar() {
	const sidebar = useStore(useSidebar, x => x)
	if (!sidebar) return null
	const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar
	return (
		<aside
			className={cn(
				"fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
				!getOpenState() ? "w-[90px]" : "w-72",
				settings.disabled && "hidden"
			)}
		>
			<SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
			<div
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				className="relative flex h-full flex-col px-0 py-4 shadow-md dark:shadow-zinc-800"
			>
				<Button
					className={cn(
						"mb-1 transition-transform duration-300 ease-in-out",
						!getOpenState() ? "translate-x-1" : "translate-x-0"
					)}
					variant="link"
					asChild
				>
					<Link href={PATH.DASHBOARD} className="flex items-center gap-2">
						<Waves className="mr-1 size-6" />
						<h1
							className={cn(
								"whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
								!getOpenState()
									? "hidden -translate-x-96 opacity-0"
									: "translate-x-0 opacity-100"
							)}
						>
							{siteConfig.title}
						</h1>
					</Link>
				</Button>
				<Menu isOpen={getOpenState()} />
			</div>
		</aside>
	)
}
