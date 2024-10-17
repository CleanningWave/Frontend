"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { PATH } from "@/constants/path"
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table"
import {
	Bar,
	BarChart,
	CartesianGrid,
	Label,
	LabelList,
	Line,
	LineChart,
	Pie,
	PieChart,
	XAxis,
} from "recharts"

import { useSidebar } from "@/hooks/use-sidebar"
import { useStore } from "@/hooks/use-store"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ContentLayout } from "@/app/(afterLogin)/_components/admin-panel/content-layout"

const barChartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
]
const barChartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig

const pieChartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
]
const pieChartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "hsl(var(--chart-1))",
	},
	safari: {
		label: "Safari",
		color: "hsl(var(--chart-2))",
	},
	firefox: {
		label: "Firefox",
		color: "hsl(var(--chart-3))",
	},
	edge: {
		label: "Edge",
		color: "hsl(var(--chart-4))",
	},
	other: {
		label: "Other",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig

const lineChartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
]
const lineChartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig

const tableData: Payment[] = [
	{
		id: "bhqecj4p",
		collectionCompanyName: "수거업체1",
		receivedCount: 520,
		processedCount: 500,
	},
	{
		id: "5kma53ae",
		collectionCompanyName: "수거업체2",
		receivedCount: 480,
		processedCount: 435,
	},
	{
		id: "m5gr84i9",
		collectionCompanyName: "수거업체3",
		receivedCount: 350,
		processedCount: 324,
	},
	{
		id: "3u1reuv4",
		collectionCompanyName: "수거업체4",
		receivedCount: 940,
		processedCount: 243,
	},
	{
		id: "derv1ws0",
		collectionCompanyName: "수거업체5",
		receivedCount: 670,
		processedCount: 345,
	},
	{
		id: "bhqecj4p2",
		collectionCompanyName: "수거업체6",
		receivedCount: 520,
		processedCount: 500,
	},
	{
		id: "5kma53ae2",
		collectionCompanyName: "수거업체7",
		receivedCount: 480,
		processedCount: 435,
	},
	{
		id: "m5gr84i92",
		collectionCompanyName: "수거업체8",
		receivedCount: 350,
		processedCount: 324,
	},
	{
		id: "3u1reuv42",
		collectionCompanyName: "수거업체9",
		receivedCount: 940,
		processedCount: 243,
	},
	{
		id: "derv1ws02",
		collectionCompanyName: "수거업체10",
		receivedCount: 670,
		processedCount: 345,
	},
]

export type Payment = {
	id: string
	collectionCompanyName: string
	receivedCount: number
	processedCount: number
}

export const tableColumns: ColumnDef<Payment>[] = [
	{
		accessorKey: "collectionCompanyName",
		header: "업체명",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("collectionCompanyName")}</div>
		),
	},
	{
		accessorKey: "receivedCount",
		header: "접수 수",
		cell: ({ row }) => <div>{row.getValue("receivedCount")}</div>,
	},
	{
		accessorKey: "processedCount",
		header: "처리 수",
		cell: ({ row }) => <div>{row.getValue("processedCount")}</div>,
	},
]

