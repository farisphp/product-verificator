import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Authenticated from "@/layouts/authenticated";
import { Head, Link } from "@inertiajs/react";

import {
    ArrowUpDown,
    CheckCircle2,
    Download,
    FileUp,
    MoreHorizontal,
    Plus,
    QrCode,
    Search,
    XCircle,
} from "lucide-react";
import { useState } from "react";

// Mock data for individual product items
const getMockProductItems = (productName: string) => {
    // Generate different mock data based on product name
    const baseItems = [
        {
            id: "ABC123456",
            serialNumber: "SN-2023-001",
            manufactureDate: "2023-05-15",
            status: "active",
            location: "New York, USA",
            lastVerified: "2023-09-10",
            owner: "John Doe",
        },
        {
            id: "ABC123457",
            serialNumber: "SN-2023-002",
            manufactureDate: "2023-05-16",
            status: "active",
            location: "Los Angeles, USA",
            lastVerified: "2023-09-12",
            owner: "Jane Smith",
        },
        {
            id: "ABC123458",
            serialNumber: "SN-2023-003",
            manufactureDate: "2023-05-17",
            status: "active",
            location: "Chicago, USA",
            lastVerified: "2023-09-15",
            owner: "Robert Johnson",
        },
        {
            id: "ABC123459",
            serialNumber: "SN-2023-004",
            manufactureDate: "2023-05-18",
            status: "inactive",
            location: "Miami, USA",
            lastVerified: "2023-08-20",
            owner: "Emily Davis",
        },
        {
            id: "ABC123460",
            serialNumber: "SN-2023-005",
            manufactureDate: "2023-05-19",
            status: "active",
            location: "Seattle, USA",
            lastVerified: "2023-09-05",
            owner: "Michael Wilson",
        },
    ];

    // Add more items for specific product names to demonstrate variety
    if (productName === "Premium Leather Wallet") {
        return [
            ...baseItems,
            {
                id: "ABC123461",
                serialNumber: "SN-2023-006",
                manufactureDate: "2023-05-20",
                status: "active",
                location: "Boston, USA",
                lastVerified: "2023-09-18",
                owner: "Sarah Brown",
            },
            {
                id: "ABC123462",
                serialNumber: "SN-2023-007",
                manufactureDate: "2023-05-21",
                status: "active",
                location: "Dallas, USA",
                lastVerified: "2023-09-20",
                owner: "David Miller",
            },
        ];
    }

    if (productName === "Designer Sunglasses") {
        return [
            ...baseItems.slice(0, 3),
            {
                id: "XYZ789012",
                serialNumber: "SN-2023-101",
                manufactureDate: "2023-04-10",
                status: "active",
                location: "Paris, France",
                lastVerified: "2023-09-01",
                owner: "Sophie Martin",
            },
            {
                id: "XYZ789013",
                serialNumber: "SN-2023-102",
                manufactureDate: "2023-04-11",
                status: "active",
                location: "London, UK",
                lastVerified: "2023-09-03",
                owner: "James Wilson",
            },
        ];
    }

    return baseItems;
};

// Mock product details
const getMockProductDetails = (productName: string) => {
    const productDetails = {
        "Premium Leather Wallet": {
            brand: "LuxLeather",
            category: "Accessories",
            description:
                "Handcrafted premium leather wallet with RFID protection",
            material: "Full-grain leather",
            dimensions: "4.5 x 3.5 x 0.5 inches",
            colors: ["Black", "Brown", "Tan"],
            price: "$89.99",
        },
        "Designer Sunglasses": {
            brand: "OptiVision",
            category: "Eyewear",
            description: "Polarized designer sunglasses with UV protection",
            material: "Acetate frame, polarized lenses",
            dimensions: "Standard size",
            colors: ["Black", "Tortoise", "Blue"],
            price: "$129.99",
        },
        "Luxury Watch": {
            brand: "TimeKeeper",
            category: "Watches",
            description:
                "Precision crafted luxury watch with automatic movement",
            material: "Stainless steel, sapphire crystal",
            dimensions: "42mm case diameter",
            colors: ["Silver", "Gold", "Rose Gold"],
            price: "$499.99",
        },
        "Designer Handbag": {
            brand: "FashionElite",
            category: "Bags",
            description: "Elegant designer handbag with premium materials",
            material: "Italian leather, metal hardware",
            dimensions: "12 x 9 x 4 inches",
            colors: ["Black", "Red", "Beige"],
            price: "$349.99",
        },
        "Premium Sneakers": {
            brand: "UrbanStep",
            category: "Footwear",
            description: "Comfortable and stylish premium sneakers",
            material: "Leather upper, rubber sole",
            dimensions: "Available in sizes 7-13",
            colors: ["White", "Black", "Gray"],
            price: "$149.99",
        },
    };

    return (
        productDetails[productName as keyof typeof productDetails] || {
            brand: "Unknown",
            category: "Miscellaneous",
            description: "No description available",
            material: "Unknown",
            dimensions: "Not specified",
            colors: [],
            price: "Not specified",
        }
    );
};

