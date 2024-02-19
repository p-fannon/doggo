import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col justify-between">
            <Header />
                <div className="flex flex-col grow overflow-y-scroll z-0 font-body">{children}</div>
            <Footer />
        </main>
    )
}
