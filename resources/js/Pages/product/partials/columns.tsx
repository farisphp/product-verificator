import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product, ProductItem } from "@/types";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CheckCircle2, MoreHorizontal, QrCode, XCircle } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
            const product = row.original;
            return <Badge variant="outline">{product.category.name}</Badge>;
        },
    },
    {
        accessorKey: "totalItems",
        header: "Total Items",
    },
    {
        accessorKey: "totalClaimed",
        header: "Total Claimed",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link href={route("products.show", product.id)}>
                            <DropdownMenuItem>
                                <span>View Details</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <span>Edit Product Group</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            <span>Delete Product Group</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const itemColumns: ColumnDef<ProductItem>[] = [
    {
        accessorKey: "id",
        header: "Product Id",
    },
    {
        accessorKey: "serial_number",
        header: "Serial Number",
    },
    {
        accessorKey: "manufacture_date",
        header: "Manufacture Date",
        cell: ({ row }) => {
            const product = row.original;
            return format(new Date(product.manufacture_date), "PPP");
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const product = row.original;
            return "Unclaimed";
            // return <Badge variant="outline">{product.category.name}</Badge>;
        },
    },
    {
        accessorKey: "last_verified",
        header: "Last Verified",
        cell: ({ row }) => {
            const product = row.original;
            return "-";
            // return <Badge variant="outline">{product.category.name}</Badge>;
        },
    },
    {
        accessorKey: "current_owner",
        header: "Current Owner",
        cell: ({ row }) => {
            const product = row.original;
            return "-";
            // return <Badge variant="outline">{product.category.name}</Badge>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link href={route("products.show", product.id)}>
                            <DropdownMenuItem>
                                <span>View Verification History</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            <span>Delete Item</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
