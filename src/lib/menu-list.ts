import { PATH } from "@/constants/path"
import {
	LayoutDashboard,
	LucideIcon,
	MessageCircleWarning,
	Settings,
	Users,
} from "lucide-react"

type Submenu = {
	href: string
	label: string
	active?: boolean
}

type Menu = {
	href: string
	label: string
	active?: boolean
	icon: LucideIcon
	submenus?: Submenu[]
}

type Group = {
	groupLabel: string
	menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
	return [
		{
			groupLabel: "",
			menus: [
				{
					href: PATH.DASHBOARD,
					label: "대시보드",
					icon: LayoutDashboard,
					submenus: [],
				},
				{
					href: PATH.REPORTS,
					label: "신고 처리",
					icon: MessageCircleWarning,
					submenus: [],
				},
			],
		},
		{
			groupLabel: "설정",
			menus: [
				{
					href: PATH.USERS,
					label: "사용자 관리",
					icon: Users,
				},
				{
					href: PATH.ACCOUNT,
					label: "계정 관리",
					icon: Settings,
				},
			],
		},
	]
}
