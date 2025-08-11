import { Head, Link, router } from "@inertiajs/react";
import { FileUp, Plus } from "lucide-react";
import { debounce } from "lodash";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import AuthenticatedLayout from "@/layouts/authenticated";
import { PaginatedData, Product as ProductProps } from "@/types";
import { columns } from "./partials/columns";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "./partials/product-form";
import { useState } from "react";

export default function Product({
    products,
}: {
    products: PaginatedData<ProductProps>;
}) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Products" />
            <DataTable
                columns={columns}
                data={products.data}
                pagination={{
                    data: products.meta,
                    onChange: (table) => {
                        router.get(
                            route("products"),
                            {
                                page: table.getState().pagination.pageIndex + 1,
                                per_page: table.getState().pagination.pageSize,
                            },
                            { only: ["products"], preserveState: true },
                        );
                    },
                }}
                filter={{
                    column: "name",
                    onChange: debounce((value) => {
                        router.get(
                            route("products"),
                            {
                                search: value,
                            },
                            { only: ["products"], preserveState: true },
                        );
                    }, 200),
                }}
                RightHeader={() => (
                    <>
                        <Button asChild variant="outline">
                            <Link href={route("products.bulk_upload")}>
                                <FileUp className="mr-2 h-4 w-4" />
                                Bulk Upload
                            </Link>
                        </Button>
                        <Button onClick={() => setDialogOpen((prev) => !prev)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </>
                )}
            />
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-screen">
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>
                            Click submit when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <ProductForm
                        onSuccess={() => {
                            setDialogOpen(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
