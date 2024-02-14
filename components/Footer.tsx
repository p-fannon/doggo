import { Text } from "@chakra-ui/react"

export default function Footer() {
    return (
        <footer className="flex flex-nowrap justify-end justify-self-end min-w-full pr-2 py-1 border-t-2 border-slate-200 dark:border-slate-500 z-50">
            <Text className="text-xs font-mono">⚡ Powered by Dog.CEO & AWS</Text>
        </footer>
    )
}