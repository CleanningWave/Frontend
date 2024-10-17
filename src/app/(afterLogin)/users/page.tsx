import Link from "next/link"
import { PATH } from "@/constants/path"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import PlaceholderContent from "@/components/demo/placeholder-content"
import { ContentLayout } from "@/app/(afterLogin)/_components/admin-panel/content-layout"

export default function UsersPage() {
	return (
		<ContentLayout title="Users">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href={PATH.ROOT}>Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href={PATH.DASHBOARD}>Dashboard</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Users</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<PlaceholderContent />
		</ContentLayout>
	)
}
