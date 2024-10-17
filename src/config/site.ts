import { PATH } from "@/constants/path"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
	title: "Cleanning Wave",
	description:
		"Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
	mainNav: [
		{
			title: "Home",
			href: PATH.ROOT,
		},
	],
	meta: {
		generator: "Next.js",
		referrer: "origin-when-cross-origin" as const,
		keywords: ["clean", "Next.js", "React", "JavaScript"],
		authors: [{ name: "Osh" }],
		creator: "SeungHyuck Oh",
		publisher: "SeungHyuck Oh",
		formatDetection: {
			telephone: false,
			date: false,
			address: false,
			email: true,
			url: true,
		},
		alternates: {
			canonical: PATH.ROOT,
			languages: undefined,
			media: undefined,
			types: undefined,
			// languages: {
			// 	"en-US": "/en-US",
			// 	"de-DE": "/de-DE",
			// },
			// media: {
			// 	"only screen and (max-width: 600px)": "https://nextjs.org/mobile",
			// },
			// types: {
			// 	"application/rss+xml": "https://nextjs.org/rss",
			// },
		},
		appLinks: {
			// ios: {
			// 	url: "https://nextjs.org/ios",
			// 	app_store_id: "app_store_id",
			// },
			// android: {
			// 	package: "com.example.android/package",
			// 	app_name: "app_name_android",
			// },
			// web: {
			// 	url: "https://nextjs.org/web",
			// 	should_fallback: true,
			// },
		},
		openGraph: {
			url: PATH.ROOT,
			title: "cleanning wave",
			description:
				"A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: "cleanning wave",
			description:
				"A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
		},
	},
	links: {
		twitter: "https://twitter.com/shadcn",
		github: "https://github.com/shadcn/ui",
		docs: "https://ui.shadcn.com",
	},
}