export default function DashboardPage() {
	const sidebar = useStore(useSidebar, x => x)
	const pieChartTotalVisitors = useMemo(() => {
		return pieChartData.reduce((acc, curr) => acc + curr.visitors, 0)
	}, [])
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})

	const table = useReactTable({
		data: tableData,
		columns: tableColumns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	if (!sidebar) return null
	return (
		<ContentLayout title="Dashboard">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href={PATH.ROOT}>Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Dashboard</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<TooltipProvider>
				<div className="chart-wrapper flex flex-col gap-6 py-6 sm:py-8">
					<div className="grid w-full gap-6 md:grid-cols-5">
						<Card className="md:col-span-3" x-chunk="charts-01-chunk-0">
							<CardHeader>
								<CardTitle>위치별 신고 횟수</CardTitle>
								<CardDescription>2024.10 기준</CardDescription>
							</CardHeader>
							<CardContent>
								<ChartContainer config={barChartConfig}>
									<BarChart accessibilityLayer data={barChartData}>
										<CartesianGrid vertical={false} />
										<XAxis
											dataKey="month"
											tickLine={false}
											tickMargin={10}
											axisLine={false}
											tickFormatter={value => value.slice(0, 3)}
										/>
										<ChartTooltip
											cursor={false}
											content={<ChartTooltipContent indicator="dashed" />}
										/>
										<Bar
											dataKey="desktop"
											fill="var(--color-desktop)"
											radius={4}
										/>
										<Bar
											dataKey="mobile"
											fill="var(--color-mobile)"
											radius={4}
										/>
									</BarChart>
								</ChartContainer>
							</CardContent>
						</Card>
						<Card className="md:col-span-2" x-chunk="charts-01-chunk-1">
							<CardHeader>
								<CardTitle>수거된 쓰레기 종류</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer
									config={pieChartConfig}
									className="mx-auto aspect-square max-h-[250px]"
								>
									<PieChart>
										<ChartTooltip
											cursor={false}
											content={<ChartTooltipContent hideLabel />}
										/>
										<Pie
											data={pieChartData}
											dataKey="visitors"
											nameKey="browser"
											innerRadius={60}
											strokeWidth={5}
										>
											<Label
												content={({ viewBox }) => {
													if (viewBox && "cx" in viewBox && "cy" in viewBox) {
														return (
															<text
																x={viewBox.cx}
																y={viewBox.cy}
																textAnchor="middle"
																dominantBaseline="middle"
															>
																<tspan
																	x={viewBox.cx}
																	y={viewBox.cy}
																	className="fill-foreground text-3xl font-bold"
																>
																	{pieChartTotalVisitors.toLocaleString()}
																</tspan>
																<tspan
																	x={viewBox.cx}
																	y={(viewBox.cy || 0) + 24}
																	className="fill-muted-foreground"
																>
																	Visitors
																</tspan>
															</text>
														)
													}
												}}
											/>
										</Pie>
									</PieChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
					<div className="grid w-full gap-6 md:grid-cols-5">
						<Card className="md:col-span-2" x-chunk="charts-01-chunk-2">
							<CardHeader>
								<CardTitle>신고 처리 장소</CardTitle>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										{table.getHeaderGroups().map(headerGroup => (
											<TableRow key={headerGroup.id}>
												{headerGroup.headers.map(header => {
													return (
														<TableHead key={header.id}>
															{header.isPlaceholder
																? null
																: flexRender(
																		header.column.columnDef.header,
																		header.getContext()
																	)}
														</TableHead>
													)
												})}
											</TableRow>
										))}
									</TableHeader>
									<TableBody>
										{table.getRowModel().rows?.length ? (
											table.getRowModel().rows.map(row => (
												<TableRow
													key={row.id}
													data-state={row.getIsSelected() && "selected"}
												>
													{row.getVisibleCells().map(cell => (
														<TableCell key={cell.id}>
															{flexRender(
																cell.column.columnDef.cell,
																cell.getContext()
															)}
														</TableCell>
													))}
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell
													colSpan={tableColumns.length}
													className="h-24 text-center"
												>
													No results.
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
						<Card className="md:col-span-3" x-chunk="charts-01-chunk-3">
							<CardHeader>
								<CardTitle>해양 쓰레기 신고 추이</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer config={lineChartConfig}>
									<LineChart
										accessibilityLayer
										data={lineChartData}
										margin={{
											top: 20,
											left: 12,
											right: 12,
										}}
									>
										<CartesianGrid vertical={false} />
										<XAxis
											dataKey="month"
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											tickFormatter={value => value.slice(0, 3)}
										/>
										<ChartTooltip
											cursor={false}
											content={<ChartTooltipContent indicator="line" />}
										/>
										<Line
											dataKey="desktop"
											type="natural"
											stroke="var(--color-desktop)"
											strokeWidth={2}
											dot={{
												fill: "var(--color-desktop)",
											}}
											activeDot={{
												r: 6,
											}}
										>
											<LabelList
												position="top"
												offset={12}
												className="fill-foreground"
												fontSize={12}
											/>
										</Line>
										<Line
											dataKey="mobile"
											type="natural"
											stroke="var(--color-mobile)"
											strokeWidth={2}
											dot={{
												fill: "var(--color-mobile)",
											}}
											activeDot={{
												r: 6,
											}}
										>
											<LabelList
												position="top"
												offset={12}
												className="fill-foreground"
												fontSize={12}
											/>
										</Line>
									</LineChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
					<div className="grid w-full gap-6 md:grid-cols-3">
						<Card className="md:col-span-2" x-chunk="charts-01-chunk-4">
							<CardHeader>
								<CardTitle>수거 시설 별 수거 횟수</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer config={barChartConfig}>
									<BarChart
										accessibilityLayer
										data={barChartData}
										margin={{
											top: 20,
										}}
									>
										<CartesianGrid vertical={false} />
										<XAxis
											dataKey="month"
											tickLine={false}
											tickMargin={10}
											axisLine={false}
											tickFormatter={value => value.slice(0, 3)}
										/>
										<ChartTooltip
											cursor={false}
											content={<ChartTooltipContent hideLabel />}
										/>
										<Bar
											dataKey="desktop"
											fill="var(--color-desktop)"
											radius={8}
										>
											<LabelList
												position="top"
												offset={12}
												className="fill-foreground"
												fontSize={12}
											/>
										</Bar>
									</BarChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>

					{/* <Tooltip>
						<TooltipTrigger asChild>
							<div className="flex items-center space-x-2">
								<Switch
									id="is-hover-open"
									onCheckedChange={x => setSettings({ isHoverOpen: x })}
									checked={settings.isHoverOpen}
								/>
								<Label htmlFor="is-hover-open">Hover Open</Label>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>When hovering on the sidebar in mini state, it will open</p>
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className="flex items-center space-x-2">
								<Switch
									id="is-hover-open"
									onCheckedChange={x => setSettings({ disabled: x })}
									checked={settings.disabled}
								/>
								<Label htmlFor="is-hover-open">Disable Sidebar</Label>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Hide sidebar</p>
						</TooltipContent>
					</Tooltip> */}
				</div>
			</TooltipProvider>
		</ContentLayout>
	)
}
