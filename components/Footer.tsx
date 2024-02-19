import { Text } from "@chakra-ui/react"

export default function Footer() {
    return (
        <footer className="z-50 fixed inset-x-0 bottom-0">
            <div className="flex flex-nowrap justify-end justify-self-end min-w-full pr-2 py-1 border-t-2 border-slate-200 dark:border-slate-500">
                <Text className="text-xs font-footer">⚡ Powered by Dog.CEO & AWS</Text>
            </div>
        </footer>
    )
}