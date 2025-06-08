import { useState } from "react";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Authenticated from "@/layouts/authenticated";
import { Head } from "@inertiajs/react";

const availableColumns = [
    { id: "product_id", name: "Product ID", required: true },
    { id: "name", name: "Name", required: true },
    { id: "brand", name: "Brand", required: true },
    { id: "category", name: "Category", required: true },
    { id: "manufacture_date", name: "Manufacture Date", required: true },
    { id: "description", name: "Description", required: false },
    { id: "sku", name: "SKU", required: false },
    { id: "weight", name: "Weight", required: false },
    { id: "dimensions", name: "Dimensions", required: false },
    { id: "material", name: "Material", required: false },
    { id: "color", name: "Color", required: false },
    { id: "size", name: "Size", required: false },
];

export default function BulkTemplate() {
    const [selectedColumns, setSelectedColumns] = useState<string[]>(
        availableColumns.filter((col) => col.required).map((col) => col.id),
    );

    const toggleColumn = (columnId: string) => {
        if (availableColumns.find((col) => col.id === columnId)?.required) {
            return; // Can't toggle required columns
        }

        setSelectedColumns((prev) =>
            prev.includes(columnId)
                ? prev.filter((id) => id !== columnId)
                : [...prev, columnId],
        );
    };

    const generateCSV = () => {
        // Get column headers
        const headers = selectedColumns
            .map((id) => availableColumns.find((col) => col.id === id)?.name)
            .join(",");

        // Create empty row as example
        const emptyRow = selectedColumns.map(() => "").join(",");

        // Combine headers and empty row
        const csvContent = `${headers}\n${emptyRow}`;

        // Create download link
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "product-upload-template.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Authenticated>
            <Head title="Generate CSV Template" />
            <Card>
                <CardHeader>
                    <CardTitle>Generate CSV Template</CardTitle>
                    <CardDescription>
                        Create a custom CSV template for your product upload
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium mb-2">
                                Select Columns
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Required columns are pre-selected and cannot be
                                deselected
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {availableColumns.map((column) => (
                                <div
                                    key={column.id}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={column.id}
                                        checked={selectedColumns.includes(
                                            column.id,
                                        )}
                                        onCheckedChange={() =>
                                            toggleColumn(column.id)
                                        }
                                        disabled={column.required}
                                    />
                                    <Label
                                        htmlFor={column.id}
                                        className={`text-sm ${column.required ? "font-medium" : ""}`}
                                    >
                                        {column.name}
                                        {column.required && (
                                            <span className="text-red-500 ml-1">
                                                *
                                            </span>
                                        )}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={generateCSV} className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Template
                    </Button>
                </CardFooter>
            </Card>
        </Authenticated>
    );
}
