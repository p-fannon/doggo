import { Button } from "@chakra-ui/react";

type FetchButtonType = {
    onClick: () => void,
    isLoading: boolean
}

export default function FetchButton({ onClick, isLoading} : FetchButtonType) {
    return (
        <Button 
            onClick={onClick}
            isLoading={isLoading}
            size="lg"
            className="font-body"
        >
            Fetch
        </Button>
    )
}