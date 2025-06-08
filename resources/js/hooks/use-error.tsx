import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

export function useError() {
    const errors = usePage().props.errors;
    useEffect(() => {
        if (errors.message) {
            toast.error(errors.message);
        }
    }, [errors]);
}
