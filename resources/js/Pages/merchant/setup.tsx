import { GalleryVerticalEnd, FileQuestion } from "lucide-react";
import { SetupForm } from "./partials/setup-form";
import { usePage } from "@inertiajs/react";
import { PageProps, Invitation } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Setup() {
    const { invitation } = usePage<
        PageProps<{
            invitation: Invitation;
        }>
    >().props;

    if (!invitation?.merchant) {
        return (
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <Card>
                        <FileQuestion className="size-8 mx-auto" />
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">
                                Invalid Invitation
                            </CardTitle>
                            <CardDescription>
                                Failed to retrive invitation detail. Make sure
                                you clicked the right link from invitation mail
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        );
    }
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a
                    href="#"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    {invitation.merchant.name}
                </a>
                <SetupForm />
            </div>
        </div>
    );
}
