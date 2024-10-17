import "@/styles/globals.css"

import { Metadata, Viewport } from "next"
import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.APP_URL
			? `${process.env.APP_URL}`
			: process.env.VERCEL_URL
				? `https://${process.env.VERCEL_URL}`
				: `http://localhost:${process.env.PORT || 3000}`
	),

	title: {
		default: siteConfig.title,
		template: `%s - ${siteConfig.title}`,
	},
	description: siteConfig.description,
	generator: siteConfig.meta.generator,
	applicationName: siteConfig.title,
	referrer: siteConfig.meta.referrer,
	keywords: siteConfig.meta.keywords,
	authors: siteConfig.meta.authors,
	creator: siteConfig.meta.creator,
	publisher: siteConfig.meta.publisher,
	formatDetection: siteConfig.meta.formatDetection,
	alternates: {
		canonical: siteConfig.meta.alternates.canonical,
		languages: siteConfig.meta.alternates.languages,
		media: siteConfig.meta.alternates.media,
		types: siteConfig.meta.alternates.types,
	},
	appLinks: siteConfig.meta.appLinks,
	openGraph: siteConfig.meta.openGraph,
	icons: {
		icon: "/favicon.ico",
		// shortcut: "/favicon-16x16.png",
		// apple: "/apple-touch-icon.png",
	},
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const session = await auth()
	console.warn("RootLayout\n", `session: ${session}`)

	return (
		<SessionProvider session={session}>
			<html lang="ko" suppressHydrationWarning>
				<head />
				<body
					className={cn(
						"bg-background min-h-screen font-sans antialiased",
						fontMono.variable,
						fontSans.variable
					)}
				>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						{children}
						<TailwindIndicator />
					</ThemeProvider>
				</body>
			</html>
		</SessionProvider>
	)
}

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
}
