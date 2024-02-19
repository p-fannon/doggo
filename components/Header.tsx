import { Heading } from "@chakra-ui/react";

export default function Header() {
    return (
        <header className="z-50 sticky top-0">
            <div className="flex flex-nowrap justify-start justify-self-start min-w-full pl-3 py-1 shadow-md border-b-2 border-cyan-500 dark:border-slate-200">
                <Heading className="text-xl font-bold font-heading">🦴 Doggo</Heading>
            </div>
        </header>
    )
}