import Image from "next/image"
import Link from "next/link"
import { PATH } from "@/constants/path"
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { PanelsTopLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="bg-background/95 border-border/40 sticky top-0 z-50 w-full border-b backdrop-blur-sm dark:bg-black/[0.6]">
				<div className="container flex h-14 items-center">
					<Link
						href={PATH.ROOT}
						className="flex items-center justify-start transition-opacity duration-300 hover:opacity-85"
					>
						<PanelsTopLeft className="mr-3 size-6" />
						<span className="font-bold">shadcn/ui sidebar</span>
						<span className="sr-only">shadcn/ui sidebar</span>
					</Link>
					<nav className="ml-auto flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							className="bg-background size-8 rounded-full"
							asChild
						>
							<Link href="https://github.com/salimi-my/shadcn-ui-sidebar">
								<GitHubLogoIcon className="size-[1.2rem]" />
							</Link>
						</Button>
						<ThemeToggle />
					</nav>
				</div>
			</header>
			<main className="min-h-[calc(100vh-57px-97px)] flex-1">
				<div className="container relative pb-10">
					<section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
						<h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
							Sidebar example built on top of shadcn/ui
						</h1>
						<span className="text-foreground max-w-[750px] text-center text-lg font-light">
							A stunning and functional retractable sidebar for Next.js using
							shadcn/ui complete with desktop and mobile responsiveness.
						</span>
						<div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
							<Button variant="default" asChild>
								<Link href={PATH.DASHBOARD}>
									Demo
									<ArrowRightIcon className="ml-2" />
								</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link
									href="https://ui.shadcn.com/"
									target="_blank"
									rel="noopener noreferrer"
								>
									Learn shadcn/ui
								</Link>
							</Button>
						</div>
					</section>
					<div className="relative flex w-full justify-center">
						<Image
							src="/demo-light-min.png"
							width={1080}
							height={608}
							alt="demo"
							priority
							className="rounded-xl border shadow-sm dark:hidden"
						/>
						<Image
							src="/demo-dark-min.png"
							width={1080}
							height={608}
							alt="demo-dark"
							priority
							className="hidden rounded-xl border border-zinc-600 shadow-sm dark:block dark:shadow-gray-500/5"
						/>
						<Image
							src="/demo-mobile-light-min.png"
							width={228}
							height={494}
							alt="demo-mobile"
							className="absolute bottom-0 right-0 hidden rounded-xl border lg:block dark:hidden"
						/>
						<Image
							src="/demo-mobile-dark-min.png"
							width={228}
							height={494}
							alt="demo-mobile"
							className="absolute bottom-0 right-0 hidden rounded-xl border border-zinc-600 dark:lg:block"
						/>
					</div>
				</div>
			</main>
			<footer className="border-border/40 border-t py-6 md:py-0">
				<div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
					<p className="text-muted-foreground text-balance text-center text-sm leading-loose">
						Built on top of{" "}
						<Link
							href="https://ui.shadcn.com"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium underline underline-offset-4"
						>
							shadcn/ui
						</Link>
						. The source code is available on{" "}
						<Link
							href="https://github.com/salimi-my/shadcn-ui-sidebar"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium underline underline-offset-4"
						>
							GitHub
						</Link>
						.
					</p>
				</div>
			</footer>
		</div>
	)
}
