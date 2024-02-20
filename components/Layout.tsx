import Footer from "./Footer";
import Header from "./Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Doggo App',
    description: 'Application for humans to view doggos',
    applicationName: 'Doggo',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true
        },
    }
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col justify-between">
            <Header />
                <div className="flex flex-col grow overflow-y-scroll z-0 font-body">{children}</div>
            <Footer />
        </main>
    )
}
