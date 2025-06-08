import ApplicationLogo from "@/components/ApplicationLogo";
import { useError } from "@/hooks/use-error";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, useEffect } from "react";
import { toast } from "sonner";

export default function Guest({ children }: PropsWithChildren) {
    useError();
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                {children}
            </div>
        </div>
    );
}