export default function ProductDetail({
    productName = "Premium Leather Wallet",
}: {
    productName: string;
}) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("items");

    const productItems = getMockProductItems(productName);
    const productDetails = getMockProductDetails(productName);

    const toggleItem = (itemId: string) => {
        setSelectedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId],
        );
    };

    const toggleAll = () => {
        setSelectedItems((prev) =>
            prev.length === productItems.length
                ? []
                : productItems.map((item) => item.id),
        );
    };

    const filteredItems = productItems.filter(
        (item) =>
            item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.serialNumber
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase()),
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
                    <div className="flex items-center justify-between">
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
                                    href={`/admin/products/${encodeURIComponent(productName)}/add-item`}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Item
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link
                                    href={`/admin/products/${encodeURIComponent(productName)}/bulk-upload`}
                                >
                                    <FileUp className="mr-2 h-4 w-4" />
                                    Bulk Upload Items
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <Card>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">
                                            <Checkbox
                                                checked={
                                                    selectedItems.length ===
                                                        productItems.length &&
                                                    productItems.length > 0
                                                }
                                                onCheckedChange={toggleAll}
                                                aria-label="Select all items"
                                            />
                                        </TableHead>
                                        <TableHead className="w-[150px]">
                                            <div className="flex items-center space-x-1">
                                                <span>Product ID</span>
                                                <ArrowUpDown className="h-3 w-3" />
                                            </div>
                                        </TableHead>
                                        <TableHead>
                                            <div className="flex items-center space-x-1">
                                                <span>Serial Number</span>
                                                <ArrowUpDown className="h-3 w-3" />
                                            </div>
                                        </TableHead>
                                        <TableHead>
                                            <div className="flex items-center space-x-1">
                                                <span>Manufacture Date</span>
                                                <ArrowUpDown className="h-3 w-3" />
                                            </div>
                                        </TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Last Verified</TableHead>
                                        <TableHead>Current Owner</TableHead>
                                        <TableHead className="w-[80px]">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedItems.includes(
                                                        item.id,
                                                    )}
                                                    onCheckedChange={() =>
                                                        toggleItem(item.id)
                                                    }
                                                    aria-label={`Select item ${item.id}`}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {item.id}
                                            </TableCell>
                                            <TableCell>
                                                {item.serialNumber}
                                            </TableCell>
                                            <TableCell>
                                                {item.manufactureDate}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        item.status === "active"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                    className={
                                                        item.status === "active"
                                                            ? "bg-green-100 text-green-800"
                                                            : ""
                                                    }
                                                >
                                                    {item.status === "active"
                                                        ? "Active"
                                                        : "Inactive"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {item.location}
                                            </TableCell>
                                            <TableCell>
                                                {item.lastVerified}
                                            </TableCell>
                                            <TableCell>{item.owner}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                Open menu
                                                            </span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Actions
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            <QrCode className="mr-2 h-4 w-4" />
                                                            <span>
                                                                Generate QR Code
                                                            </span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                                            <span>
                                                                View
                                                                Verification
                                                                History
                                                            </span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <span>
                                                                Edit Item
                                                            </span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive">
                                                            <XCircle className="mr-2 h-4 w-4" />
                                                            <span>
                                                                Delete Item
                                                            </span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>

                    {selectedItems.length > 0 && (
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
                    )}
                </TabsContent>

                <TabsContent value="details" className="space-y-6 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Information</CardTitle>
                            <CardDescription>
                                Details about this product group
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Brand
                                        </h3>
                                        <p>{productDetails.brand}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Category
                                        </h3>
                                        <p>{productDetails.category}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Description
                                        </h3>
                                        <p>{productDetails.description}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Price
                                        </h3>
                                        <p>{productDetails.price}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Material
                                        </h3>
                                        <p>{productDetails.material}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Dimensions
                                        </h3>
                                        <p>{productDetails.dimensions}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Available Colors
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {productDetails.colors.map(
                                                (color) => (
                                                    <Badge
                                                        key={color}
                                                        variant="outline"
                                                    >
                                                        {color}
                                                    </Badge>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Total Items
                                        </h3>
                                        <p>{productItems.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button variant="outline">
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
                            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                                <span className="text-muted-foreground">
                                    Analytics visualization will appear here
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </Authenticated>
    );
}
