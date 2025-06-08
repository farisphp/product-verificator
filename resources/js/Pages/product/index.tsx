import AuthenticatedLayout from "@/layouts/authenticated";
import { Head, Link } from "@inertiajs/react";
import { FileUp, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Product as ProductProps } from "@/types";
import { columns } from "./partials/columns";

// Mock data for demonstration - grouped by product name
const productGroups: ProductProps[] = [
    {
        id: 1,
        name: "Premium Leather Wallet",
        brand: "LuxLeather",
        category: "Accessories",
        totalItems: 120,
        verifications: 42,
    },
    {
        id: 1,
        name: "Designer Sunglasses",
        brand: "OptiVision",
        category: "Eyewear",
        totalItems: 85,
        verifications: 28,
    },
    {
        id: 1,
        name: "Luxury Watch",
        brand: "TimeKeeper",
        category: "Watches",
        totalItems: 50,
        verifications: 15,
    },
    {
        id: 1,
        name: "Designer Handbag",
        brand: "FashionElite",
        category: "Bags",
        totalItems: 75,
        verifications: 37,
    },
    {
        id: 1,
        name: "Premium Sneakers",
        brand: "UrbanStep",
        category: "Footwear",
        totalItems: 200,
        verifications: 23,
    },
];

export default function Product() {
    return (
        <AuthenticatedLayout>
            <Head title="Products" />
            <DataTable
                columns={columns}
                data={productGroups}
                pagination={{
                    data: {},
                    onChange: (table) => {
                        // router.get(
                        //     route("merchants"),
                        //     {
                        //         page: table.getState().pagination.pageIndex + 1,
                        //         per_page: table.getState().pagination.pageSize,
                        //     },
                        //     { only: ["merchants"], preserveState: true },
                        // );
                    },
                }}
                filter={{ column: "name" }}
                RightHeader={() => (
                    <>
                        <Button asChild variant="outline">
                            <Link href="/admin/products/bulk-upload">
                                <FileUp className="mr-2 h-4 w-4" />
                                Bulk Upload
                            </Link>
                        </Button>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </>
                )}
            />
        </AuthenticatedLayout>
    );
}
