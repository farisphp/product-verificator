import {
    Table as TableProps,
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
    PaginationState,
    GlobalFilterTableState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import { Button } from "./button";
import { DataTablePagination } from "./data-table-pagination";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./dropdown-menu";
import { Input } from "./input";
import { MetaPagination } from "@/types";
import { debounce } from "lodash";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination: {
        data: MetaPagination;
        onChange: (table: TableProps<TData>) => void;
    };
    filter?: {
        column: string;
        onChange: (value: string) => void;
        placeholder?: string;
    };
    RightHeader?: React.ComponentType;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pagination: { data: paginationData, onChange: onPaginationChange },
    filter,
    RightHeader,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] =
        React.useState<GlobalFilterTableState>();
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: paginationData.current_page - 1,
        pageSize: paginationData.per_page,
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        manualPagination: true,
        rowCount: paginationData.total,
        pageCount: paginationData.last_page,
        onPaginationChange: setPagination,
        manualFiltering: true,
        onGlobalFilterChange: setGlobalFilter,
        state: {
            pagination,
            sorting,
            columnVisibility,
            globalFilter,
        },
    });

    useEffect(() => {
        if (
            pagination.pageIndex + 1 !== paginationData.current_page ||
            pagination.pageSize !== paginationData.per_page
        )
            onPaginationChange(table);
    }, [pagination, table]);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                {filter ? (
                    <Input
                        placeholder={filter?.placeholder || "Filter table..."}
                        value={
                            (table
                                .getColumn(filter.column)
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) => {
                            table
                                .getColumn(filter.column)
                                ?.setFilterValue(event.target.value);

                            filter?.onChange(event.target.value);
                        }}
                        className="max-w-sm"
                    />
                ) : null}

                <div className="ml-auto flex gap-2">
                    {RightHeader ? <RightHeader /> : null}
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
