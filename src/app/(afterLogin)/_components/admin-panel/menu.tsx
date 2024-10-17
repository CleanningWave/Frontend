"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Ellipsis, LogOut } from "lucide-react"

import { getMenuList } from "@/lib/menu-list"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { CollapseMenuButton } from "@/app/(afterLogin)/_components/admin-panel/collapse-menu-button"

interface MenuProps {
	isOpen: boolean | undefined
}

export function Menu({ isOpen }: MenuProps) {
	const pathname = usePathname()
	const menuList = getMenuList(pathname)

	return (
		<ScrollArea className="px-3 [&>div>div[style]]:!block">
			<nav className="mt-7 w-full">
				<ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
					{menuList.map(({ groupLabel, menus }, index) => (
						<li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
							{(isOpen && groupLabel) || isOpen === undefined ? (
								<p className="text-muted-foreground max-w-[248px] truncate px-4 pb-2 text-sm font-medium">
									{groupLabel}
								</p>
							) : !isOpen && isOpen !== undefined && groupLabel ? (
								<TooltipProvider>
									<Tooltip delayDuration={100}>
										<TooltipTrigger className="w-full">
											<div className="flex w-full items-center justify-center">
												<Ellipsis className="size-5" />
											</div>
										</TooltipTrigger>
										<TooltipContent side="right">
											<p>{groupLabel}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							) : (
								<p className="pb-2"></p>
							)}
							{menus.map(
								({ href, label, icon: Icon, active, submenus }, index) =>
									!submenus || submenus.length === 0 ? (
										<div className="w-full" key={index}>
											<TooltipProvider disableHoverableContent>
												<Tooltip delayDuration={100}>
													<TooltipTrigger asChild>
														<Button
															variant={
																(active === undefined &&
																	pathname.startsWith(href)) ||
																active
																	? "default"
																	: "ghost"
															}
															className="mb-1 h-10 w-full justify-start"
															asChild
														>
															<Link href={href}>
																<span
																	className={cn(isOpen === false ? "" : "mr-4")}
																>
																	<Icon size={18} />
																</span>
																<p
																	className={cn(
																		"max-w-[200px] truncate",
																		isOpen === false
																			? "-translate-x-96 opacity-0"
																			: "translate-x-0 opacity-100"
																	)}
																>
																	{label}
																</p>
															</Link>
														</Button>
													</TooltipTrigger>
													{isOpen === false && (
														<TooltipContent side="right">
															{label}
														</TooltipContent>
													)}
												</Tooltip>
											</TooltipProvider>
										</div>
									) : (
										<div className="w-full" key={index}>
											<CollapseMenuButton
												icon={Icon}
												label={label}
												active={
													active === undefined
														? pathname.startsWith(href)
														: active
												}
												submenus={submenus}
												isOpen={isOpen}
											/>
										</div>
									)
							)}
						</li>
					))}
				</ul>
			</nav>
		</ScrollArea>
	)
}
