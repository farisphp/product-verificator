import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import AuthenticatedLayout from "@/layouts/authenticated";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { columns } from "./partials/columns";
import { MerchantForm } from "./partials/merchant-form";
import { Merchant as MerchantData, PageProps, PaginatedData } from "@/types";
import { debounce } from "lodash";

export default function Merchant() {
    const { merchants } = usePage<
        PageProps<{
            merchants: PaginatedData<MerchantData>;
        }>
    >().props;
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Merchant" />

            <DataTable
                columns={columns}
                data={merchants.data}
                pagination={{
                    data: merchants.meta,
                    onChange: (table) => {
                        router.get(
                            route("merchants"),
                            {
                                page: table.getState().pagination.pageIndex + 1,
                                per_page: table.getState().pagination.pageSize,
                            },
                            { only: ["merchants"], preserveState: true },
                        );
                    },
                }}
                filter={{
                    column: "name",
                    onChange: debounce((value: string) => {
                        router.get(
                            route("merchants"),
                            {
                                search: value,
                            },
                            { only: ["merchants"], preserveState: true },
                        );
                    }, 200),
                }}
                RightHeader={() => (
                    <Button onClick={() => setDialogOpen((prev) => !prev)}>
                        Add Merchant
                    </Button>
                )}
            />
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Merchant</DialogTitle>
                        <DialogDescription>
                            Click submit when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <MerchantForm onSuccess={() => setDialogOpen(false)} />
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
