import { Heading } from "@chakra-ui/react";

export default function Header() {
    return (
        <header className="flex flex-nowrap justify-start justify-self-start min-w-full pl-3 py-1 shadow-md border-b-2 border-cyan-500 dark:border-slate-200 z-50">
            <Heading className="text-xl font-bold font-heading">🦴 Doggo</Heading>
        </header>
    )
}