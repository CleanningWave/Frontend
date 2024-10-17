import { ReactNode } from "react"

import AdminPanelLayout from "@/app/(afterLogin)/_components/admin-panel/admin-panel-layout"

type Props = { children: ReactNode; modal: ReactNode }
export default function AfterLoginLayout({ children, modal }: Props) {
	return (
		<AdminPanelLayout>
			{children}
			{modal}
		</AdminPanelLayout>
	)
}

// 주소가 localhost:3000일 때는 children->page.tsx, modal->@modal/default.tsx
// 주소가 localhost:3000/i/flow/login 때는 chldren->i/flow/login/page.tsx, modal->@modal/i/flow/login/page.tsx
