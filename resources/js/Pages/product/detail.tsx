import { Head, Link, router } from "@inertiajs/react";
import { FileUp, Plus } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Authenticated from "@/layouts/authenticated";
import { debounce } from "lodash";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { DataTable } from "@/components/ui/data-table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { PaginatedData, Product } from "@/types";
import { itemColumns } from "./partials/columns";
import { ProductForm } from "./partials/product-form";

const chartData = [
    { month: "January", verification: 10 },
    { month: "February", verification: 34 },
    { month: "March", verification: 2 },
    { month: "April", verification: 25 },
    { month: "May", verification: 15 },
    { month: "June", verification: 40 },
];

const chartConfig = {
    verification: {
        label: "Scan",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

export default function ProductDetail({
    product,
    items,
}: {
    product: { data: Product };
    items: PaginatedData<any>;
}) {
    const [activeTab, setActiveTab] = useState("items");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );

    return (
        <Authenticated>
            <Head title="Detail" />
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="items">Individual Items</TabsTrigger>
                    <TabsTrigger value="details">Product Details</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="items" className="space-y-4 pt-4">
                    {/*<div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search items..."
                                    className="pl-8 w-[300px]"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button asChild variant="outline">
                                <Link
                                    href={route("products.items.store", {
                                        product: product.data.id,
                                    })}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Item
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link
                                    href={`/admin/products/${encodeURIComponent(product.data.id)}/bulk-upload`}
                                >
                                    <FileUp className="mr-2 h-4 w-4" />
                                    Bulk Upload Items
                                </Link>
                            </Button>
                        </div>
                    </div>*/}

                    {/*{selectedItems.length > 0 && (
                        <div className="flex items-center gap-2 justify-end">
                            <span className="text-sm text-muted-foreground">
                                {selectedItems.length} item
                                {selectedItems.length !== 1 ? "s" : ""} selected
                            </span>
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Export Selected
                            </Button>
                        </div>
                    )}*/}

                    <DataTable
                        columns={itemColumns}
                        data={items.data}
                        pagination={{
                            data: items.meta,
                            onChange: (table) => {
                                router.get(
                                    route("products.show", {
                                        product: product.data.id,
                                    }),
                                    {
                                        page:
                                            table.getState().pagination
                                                .pageIndex + 1,
                                        per_page:
                                            table.getState().pagination
                                                .pageSize,
                                    },
                                    { only: ["products"], preserveState: true },
                                );
                            },
                        }}
                        filter={{
                            column: "serial_number",
                            onChange: debounce((value) => {
                                router.get(
                                    route("products.show", {
                                        product: product.data.id,
                                    }),
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
                                        <FileUp className="h-4 w-4" />
                                        Bulk Upload
                                    </Link>
                                </Button>
                                <Button
                                    onClick={() =>
                                        setDialogOpen((prev) => !prev)
                                    }
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Product Item
                                </Button>
                            </>
                        )}
                    />
                </TabsContent>

                <TabsContent value="details" className="space-y-6 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Information</CardTitle>
                            <CardDescription>
                                Details about {product.data.name}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Brand
                                        </h3>
                                        <p>{product.data.brand}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Category
                                        </h3>
                                        <p>{product.data.category.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Description
                                        </h3>
                                        <p>{product.data.description}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Total Items
                                        </h3>
                                        <p>
                                            {product.data.totalItems.toString()}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Total Claimed
                                        </h3>
                                        <p>
                                            {product.data.totalClaimed.toString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Material
                                        </h3>
                                        <p>{product.data.material}</p>
                                    </div>
                                    {product.data.colors ? (
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">
                                                Available Colors
                                            </h3>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {product.data.colors.map(
                                                    (color) => (
                                                        <Badge
                                                            key={color.value}
                                                            variant="outline"
                                                        >
                                                            {color.label}
                                                        </Badge>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ) : null}
                                    {product.data.sizes ? (
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">
                                                Available Sizes
                                            </h3>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {product.data.sizes.map(
                                                    (size) => (
                                                        <Badge
                                                            key={size.value}
                                                            variant="outline"
                                                        >
                                                            {size.label}
                                                        </Badge>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedProduct(product.data);
                                        setDialogOpen(true);
                                    }}
                                >
                                    Edit Product Details
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Analytics</CardTitle>
                            <CardDescription>
                                Verification statistics and insights
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) =>
                                            value.slice(0, 3)
                                        }
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={
                                            <ChartTooltipContent indicator="line" />
                                        }
                                    />
                                    <Area
                                        dataKey="verification"
                                        type="natural"
                                        fill="var(--color-verification)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-verification)"
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-screen">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                            Click submit when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <ProductForm
                        onSuccess={() => {
                            setDialogOpen(false);
                            setSelectedProduct(null);
                        }}
                        product={selectedProduct || undefined}
                    />
                </DialogContent>
            </Dialog>
        </Authenticated>
    );
}
