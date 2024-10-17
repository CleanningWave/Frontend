import Link from "next/link"
import { PATH } from "@/constants/path"
import { MenuIcon, Waves } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "@/app/(afterLogin)/_components/admin-panel/menu"

export function SheetMenu() {
	return (
		<Sheet>
			<SheetTrigger className="lg:hidden" asChild>
				<Button className="h-8" variant="outline" size="icon">
					<MenuIcon size={20} />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex h-full flex-col px-0 sm:w-72" side="left">
				<SheetHeader>
					<Button
						className="flex items-center justify-center pb-2 pt-1"
						variant="link"
						asChild
					>
						<Link href={PATH.DASHBOARD} className="flex items-center gap-2">
							<Waves className="mr-1 size-6" />
							<SheetTitle className="text-lg font-bold">
								Cleanning Wave
							</SheetTitle>
						</Link>
					</Button>
				</SheetHeader>
				<Menu isOpen />
			</SheetContent>
		</Sheet>
	)
}
