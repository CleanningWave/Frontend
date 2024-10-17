"use client"

import Link from "next/link"
import { PATH } from "@/constants/path"
import { LayoutGrid, LogOut, User } from "lucide-react"

import { useCurrentUser } from "@/hooks/use-current-user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { signOutWithForm } from "@/app/(beforeLogin)/_actions/auth"

export function UserNav() {
	const user = useCurrentUser()
	return (
		<DropdownMenu>
			<TooltipProvider disableHoverableContent>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="relative size-8 rounded-full"
							>
								<Avatar className="size-8">
									<AvatarImage src="#" alt="Avatar" />
									<AvatarFallback className="bg-transparent">JD</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent side="bottom">Profile</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{user?.email}</p>
						<p className="text-muted-foreground text-xs leading-none">
							{user?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="hover:cursor-pointer" asChild>
						<Link href={PATH.DASHBOARD} className="flex items-center">
							<LayoutGrid className="text-muted-foreground mr-3 size-4" />
							Dashboard
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:cursor-pointer" asChild>
						<Link href={PATH.ACCOUNT} className="flex items-center">
							<User className="text-muted-foreground mr-3 size-4" />
							Account
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="hover:cursor-pointer"
					onClick={signOutWithForm}
				>
					<LogOut className="text-muted-foreground mr-3 size-4" />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
