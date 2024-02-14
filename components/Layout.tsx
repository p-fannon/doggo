import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col font-sans">
            <Header />
            <div className="justify-start grow">{children}</div>
            <Footer />
        </main>
    )
}
