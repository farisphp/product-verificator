import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Merchant, Staff, User, UserWithPivot } from "@/types";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, View } from "lucide-react";

export const columns: ColumnDef<Merchant>[] = [
    {
        accessorKey: "logo",
        header: "Logo",
        cell: ({ row }) => {
            return (
                <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                        src={
                            row.getValue("logo") ||
                            `https://ui-avatars.com/api/?name=${row.getValue("name")}`
                        }
                    />
                </Avatar>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const merchant = row.original;

            return (
                <>
                    <Button variant="ghost" className="h-8 w-8 p-0" asChild>
                        <Link href={route("merchants.show", merchant.id)}>
                            <span className="sr-only">View detail</span>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                            // onClick={() =>
                            //     navigator.clipboard.writeText(payment.id)
                            // }
                            >
                                Update merchant
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600 hover:!text-white hover:!bg-red-500"
                                // onClick={() =>
                                //     navigator.clipboard.writeText(payment.id)
                                // }
                            >
                                Delete merchant
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            );
        },
    },
];

export const staffColumns: ColumnDef<UserWithPivot<{ role: string }>>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "pivot.role",
        header: "Role",
        cell: ({ row }) => (
            <span className="capitalize">{row.original.pivot.role}</span>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const merchant = row.original;

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                            // onClick={() =>
                            //     navigator.clipboard.writeText(payment.id)
                            // }
                            >
                                Update staff
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600 hover:!text-white hover:!bg-red-500"
                                // onClick={() =>
                                //     navigator.clipboard.writeText(payment.id)
                                // }
                            >
                                Delete staff
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            );
        },
    },
];
