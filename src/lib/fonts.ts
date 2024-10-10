import { JetBrains_Mono as FontMono, Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
})

export const fontMono = FontMono({
	subsets: ["latin"],
	variable: "--font-mono",
})

export const geistSans = localFont({
	src: "../app/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
})
export const geistMono = localFont({
	src: "../app/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
})
